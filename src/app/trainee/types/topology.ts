export interface StateProperties {
  name: string;
  code: string;
}

export interface StateGeometry {
  type: "Polygon";
  properties: StateProperties;
  coordinates: number[][][];
}

export interface TopologyData {
  type: "Topology";
  arcs: number[][][];
  transform: {
    scale: [number, number];
    translate: [number, number];
  };
  objects: {
    states: {
      type: "GeometryCollection";
      geometries: StateGeometry[];
    };
  };
}

export interface StateFeature {
  type: "Feature";
  properties: StateProperties;
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
} 