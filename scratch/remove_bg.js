import { Jimp } from 'jimp';

async function removeBackground() {
    try {
        console.log("Reading logo2.png...");
        const image = await Jimp.read('logo2.png');
        
        // Get background color from top-left pixel (0, 0) directly from bitmap data
        const bgR = image.bitmap.data[0];
        const bgG = image.bitmap.data[1];
        const bgB = image.bitmap.data[2];
        console.log(`Detected background color: RGB(${bgR}, ${bgG}, ${bgB})`);

        // Tolerance for color matching
        const tolerance = 45;

        let modifiedCount = 0;
        image.scan(0, 0, image.width, image.height, function (x, y, idx) {
            const r = this.bitmap.data[idx + 0];
            const g = this.bitmap.data[idx + 1];
            const b = this.bitmap.data[idx + 2];

            // Calculate distance to background color
            const diff = Math.sqrt(
                Math.pow(r - bgR, 2) +
                Math.pow(g - bgG, 2) +
                Math.pow(b - bgB, 2)
            );

            if (diff < tolerance) {
                this.bitmap.data[idx + 3] = 0; // Set alpha to 0 (fully transparent)
                modifiedCount++;
            }
        });

        console.log(`Modified ${modifiedCount} pixels out of ${image.width * image.height}. Saving image...`);
        
        // Save back to logo2.png
        await image.write('logo2.png');
        console.log("Success! Saved transparent logo2.png.");
    } catch (err) {
        console.error("Error processing image:", err);
    }
}

removeBackground();
