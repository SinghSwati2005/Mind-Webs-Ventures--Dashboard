import L from "leaflet";
import { ThresholdRule } from "@/store/useDashboardStore";

export function getPolygonCentroid(polygon: L.Polygon): { lat: number; lng: number } {
  const latlngs = polygon.getLatLngs()[0] as L.LatLng[];
  let lat = 0, lng = 0;

  for (const point of latlngs) {
    lat += point.lat;
    lng += point.lng;
  }

  return {
    lat: lat / latlngs.length,
    lng: lng / latlngs.length,
  };
}

export function applyColorFromRules(value: number, rules: ThresholdRule[]): string {
  for (const rule of rules) {
    const { operator, value: ruleVal, color } = rule;
    if (
      (operator === "<" && value < ruleVal) ||
      (operator === "<=" && value <= ruleVal) ||
      (operator === "=" && value === ruleVal) ||
      (operator === ">=" && value >= ruleVal) ||
      (operator === ">" && value > ruleVal)
    ) {
      return color;
    }
  }
  return "gray"; // fallback color
}
