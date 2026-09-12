import { Jimp } from 'jimp';
import fs from 'fs';
import path from 'path';

async function createFavicons() {
    try {
        console.log('Reading logo.png...');
        const logo = await Jimp.read('logo.png');
        console.log('Original logo:', logo.bitmap.width, 'x', logo.bitmap.height);
        
        // Sizes to generate
        const configs = [
            { size: 16, name: 'favicon-16x16.png' },
            { size: 32, name: 'favicon-32x32.png' },
            { size: 48, name: 'favicon-48x48.png' },
            { size: 180, name: 'apple-touch-icon.png' },
            { size: 192, name: 'android-chrome-192x192.png' },
            { size: 512, name: 'android-chrome-512x512.png' },
            { size: 32, name: 'favicon.png' },
            { size: 32, name: 'favicon.ico' }
        ];

        const targetDirs = ['.', 'public', 'dist'];

        for (const config of configs) {
            const resized = logo.clone().resize({ w: config.size, h: config.size });
            for (const dir of targetDirs) {
                if (fs.existsSync(dir)) {
                    const targetPath = path.join(dir, config.name);
                    await resized.write(targetPath);
                    console.log(`Saved: ${targetPath}`);
                }
            }
        }

        console.log('All favicons created successfully!');
    } catch (e) {
        console.error('Error creating favicons:', e);
    }
}

createFavicons();
