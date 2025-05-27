import { Profile } from '../types';

export const mockProfiles: Profile[] = [
    {
        id: '1',
        name: 'John Doe',
        photograph: 'https://picsum.photos/200',
        description: 'Software Developer with 5 years of experience',
        address: '123 Tech Street, Silicon Valley',
        coordinates: {
            lat: 37.7749,
            lng: -122.4194
        },
        contactInfo: 'john@example.com',
        interests: ['Programming', 'Reading', 'Hiking']
    },
    {
        id: '2',
        name: 'Jane Smith',
        photograph: 'https://picsum.photos/201',
        description: 'UX Designer passionate about user experience',
        address: '456 Design Avenue, New York',
        coordinates: {
            lat: 40.7128,
            lng: -74.0060
        },
        contactInfo: 'jane@example.com',
        interests: ['Design', 'Art', 'Photography']
    }
];