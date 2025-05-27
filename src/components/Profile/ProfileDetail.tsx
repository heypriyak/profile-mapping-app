import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Profile } from '../../types';
import { profileService } from '../../services/profileService';

const ProfileDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (id) {
                const data = await profileService.getProfileById(id);
                setProfile(data);
            }
        };
        fetchProfile();
    }, [id]);

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="profile-detail">
            <h2>{profile.name}</h2>
            <img src={profile.photograph} alt={profile.name} />
            <p>{profile.description}</p>
            <h3>Address</h3>
            <p>{profile.address}</p>
            <h3>Contact Info</h3>
            <p>{profile.contactInfo}</p>
            {profile.interests && profile.interests.length > 0 && (
                <>
                    <h3>Interests</h3>
                    <p>{profile.interests.join(', ')}</p>
                </>
            )}
        </div>
    );
};

export default ProfileDetail;