import { Profile } from '../types';
import { mockProfiles } from '../mockData/profiles';

let profiles: Profile[] = [...mockProfiles];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const profileService = {
    async fetchProfiles(): Promise<Profile[]> {
        try {
            // Simulate API delay
            await delay(1000);
            return profiles;
        } catch (error) {
            console.error('Error fetching profiles:', error);
            throw new Error('Failed to fetch profiles');
        }
    },

    async getProfileById(id: string): Promise<Profile> {
        await delay(500);
        const profile = profiles.find(p => p.id === id);
        if (!profile) {
            throw new Error('Profile not found');
        }
        return profile;
    },

    async createProfile(profileData: Omit<Profile, 'id'>): Promise<Profile> {
        await delay(500);
        const newProfile: Profile = {
            ...profileData,
            id: Date.now().toString(),
            contactInfo: profileData.contactInfo || '',
            interests: profileData.interests || []
        };
        profiles.push(newProfile);
        return newProfile;
    },

    async updateProfile(profile: Profile): Promise<Profile> {
        await delay(500);
        const index = profiles.findIndex(p => p.id === profile.id);
        if (index === -1) {
            throw new Error('Profile not found');
        }
        profiles[index] = {
            ...profile,
            contactInfo: profile.contactInfo || '',
            interests: profile.interests || []
        };
        return profiles[index];
    },

    async deleteProfile(id: string): Promise<void> {
        await delay(500);
        const index = profiles.findIndex(p => p.id === id);
        if (index === -1) {
            throw new Error('Profile not found');
        }
        profiles = profiles.filter(p => p.id !== id);
    }
};