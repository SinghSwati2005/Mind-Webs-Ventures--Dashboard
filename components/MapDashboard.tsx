// MapDashboard.tsx (Updated to support timeline slider and polygon coloring by time)
'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { useRef, useState, useEffect } from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L, { LatLngExpression } from 'leaflet';

import { useDashboardStore } from '@/store/useDashboardStore';
import { getPolygonCentroid, applyColorFromRules } from '@/utils/Polyutils';
import { ThresholdRule } from '@/store/useDashboardStore';
import { useTimelineStore } from '@/store/useTimelineStore';


const DEFAULT_CENTER: LatLngExpression = [28.6139, 77.209];

interface CustomPolygon extends L.Polygon {
  _id: string;
}

async function fetchHourlyValues(lat: number, lon: number, field: string, start: string, end: string): Promise<number[]> {
  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=2025-07-18&end_date=2025-08-01&hourly=temperature_2m`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.hourly?.[field] ?? [];
  } catch (err) {
    console.error('Weather fetch error:', err);
    return [];
  }
}

export default function MapDashboardClient() {
  const featureGroupRef = useRef<L.FeatureGroup>(null);
  const [polygons, setPolygons] = useState<CustomPolygon[]>([]);
  const { polygonRules, setPolygonRules } = useDashboardStore();
  const { selectedRange } = useTimelineStore();

  useEffect(() => {
    async function updatePolygonColors() {
      for (const poly of polygons) {
        const centroid = getPolygonCentroid(poly);
        const ruleSet = polygonRules.find((r) => r.polygonId === poly._id);
        if (!ruleSet) continue;

        const hourlyVals = await fetchHourlyValues(
          centroid.lat,
          centroid.lng,
          ruleSet.dataSource,
          selectedRange.start,
          selectedRange.end
        );

        if (hourlyVals.length > 0) {
          const avg = hourlyVals.reduce((a, b) => a + b, 0) / hourlyVals.length;
          const color = applyColorFromRules(avg, ruleSet.rules);
          poly.setStyle({ color });
        }
      }
    }

    if (polygons.length) updatePolygonColors();
  }, [polygonRules, polygons, selectedRange]);

  const handleCreate = (e: any) => {
    const layer = e.layer as CustomPolygon;
    const latlngs = layer.getLatLngs()[0] as L.LatLng[];
    if (latlngs.length < 3 || latlngs.length > 12) {
      alert('Polygon must have between 3 and 12 points.');
      featureGroupRef.current?.removeLayer(layer);
      return;
    }

    const id = Date.now().toString();
    layer._id = id;
    const field = 'temperature_2m';
    const defaultRules: ThresholdRule[] = [
      { operator: '<', value: 10, color: 'red' },
      { operator: '>=', value: 10, color: 'blue' },
      { operator: '>=', value: 25, color: 'green' },
    ];

    setPolygonRules([
      ...polygonRules,
      { polygonId: id, dataSource: field, rules: defaultRules },
    ]);

    setPolygons((prev) => [...prev, layer]);
  };

  const handleDelete = (e: any) => {
    const deletedLayers = e.layers.getLayers();
    const remaining = polygons.filter(
      (poly) => !deletedLayers.find((del: any) => (del as CustomPolygon)._id === poly._id)
    );
    setPolygons(remaining);

    const updatedRules = polygonRules.filter(
      (rule) => !deletedLayers.find((del: any) => (del as CustomPolygon)._id === rule.polygonId)
    );
    setPolygonRules(updatedRules);
  };

  const handleEdit = (e: any) => {
    console.log('Edited polygons:', e.layers.getLayers());
  };

  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={13}
      style={{ height: '600px', width: '100%' }}
      zoomControl={false}
      dragging={true}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FeatureGroup ref={featureGroupRef}>
        <EditControl
          position="topright"
          onCreated={handleCreate}
          onDeleted={handleDelete}
          onEdited={handleEdit}
          draw={{
            rectangle: false,
            circle: false,
            circlemarker: false,
            marker: false,
            polyline: false,
            polygon: {
              shapeOptions: { color: 'blue' },
              allowIntersection: false,
              showArea: true,
              drawError: { color: '#e1e100', message: 'Invalid polygon' },
              guidelineDistance: 10,
            },
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
}
