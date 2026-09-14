const fs = require('fs');
const path = require('path');
const https = require('https');

const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=https://dehlizindia.com/&margin=15';
const destPublic = path.join(__dirname, '..', 'public', 'website_qr.png');
const destRoot = path.join(__dirname, '..', 'website_qr.png');

console.log('Fetching QR code from:', qrUrl);

https.get(qrUrl, (res) => {
    if (res.statusCode === 200) {
        const fileStreamPublic = fs.createWriteStream(destPublic);
        const fileStreamRoot = fs.createWriteStream(destRoot);
        res.pipe(fileStreamPublic);
        res.pipe(fileStreamRoot);
        fileStreamRoot.on('finish', () => {
            fileStreamPublic.close();
            fileStreamRoot.close();
            console.log('QR Code generated successfully at public/website_qr.png and website_qr.png');
        });
    } else {
        console.error('Failed to download QR code, status code:', res.statusCode);
    }
}).on('error', (err) => {
    console.error('Error downloading QR code:', err.message);
});
