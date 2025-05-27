import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Profile } from '../../types';
import { profileService } from '../../services/profileService';
import LoadingSpinner from '../UI/LoadingSpinner';

const ProfileList: React.FC = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfiles();
    }, []);

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

    const handleViewDetails = (id: string) => {
        navigate(`/profile/${id}`);
    };

    const handleShowOnMap = (profile: Profile) => {
        navigate('/map', { 
            state: { 
                selectedProfile: profile,
                coordinates: profile.coordinates
            } 
        });
    };

    if (loading) return <LoadingSpinner />;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="page-wrapper">
            <header className="page-header">
                <h1 className="page-title">Profile Mapping App</h1>
            </header>
            <div className="profiles-container">
                <div className="profiles-grid">
                    {profiles.map((profile) => (
                        <div key={profile.id} className="profile-card">
                            <div className="profile-image">
                                <img src={profile.photograph} alt={profile.name} />
                            </div>
                            <div className="profile-info">
                                <h2>{profile.name}</h2>
                                <p>{profile.description}</p>
                                <div className="profile-actions">
                                    <button
                                        className="details-button"
                                        onClick={() => handleViewDetails(profile.id)}
                                    >
                                        View Details
                                    </button>
                                    <button
                                        className="location-button"
                                        onClick={() => handleShowOnMap(profile)}
                                    >
                                        Show on Map
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfileList;