import L from 'leaflet';

export const initializeMap = (mapContainer: HTMLElement) => {
    const map = L.map(mapContainer).setView([0, 0], 2);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    
    return map;
};

export const addMarker = (map: L.Map, position: { lat: number; lng: number }, title: string) => {
    const marker = L.marker([position.lat, position.lng])
        .bindPopup(title)
        .addTo(map);
    
    return marker;
};

export const setMapCenter = (map: any, position: { lat: number; lng: number }) => {
    // Set the center of the map to the specified position
    map.setView([position.lat, position.lng]);
};

export const clearMarkers = (markers: any[]) => {
    // Clear all markers from the map
    markers.forEach(marker => {
        marker.remove();
    });
};