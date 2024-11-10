'use client'

import { useEffect, useRef, useCallback, useMemo } from 'react'
import * as d3 from 'd3'
import { feature } from 'topojson-client'
import { Topology, GeometryCollection } from 'topojson-specification'
import { FeatureCollection } from 'geojson'

interface MapViewProps {
  activeFilters: {
    stage: string[]
    performance: string[]
    country: string[]
    program: string[]
    batch: string[]
  }
}

interface TravelRoute {
  fromCity: string
  fromCountry: string
  toCity: string
  toCountry: string
  count: number
}

interface CityCoordinate {
  lat: number
  lng: number
  name: string
  country: string
}

// Helper function for city coordinates
function getCityCoordinates(): { [key: string]: CityCoordinate } {
  return {
    // Saudi Arabia
    'Madina': { lat: 24.5247, lng: 39.5692, name: 'Madina', country: 'Saudi Arabia' },
    'Riyadh': { lat: 24.7136, lng: 46.6753, name: 'Riyadh', country: 'Saudi Arabia' },
    'Jeddah': { lat: 21.5433, lng: 39.1728, name: 'Jeddah', country: 'Saudi Arabia' },
    'Mecca': { lat: 21.4225, lng: 39.8262, name: 'Mecca', country: 'Saudi Arabia' },
    
    // USA
    'New York': { lat: 40.7128, lng: -74.0060, name: 'New York', country: 'USA' },
    'Los Angeles': { lat: 34.0522, lng: -118.2437, name: 'Los Angeles', country: 'USA' },
    'Chicago': { lat: 41.8781, lng: -87.6298, name: 'Chicago', country: 'USA' },
    'Miami': { lat: 25.7617, lng: -80.1918, name: 'Miami', country: 'USA' },
    
    // UAE
    'Dubai': { lat: 25.2048, lng: 55.2708, name: 'Dubai', country: 'UAE' },
    'Abu Dhabi': { lat: 24.4539, lng: 54.3773, name: 'Abu Dhabi', country: 'UAE' },
    
    // UK
    'London': { lat: 51.5074, lng: -0.1278, name: 'London', country: 'UK' },
    'Manchester': { lat: 53.4808, lng: -2.2426, name: 'Manchester', country: 'UK' },
    
    // Add more cities as needed
  }
}

function drawCurvedRoute(
  source: [number, number],
  target: [number, number],
  count: number
): string {
  const dx = target[0] - source[0]
  const dy = target[1] - source[1]
  const dr = Math.sqrt(dx * dx + dy * dy)
  const curve = count % 2 === 0 ? 1 : 0 // Alternate curve direction for parallel routes
  return `M${source[0]},${source[1]}A${dr},${dr} 0 0,${curve} ${target[0]},${target[1]}`
}

