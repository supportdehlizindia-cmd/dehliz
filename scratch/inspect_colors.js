import { Jimp } from 'jimp';

async function inspectColors() {
    try {
        const image = await Jimp.read('logo2.png');
        console.log(`Dimensions: ${image.width}x${image.height}`);
        
        // Let's print colors at a grid of points
        for (let y = 0; y < image.height; y += Math.floor(image.height / 5)) {
            for (let x = 0; x < image.width; x += Math.floor(image.width / 5)) {
                const idx = (y * image.width + x) * 4;
                const r = image.bitmap.data[idx];
                const g = image.bitmap.data[idx + 1];
                const b = image.bitmap.data[idx + 2];
                const a = image.bitmap.data[idx + 3];
                console.log(`Pixel (${x}, ${y}): RGB(${r}, ${g}, ${b}) Alpha(${a})`);
            }
        }
    } catch (err) {
        console.error(err);
    }
}
inspectColors();
