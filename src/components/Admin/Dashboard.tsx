import React, { useState, useEffect } from 'react';
import { Profile } from '../../types';
import { profileService } from '../../services/profileService';
import ProfileEditor from './ProfileEditor';

const Dashboard: React.FC = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
        try {
            const data = await profileService.fetchProfiles();
            setProfiles(data);
        } catch (error) {
            console.error('Failed to fetch profiles:', error);
        }
    };

    const handleEdit = (profile: Profile) => {
        setEditingProfile(profile);
    };

    const handleDelete = async (id: string) => {
        try {
            await profileService.deleteProfile(id);
            fetchProfiles();
        } catch (error) {
            console.error('Failed to delete profile:', error);
        }
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            
            <ProfileEditor 
                profile={editingProfile || undefined}
                onProfileSaved={() => {
                    fetchProfiles();
                    setEditingProfile(null);
                }}
                onCancel={() => setEditingProfile(null)}
            />

            <div className="profiles-list">
                {profiles.map(profile => (
                    <div key={profile.id} className="profile-item">
                        <h2>{profile.name}</h2>
                        <p>{profile.description}</p>
                        <p><strong>Address:</strong> {profile.address}</p>
                        <p><strong>Contact:</strong> {profile.contactInfo}</p>
                        <p><strong>Interests:</strong> {profile.interests.join(', ')}</p>
                        <div className="profile-actions">
                            <button 
                                onClick={() => handleEdit(profile)} 
                                className="edit-button"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => handleDelete(profile.id)} 
                                className="delete-button"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;