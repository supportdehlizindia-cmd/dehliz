import { Jimp } from 'jimp';
import fs from 'fs';
import path from 'path';

async function generateFavicons() {
    try {
        console.log('Reading logo.png...');
        const logo = await Jimp.read('logo.png');
        const w = logo.bitmap.width;
        const h = logo.bitmap.height;
        console.log(`Original logo dimensions: ${w} x ${h}`);

        // Extract emblem bounds (rows 90 to 730)
        let minX = w, maxX = 0, minY = h, maxY = 0;
        for (let y = 90; y <= 730; y++) {
            for (let x = 0; x < w; x++) {
                if (logo.bitmap.data[(y * w + x) * 4 + 3] > 20) {
                    if (x < minX) minX = x;
                    if (x > maxX) maxX = x;
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;
                }
            }
        }

        const emblemW = maxX - minX + 1;
        const emblemH = maxY - minY + 1;
        console.log(`Emblem bounds: x=${minX}..${maxX}, y=${minY}..${maxY} (${emblemW}x${emblemH})`);

        // Crop emblem cleanly
        const emblem = logo.clone().crop({ x: minX, y: minY, w: emblemW, h: emblemH });

        // Create a perfectly square canvas with 10% padding
        const maxDim = Math.max(emblemW, emblemH);
        const padding = Math.round(maxDim * 0.08); // 8% padding around emblem
        const squareSize = maxDim + (padding * 2);

        const squareImg = new Jimp({ width: squareSize, height: squareSize, color: 0x00000000 });
        const destX = Math.round((squareSize - emblemW) / 2);
        const destY = Math.round((squareSize - emblemH) / 2);

        squareImg.composite(emblem, destX, destY);
        console.log(`Master square favicon canvas created: ${squareSize} x ${squareSize}`);

        // Sizes to generate for Google Search, browsers, Apple touch, Android, PWA
        const configs = [
            { size: 16, name: 'favicon-16x16.png' },
            { size: 32, name: 'favicon-32x32.png' },
            { size: 48, name: 'favicon-48x48.png' },
            { size: 96, name: 'favicon-96x96.png' },
            { size: 144, name: 'favicon-144x144.png' },
            { size: 180, name: 'apple-touch-icon.png' },
            { size: 192, name: 'android-chrome-192x192.png' },
            { size: 512, name: 'android-chrome-512x512.png' },
            { size: 32, name: 'favicon.png' }
        ];

        const targetDirs = ['.', 'public', 'dist'];

        for (const config of configs) {
            const resized = squareImg.clone().resize({ w: config.size, h: config.size });
            for (const dir of targetDirs) {
                if (fs.existsSync(dir)) {
                    const targetPath = path.join(dir, config.name);
                    await resized.write(targetPath);
                    console.log(`Saved: ${targetPath}`);
                }
            }
        }

        // Also copy favicon-48x48.png as favicon.ico for compatibility
        for (const dir of targetDirs) {
            if (fs.existsSync(dir)) {
                const src = path.join(dir, 'favicon-48x48.png');
                const dest = path.join(dir, 'favicon.ico');
                fs.copyFileSync(src, dest);
                console.log(`Copied favicon.ico: ${dest}`);
            }
        }

        console.log('All optimized square favicons generated successfully!');
    } catch (err) {
        console.error('Error generating favicons:', err);
    }
}

generateFavicons();
