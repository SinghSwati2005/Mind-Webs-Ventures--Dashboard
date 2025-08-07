'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L, { LatLngExpression } from 'leaflet';

const DEFAULT_CENTER: LatLngExpression = [28.6139, 77.209]; // Delhi

export default function MapDashboardClient() {
  const featureGroupRef = useRef<L.FeatureGroup>(null);
  const [polygons, setPolygons] = useState<L.Polygon[]>([]);

  const handleCreate = (e: any) => {
    const layer = e.layer;

    const latlngs = layer.getLatLngs()[0];
    if (latlngs.length < 3) {
      alert('Polygon must have at least 3 points.');
      featureGroupRef.current?.removeLayer(layer);
      return;
    }
    if (latlngs.length > 12) {
      alert('Polygon must not have more than 12 points.');
      featureGroupRef.current?.removeLayer(layer);
      return;
    }

    const id = Date.now().toString();
    layer.options.color = 'blue'; // default color, you’ll update it after API or threshold logic

    layer._id = id; // add custom property to track later
    setPolygons((prev) => [...prev, layer]);

    // 👉 Optional: Prompt for data source selection here
    // Example: open a modal, or alert('Selected "temperature_2m" as source.')
    console.log('Polygon created:', latlngs);
  };

  const handleDelete = (e: any) => {
    const deletedLayers = e.layers.getLayers();
    const remaining = polygons.filter(
      (poly) =>
        !deletedLayers.find(
          (del: any) => (del as any)._id === (poly as any)._id
        )
    );
    setPolygons(remaining);
  };

  const handleEdit = (e: any) => {
    const editedLayers = e.layers.getLayers();
    // Optional: You can log updated polygons or apply new rules
    console.log('Edited polygons:', editedLayers);
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
              shapeOptions: {
                color: 'blue',
              },
              allowIntersection: false,
              showArea: true,
              drawError: {
                color: '#e1e100',
                message: 'Invalid polygon',
              },
              guidelineDistance: 10,
            },
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
}
