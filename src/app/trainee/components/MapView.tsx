'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import * as d3 from 'd3'
import { feature } from 'topojson-client'
import { participantsData } from '../data/participants'
import { uaeGeoJson } from '../data/uae-states'
import type { Topology, GeometryObject } from 'topojson-specification';

interface MapViewProps {
  activeFilters: {
    stage: string[]
    performance: string[]
    country: string[]
    program: string[]
    batch: string[]
  }
}

// Helper function for country coordinates
function getCountryCoordinates(country: string) {
  const coordinates: { [key: string]: { lat: number, lng: number } } = {
    'Singapore': { lat: 1.3521, lng: 103.8198 },
    'UAE': { lat: 23.4241, lng: 53.8478 },
    'Malaysia': { lat: 4.2105, lng: 101.9758 },
    'India': { lat: 20.5937, lng: 78.9629 }
  }
  return coordinates[country] || { lat: 0, lng: 0 }
}

// Add these interfaces at the top with other interfaces
interface WorldTopology {
  type: string;
  objects: {
    countries: GeometryObject;
  };
  arcs: number[][][];
  transform: {
    scale: [number, number];
    translate: [number, number];
  };
}

interface FeatureCollection {
  type: string;
  features: GeoFeature[];
}

interface GeoFeature {
  type: string;
  properties: {
    name: string;
    [key: string]: string | number;  // allows for other properties while requiring 'name'
  };
  geometry: {
    type: string;
    coordinates: number[][][] | number[][][][] | number[][][][][];
  };
}

interface CountryData {
  country: string;
  coordinates: { lat: number; lng: number };
  count: number;
}

