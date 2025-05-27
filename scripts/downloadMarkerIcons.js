const https = require('https');
const fs = require('fs');
const path = require('path');

const icons = [
    {
        url: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon.png',
        filename: 'marker-icon.png'
    },
    {
        url: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x.png',
        filename: 'marker-icon-2x.png'
    },
    {
        url: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-shadow.png',
        filename: 'marker-shadow.png'
    }
];

const publicDir = path.join(__dirname, '..', 'public');

icons.forEach(({ url, filename }) => {
    const filepath = path.join(publicDir, filename);
    https.get(url, (response) => {
        response.pipe(fs.createWriteStream(filepath));
    });
});