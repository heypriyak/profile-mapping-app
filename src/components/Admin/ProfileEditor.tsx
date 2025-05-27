import React, { useState, useEffect } from 'react';
import { Profile, ProfileEditorProps } from '../../types';
import { profileService } from '../../services/profileService';

const ProfileEditor: React.FC<ProfileEditorProps> = ({ profile, onProfileSaved, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        photograph: '',
        description: '',
        address: '',
        contactInfo: '',
        interests: '',
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name,
                photograph: profile.photograph,
                description: profile.description,
                address: profile.address,
                contactInfo: profile.contactInfo,
                interests: profile.interests.join(', '),
            });
        }
    }, [profile]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const profileData = {
                ...formData,
                interests: formData.interests.split(',').map(i => i.trim()),
                coordinates: profile?.coordinates || { lat: 0, lng: 0 }
            };

            if (profile) {
                await profileService.updateProfile({ ...profileData, id: profile.id });
            } else {
                await profileService.createProfile(profileData);
            }
            onProfileSaved();
        } catch (error) {
            console.error('Failed to save profile:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="url"
                    name="photograph"
                    value={formData.photograph}
                    onChange={handleInputChange}
                    placeholder="Photograph URL"
                    required
                />
            </div>
            <div className="form-group">
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Address"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleInputChange}
                    placeholder="Contact Info (email, phone)"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="interests"
                    value={formData.interests}
                    onChange={handleInputChange}
                    placeholder="Interests (comma-separated)"
                    required
                />
            </div>
            <div className="form-actions">
                <button type="submit" className="save-button">
                    {profile ? 'Update Profile' : 'Save Profile'}
                </button>
                {onCancel && (
                    <button type="button" className="cancel-button" onClick={onCancel}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default ProfileEditor;