const MapView = ({ activeFilters }: MapViewProps) => {
  const [activeSubTab, setActiveSubTab] = useState('participants')
  const svgRef = useRef<SVGSVGElement>(null)

  const renderStateMap = useCallback(() => {
    if (!svgRef.current) return

    const width = 1200
    const height = 600

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove()

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("width", "100%")
      .attr("height", "100%")
      .style("background", "#002E25")

    // Calculate participants per state with batch filter
    const participantsByState = participantsData.participants
      .filter(p => {
        return p.country === 'UAE' && 
          (activeFilters.batch.length === 0 || activeFilters.batch.includes(p.batchNumber))
      })
      .reduce((acc, curr) => {
        acc[curr.location] = (acc[curr.location] || 0) + 1
        return acc
      }, {} as Record<string, number>)

    // Create color scale
    const maxParticipants = Math.max(...Object.values(participantsByState), 1)
    const colorScale = d3.scaleSequential()
      .domain([0, maxParticipants])
      .interpolator(d3.interpolate("#1D4B44", "#4FD1C5"))

    // Create projection for UAE
    const projection = d3.geoMercator()
      .center([55.3, 24.5])  // Centered on UAE
      .scale(width * 8)      // Increased scale for better visibility
      .translate([width / 2, height / 2])

    const path = d3.geoPath().projection(projection)

    // Create container for map elements
    const g = svg.append("g")

    // Draw states
    g.selectAll("path")
      .data<GeoFeature>(uaeGeoJson.features)
      .join("path")
      .attr("fill", d => colorScale(participantsByState[d.properties.name] || 0))
      .attr("d", d => path(d as d3.GeoPermissibleObjects) || "")
      .attr("stroke", "#FFFFFF")
      .attr("stroke-width", 0.5)
      .append("title")
      .text(d => `${d.properties.name}: ${participantsByState[d.properties.name] || 0} participants`)

    // Add state labels and counts
    g.selectAll("text")
      .data(uaeGeoJson.features)
      .join("text")
      .attr("transform", d => `translate(${path.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("fill", "#FFFFFF")
      .attr("font-size", "12px")
      .attr("font-weight", "500")
      .each(function(d: GeoFeature) {
        const text = d3.select(this)
        const count = participantsByState[d.properties.name] || 0
        text.append("tspan")
          .attr("x", 0)
          .attr("dy", "-0.6em")
          .text(d.properties.name)
        text.append("tspan")
          .attr("x", 0)
          .attr("dy", "1.2em")
          .text(`(${count})`)
          .attr("fill", "#4FD1C5")
      })

    // Add zoom capabilities
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 8])
      .on("zoom", (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        g.attr("transform", event.transform.toString())
      })

    svg.call(zoom)
  }, [activeFilters])

  const renderMap = useCallback(async () => {
    if (!svgRef.current) return

    try {
      const response = await fetch('https://unpkg.com/world-atlas@2/countries-110m.json')
      const worldData = (await response.json()) as WorldTopology

      const width = 900
      const height = 450

      // Clear previous content
      d3.select(svgRef.current).selectAll("*").remove()

      const svg = d3.select(svgRef.current)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("width", "100%")
        .attr("height", "100%")
        .style("background", "#002E25")

      const projection = d3.geoMercator()
        .center([82, 23])
        .scale(width / 2.2)
        .translate([width / 2, height / 2.2])

      const path = d3.geoPath(projection)

      const g = svg.append("g")

      // Draw world map
      g.selectAll("path")
        .data((feature(worldData as unknown as Topology, worldData.objects.countries) as FeatureCollection).features)
        .join("path")
        .attr("fill", (d) => d.properties.name === "India" ? "#1a3f3a" : "#1D4B44")
        .attr("d", (d) => path(d as d3.GeoPermissibleObjects) || "")
        .attr("stroke", "#4FD1C5")
        .attr("stroke-width", 0.5)

      // Filter participants based on activeFilters
      const filteredParticipants = participantsData.participants.filter(participant => {
        return (
          (activeFilters.stage.length === 0 || activeFilters.stage.includes(participant.stage.current)) &&
          (activeFilters.country.length === 0 || activeFilters.country.includes(participant.country)) &&
          (activeFilters.program.length === 0 || activeFilters.program.includes(participant.program)) &&
          (activeFilters.batch.length === 0 || activeFilters.batch.includes(participant.batchNumber))
        )
      });

      // Group filtered participants by country
      const countryData = filteredParticipants.reduce((acc, curr) => {
        if (!acc[curr.country]) {
          acc[curr.country] = {
            country: curr.country,
            coordinates: getCountryCoordinates(curr.country),
            count: 0
          }
        }
        acc[curr.country].count++
        return acc
      }, {} as Record<string, CountryData>);

      // Convert to array
      const countryArray = Object.values(countryData)

      // Add country markers
      const markers = g.selectAll(".country-marker")
        .data(countryArray)
        .join("g")
        .attr("class", "country-marker")
        .attr("transform", d => {
          const [x, y] = projection([d.coordinates.lng, d.coordinates.lat]) || [0, 0]
          return `translate(${x},${y})`
        })

      // Add pin icon
      markers.append("path")
        .attr("d", "M0-12c-2.8 0-5 2.2-5 5 0 3.3 5 8 5 8s5-4.7 5-8c0-2.8-2.2-5-5-5zm0 7c-1.1 0-2-0.9-2-2s0.9-2 2-2 2 0.9 2 2-0.9 2-2 2z")
        .attr("fill", "#4FD1C5")
        .attr("stroke", "#FFFFFF")
        .attr("stroke-width", 0.5)

      // Add labels with background
      const labels = markers.append("g")
        .attr("transform", "translate(8, 0)")

      // Background for labels
      labels.append("rect")
        .attr("x", -4)
        .attr("y", -9)
        .attr("width", d => `${d.country.length * 8 + d.count.toString().length * 8 + 20}`)
        .attr("height", 18)
        .attr("fill", "#002E25")
        .attr("fill-opacity", 0.8)
        .attr("rx", 4)
        .attr("ry", 4)

      // Country name and count
      labels.append("text")
        .attr("fill", "#FFFFFF")
        .attr("font-size", "12px")
        .attr("font-weight", "500")
        .each(function(d) {
          const text = d3.select(this)
          text.append("tspan")
            .text(d.country)
          text.append("tspan")
            .text(` (${d.count})`)
            .attr("fill", "#4FD1C5")
        })

    } catch (error) {
      console.error('Error rendering map:', error)
    }
  }, [activeFilters])

  // Update useEffect with consistent dependencies
  useEffect(() => {
    if (activeSubTab === 'participants') {
      renderMap()
    } else {
      renderStateMap()
    }
  }, [activeSubTab, renderMap, renderStateMap])

  return (
    <div className="bg-[#002E25] rounded-lg">
      <div className="flex space-x-1 px-6 pt-6 border-b border-[#1D4B44]">
        <button
          onClick={() => setActiveSubTab('participants')}
          className={`px-4 py-2 text-sm font-medium relative
            ${activeSubTab === 'participants' 
              ? 'text-[#4FD1C5]' 
              : 'text-gray-400 hover:text-white'
            }
          `}
        >
          Participants
          {activeSubTab === 'participants' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4FD1C5]" />
          )}
        </button>
        <button
          onClick={() => setActiveSubTab('participantsByState')}
          className={`px-4 py-2 text-sm font-medium relative
            ${activeSubTab === 'participantsByState' 
              ? 'text-[#4FD1C5]' 
              : 'text-gray-400 hover:text-white'
            }
          `}
        >
          Participants by State
          {activeSubTab === 'participantsByState' && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4FD1C5]" />
          )}
        </button>
      </div>

      <div className="p-6">
        {activeSubTab === 'participants' ? (
          <div className="h-[350px] overflow-hidden">
            <svg ref={svgRef} />
          </div>
        ) : (
          <div className="h-[350px] flex flex-col items-center justify-center">
            <div className="text-[#4FD1C5] text-2xl font-semibold mb-2">
              Coming Soon!
            </div>
            <p className="text-gray-400 text-center max-w-md">
              We are working on bringing you detailed state-wise participant distribution. Stay tuned for updates!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MapView 