const MapView = ({ activeFilters }: MapViewProps) => {
  const svgRef = useRef<SVGSVGElement>(null)

  const travelRoutes = useMemo<TravelRoute[]>(() => [
    { fromCity: 'Madina', fromCountry: 'Saudi Arabia', toCity: 'New York', toCountry: 'USA', count: 25 },
    { fromCity: 'Riyadh', fromCountry: 'Saudi Arabia', toCity: 'Los Angeles', toCountry: 'USA', count: 15 },
    { fromCity: 'Jeddah', fromCountry: 'Saudi Arabia', toCity: 'Chicago', toCountry: 'USA', count: 20 },
    { fromCity: 'Dubai', fromCountry: 'UAE', toCity: 'London', toCountry: 'UK', count: 30 },
  ], [])

  const renderMap = useCallback(async () => {
    if (!svgRef.current) return

    try {
      const response = await fetch('https://unpkg.com/world-atlas@2/countries-110m.json')
      const worldData = await response.json()
      const cityCoords = getCityCoordinates()

      const width = 1200
      const height = 600

      // Clear previous content
      d3.select(svgRef.current).selectAll("*").remove()

      const svg = d3.select(svgRef.current)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("width", "100%")
        .attr("height", "100%")
        .style("background", "#002E25")

      // Create projection
      const projection = d3.geoMercator()
        .center([0, 30])
        .scale(width / 2 / Math.PI)
        .translate([width / 2, height / 2])

      const path = d3.geoPath(projection)

      // Create container for map elements
      const g = svg.append("g")

      // Draw world map
      g.selectAll("path")
        .data((feature(worldData as Topology<{ countries: GeometryCollection }>, worldData.objects.countries) as unknown as FeatureCollection).features)
        .join("path")
        .attr("fill", "#1D4B44")
        .attr("d", path)
        .attr("stroke", "#4FD1C5")
        .attr("stroke-width", 0.5)

      // Draw routes
      const routesGroup = g.append("g").attr("class", "routes")

      // Filter routes based on activeFilters
      const filteredRoutes = travelRoutes.filter(route => {
        return (
          (activeFilters.country.length === 0 || 
           activeFilters.country.includes(route.fromCountry) || 
           activeFilters.country.includes(route.toCountry))
        )
      })

      filteredRoutes.forEach(route => {
        const sourceCity = cityCoords[route.fromCity]
        const targetCity = cityCoords[route.toCity]

        if (sourceCity && targetCity) {
          const sourcePos = projection([sourceCity.lng, sourceCity.lat]) as [number, number]
          const targetPos = projection([targetCity.lng, targetCity.lat]) as [number, number]

          // Draw route path
          routesGroup.append("path")
            .attr("class", "travel-route")
            .attr("d", drawCurvedRoute(sourcePos, targetPos, route.count))
            .attr("stroke", "#4FD1C5")
            .attr("stroke-width", Math.log(route.count) + 1)
            .attr("fill", "none")
            .attr("stroke-dasharray", "5,5")
            .attr("opacity", 0.6)

          // Add animated dots along the route
          routesGroup.append("circle")
            .attr("class", "route-dot")
            .attr("r", 3)
            .attr("fill", "#fff")
            .append("animateMotion")
            .attr("dur", "3s")
            .attr("repeatCount", "indefinite")
            .attr("path", drawCurvedRoute(sourcePos, targetPos, route.count))
        }
      })

      // Add city markers
      const citiesGroup = g.append("g").attr("class", "cities")

      // Get unique cities from routes
      const uniqueCities = new Set([
        ...filteredRoutes.map(r => r.fromCity),
        ...filteredRoutes.map(r => r.toCity)
      ])

      // ... (keep all code the same until the uniqueCities.forEach section)

uniqueCities.forEach(cityName => {
  const city = cityCoords[cityName]
  if (city) {
    const [x, y] = projection([city.lng, city.lat]) || [0, 0]
    
    const cityGroup = citiesGroup.append("g")
      .attr("transform", `translate(${x},${y})`)

    // City marker with pulse animation
    cityGroup.append("circle")
      .attr("r", 4)
      .attr("fill", "#4FD1C5")
      .attr("class", "city-marker")

    // Adjust label position based on city
    let labelY = 4;  // default position
    if (city.name === 'Dubai') {
      labelY = -15;  // move Dubai label up
    } else if (city.name === 'Jeddah') {
      labelY = 20;   // move Jeddah label down
    }

    // City label with background
    const label = cityGroup.append("g")
      .attr("transform", `translate(8, ${labelY})`)

    // Label background
    label.append("rect")
      .attr("x", -4)
      .attr("y", -12)
      .attr("width", (city.name.length + city.country.length) * 6 + 8)
      .attr("height", 16)
      .attr("fill", "#002E25")
      .attr("fill-opacity", 0.8)
      .attr("rx", 4)

    // City name and country
    label.append("text")
      .attr("fill", "#FFFFFF")
      .attr("font-size", "10px")
      .text(`${city.name}, ${city.country}`)
  }
})

// ... (keep all remaining code the same)

      // Add zoom capabilities
      const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([1, 8])
        .on("zoom", (event) => {
          g.attr("transform", event.transform)
        })

      svg.call(zoom)

    } catch (error) {
      console.error('Error rendering map:', error)
    }
  }, [activeFilters, travelRoutes])

  // Add CSS animations
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes dash {
        to {
          stroke-dashoffset: 20;
        }
      }
      .travel-route {
        animation: dash 1s linear infinite;
      }
      @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.5; }
        100% { transform: scale(1); opacity: 1; }
      }
      .city-marker {
        animation: pulse 2s infinite;
      }
      .route-dot {
        filter: drop-shadow(0 0 2px rgba(255,255,255,0.7));
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Update map when filters change
  useEffect(() => {
    renderMap()
  }, [activeFilters, renderMap])

  return (
    <div className="bg-[#002E25] rounded-lg">
      <div className="p-6">
        <div className="h-[600px] overflow-hidden">
          <svg ref={svgRef} />
        </div>
      </div>
    </div>
  )
}

export default MapView