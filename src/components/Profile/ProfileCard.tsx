import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Profile } from '../../types';

interface ProfileCardProps {
    profile: Profile;
    onShowLocation: (profile: Profile) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onShowLocation }) => {
    const navigate = useNavigate();

    return (
        <div className="profile-card">
            <div className="profile-image">
                <img src={profile.photograph} alt={profile.name} />
            </div>
            <div className="profile-info">
                <h3>{profile.name}</h3>
                <p>{profile.description}</p>
                <div className="profile-actions">
                    <button
                        onClick={() => navigate(`/profile/${profile.id}`)}
                        className="details-button"
                    >
                        View Details
                    </button>
                    <button
                        onClick={() => onShowLocation(profile)}
                        className="location-button"
                    >
                        Show on Map
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;