// Define interfaces for the GeoJSON structure
interface Properties {
  name: string;
}

interface Geometry {
  type: 'Polygon' | 'MultiPolygon';
  coordinates: number[][][] | number[][][][];
}

interface Feature {
  type: 'Feature';
  properties: Properties;
  geometry: Geometry;
}

interface FeatureCollection {
  type: 'FeatureCollection';
  features: Feature[];
}

// Export the data as a constant
export const uaeStates: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Abu Dhabi"
      },
      geometry: {
        type: "MultiPolygon",
        coordinates: [[[[51.5, 22.6], [54.5, 22.6], [54.5, 24.6], [51.5, 24.6], [51.5, 22.6]]]]
      }
    },
    {
      type: "Feature",
      properties: {
        name: "Dubai"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[54.8, 24.7], [55.7, 24.7], [55.7, 25.4], [54.8, 25.4], [54.8, 24.7]]]
      }
    },
    {
      type: "Feature",
      properties: {
        name: "Sharjah"
      },
      geometry: {
        type: "MultiPolygon",
        coordinates: [[[[55.2, 25.2], [55.8, 25.2], [55.8, 25.7], [55.2, 25.7], [55.2, 25.2]]]]
      }
    },
    {
      type: "Feature",
      properties: {
        name: "Ajman"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[55.3, 25.3], [55.5, 25.3], [55.5, 25.5], [55.3, 25.5], [55.3, 25.3]]]
      }
    },
    {
      type: "Feature",
      properties: {
        name: "Umm Al Quwain"
      },
      geometry: {
        type: "Polygon",
        coordinates: [[[55.4, 25.4], [55.7, 25.4], [55.7, 25.6], [55.4, 25.6], [55.4, 25.4]]]
      }
    },
    {
      type: "Feature",
      properties: {
        name: "Ras Al Khaimah"
      },
      geometry: {
        type: "MultiPolygon",
        coordinates: [[[[55.6, 25.5], [56.2, 25.5], [56.2, 26.1], [55.6, 26.1], [55.6, 25.5]]]]
      }
    },
    {
      type: "Feature",
      properties: {
        name: "Fujairah"
      },
      geometry: {
        type: "MultiPolygon",
        coordinates: [[[[56.1, 25.1], [56.4, 25.1], [56.4, 25.6], [56.1, 25.6], [56.1, 25.1]]]]
      }
    }
  ]
};

export const uaeGeoJson = {
  type: "FeatureCollection",
  features: [
    // Array of UAE state features with properties and geometry
    // Each feature should have: properties.name and geometry
  ]
} 