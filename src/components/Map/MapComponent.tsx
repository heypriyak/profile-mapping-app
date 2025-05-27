import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Profile } from '../../types';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  profiles: Profile[];
  selectedProfile?: Profile;
  onMarkerClick?: (profile: Profile) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({
  profiles,
  selectedProfile,
  onMarkerClick
}) => {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (mapRef.current && selectedProfile) {
      mapRef.current.leafletElement.setView(selectedProfile.coordinates, 13);
    }
  }, [selectedProfile]);

  const defaultCenter = { lat: 0, lng: 0 };
  const zoom = selectedProfile ? 13 : 2;

  return (
    <MapContainer
      center={selectedProfile?.coordinates || defaultCenter}
      zoom={zoom}
      ref={mapRef}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {profiles.map((profile) => (
        <Marker
          key={profile.id}
          position={profile.coordinates}
          eventHandlers={{
            click: () => onMarkerClick?.(profile)
          }}
        >
          <Popup>
            <h4>{profile.name}</h4>
            <p>{profile.address}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;