import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useLocation, Location } from 'react-router-dom';
import { Profile } from '../../types';
import { profileService } from '../../services/profileService';
import LoadingSpinner from '../UI/LoadingSpinner';
import 'leaflet/dist/leaflet.css';

interface LocationState {
    selectedProfile?: Profile;
    coordinates?: {
        lat: number;
        lng: number;
    };
}

const MapView: React.FC = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation() as Location & { state: LocationState };
    const selectedProfile = location.state?.selectedProfile;
    const initialCenter = selectedProfile?.coordinates || { lat: 0, lng: 0 };
    const initialZoom = selectedProfile ? 13 : 2;

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const data = await profileService.fetchProfiles();
                setProfiles(data);
            } catch (err) {
                setError('Failed to fetch profiles');
            } finally {
                setLoading(false);
            }
        };
        fetchProfiles();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="map-page">
            <div className="map-container">
                <MapContainer
                    center={[initialCenter.lat, initialCenter.lng]}
                    zoom={initialZoom}
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
                                <div className="map-popup">
                                    <h3>{profile.name}</h3>
                                    <p>{profile.description}</p>
                                    <p>{profile.address}</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default MapView;