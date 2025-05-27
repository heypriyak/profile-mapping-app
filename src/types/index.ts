export interface Profile {
    id: string;
    name: string;
    photograph: string;
    description: string;
    address: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    contactInfo: string;
    interests: string[];
}

export interface ProfileEditorProps {
    profile?: Profile;
    onProfileSaved: () => void;
    onCancel?: () => void;
}