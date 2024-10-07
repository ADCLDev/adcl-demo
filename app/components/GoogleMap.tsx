import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { LatLngExpression } from 'leaflet';
import { MapPin, ExternalLink } from 'lucide-react';
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { Button } from './ui/button';

// Dynamically import react-leaflet components with ssr: false
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface MapProps {
  coordinates: string;
}

const Map: React.FC<MapProps> = ({ coordinates }) => {
  const [position, setPosition] = useState<LatLngExpression | null>(null);
  const [googleosition, setGooglePosition] = useState<LatLngExpression | null>(null);
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    
    const parseCoordinates = () => {
      const regex = /(\d+)°(\d+)'([\d.]+)"([NS])\s*(\d+)°(\d+)'([\d.]+)"([EW])/;
      const match = coordinates.match(regex);
      if (match) {
        const [, latDeg, latMin, latSec, latDir, lonDeg, lonMin, lonSec, lonDir] = match;
        const lat = (
          parseInt(latDeg) +
          parseInt(latMin) / 60 +
          parseFloat(latSec) / 3600
        ) * (latDir === 'N' ? 1 : -1);
        const lon = (
          parseInt(lonDeg) +
          parseInt(lonMin) / 60 +
          parseFloat(lonSec) / 3600
        ) * (lonDir === 'E' ? 1 : -1);
        setPosition([lat, lon] as LatLngExpression);
        setMapKey((prevKey) => prevKey + 1); // Force re-render of MapContainer
      }
    };

    parseCoordinates();
  }, [coordinates]);

  

  if (typeof window === 'undefined') {
    return null; // Return null on the server side
  }

  if (!position) return <div>Loading...</div>;

  const customIcon = divIcon({
    html: renderToStaticMarkup(
      <MapPin color="red" size={32} />
    ),
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  // const openGoogleMaps = () => {
  //   const [lat, lon] = position as [number, number];
  //   window.open(`https://www.google.com/maps?q=${lat},${lon}`, '_blank');
  // };

  const openGoogleMaps = () => {
    const [lat, lon] = [23.725476, 90.422530];
    window.open(`https://www.google.com/maps?q=${lat},${lon}`, '_blank');
  };
  
  return (
    <div className="h-80 w-full relative">
      <MapContainer key={mapKey} center={position} zoom={15} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; Arch Design & Construction LTD. Map'
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            <div className="text-sm">
              <h3 className="font-bold">Exact Coordinates</h3>
              <p>{coordinates}</p>
              <p>Latitude: {(position as [number, number])[0].toFixed(6)}</p>
              <p>Longitude: {(position as [number, number])[1].toFixed(6)}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      <Button
        className="absolute bottom-4 right-4 z-[1000] bg-white text-black hover:bg-gray-100"
        onClick={openGoogleMaps}
      >
        <ExternalLink className="mr-2 h-4 w-4" />
        View on Google Maps
      </Button>
    </div>
  );
};

export default Map;