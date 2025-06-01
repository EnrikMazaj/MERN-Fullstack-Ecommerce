import sharp from 'sharp';
import fs from 'fs';

async function convertSvgToPng() {
    const svgBuffer = fs.readFileSync('./logo.svg');

    // Convert to 192x192
    await sharp(svgBuffer)
        .resize(192, 192)
        .png()
        .toFile('./logo192.png');

    // Convert to 512x512
    await sharp(svgBuffer)
        .resize(512, 512)
        .png()
        .toFile('./logo512.png');
}

convertSvgToPng().catch(console.error); 
