import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Profile } from '../../types';
import 'leaflet/dist/leaflet.css';

interface DynamicMapProps {
    profiles: Profile[];
}

const DynamicMap: React.FC<DynamicMapProps> = ({ profiles }) => {
    return (
        <MapContainer
            center={[0, 0]}
            zoom={2}
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {profiles.map((profile) => (
                <Marker
                    key={profile.id}
                    position={[profile.coordinates.lat, profile.coordinates.lng]}
                >
                    <Popup>
                        <h3>{profile.name}</h3>
                        <p>{profile.address}</p>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default DynamicMap;