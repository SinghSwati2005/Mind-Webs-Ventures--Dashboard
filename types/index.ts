export interface PolygonData {
  id: string;
  coordinates: number[][];
  centroid: [number, number];
  dataSource: string;
  color: string;
  rules: ColorRule[];
}

export interface ColorRule {
  operator: '<' | '<=' | '>' | '>=' | '=';
  value: number;
  color: string;
}
