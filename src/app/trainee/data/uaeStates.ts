// Define interfaces for the data structure
interface StateGeometry {
  type: 'Polygon';
  properties: {
    name: string;
    code: string;
  };
  coordinates: number[][][];
}

interface TopologyData {
  type: string;
  objects: {
    states: {
      type: string;
      geometries: StateGeometry[];
    };
  };
  arcs: number[][][];
  transform: {
    scale: number[];
    translate: number[];
  };
}

// Export the UAE states topology data
export const uaeStates: TopologyData = {
  type: "Topology",
  objects: {
    states: {
      type: "GeometryCollection",
      geometries: [
        {
          type: "Polygon",
          properties: {
            name: "Abu Dhabi",
            code: "AD"
          },
          coordinates: [[[53.847, 22.698], [56.381, 22.698], [56.381, 24.976], [53.847, 24.976], [53.847, 22.698]]]
        },
        {
          type: "Polygon",
          properties: {
            name: "Dubai",
            code: "DU"
          },
          coordinates: [[[55.145, 24.788], [55.645, 24.788], [55.645, 25.328], [55.145, 25.328], [55.145, 24.788]]]
        },
        {
          type: "Polygon",
          properties: {
            name: "Sharjah",
            code: "SH"
          },
          coordinates: [[[55.435, 25.283], [55.735, 25.283], [55.735, 25.583], [55.435, 25.583], [55.435, 25.283]]]
        },
        {
          type: "Polygon",
          properties: {
            name: "Ajman",
            code: "AJ"
          },
          coordinates: [[[55.435, 25.383], [55.535, 25.383], [55.535, 25.483], [55.435, 25.483], [55.435, 25.383]]]
        },
        {
          type: "Polygon",
          properties: {
            name: "Umm Al Quwain",
            code: "UQ"
          },
          coordinates: [[[55.485, 25.483], [55.785, 25.483], [55.785, 25.683], [55.485, 25.683], [55.485, 25.483]]]
        },
        {
          type: "Polygon",
          properties: {
            name: "Ras Al Khaimah",
            code: "RK"
          },
          coordinates: [[[55.735, 25.583], [56.035, 25.583], [56.035, 26.083], [55.735, 26.083], [55.735, 25.583]]]
        },
        {
          type: "Polygon",
          properties: {
            name: "Fujairah",
            code: "FU"
          },
          coordinates: [[[56.235, 25.112], [56.435, 25.112], [56.435, 25.612], [56.235, 25.612], [56.235, 25.112]]]
        }
      ]
    }
  },
  arcs: [],
  transform: {
    scale: [1, 1],
    translate: [0, 0]
  }
}; 