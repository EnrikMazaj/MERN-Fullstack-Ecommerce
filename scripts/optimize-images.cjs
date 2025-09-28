const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, '../public/assets');
const OPTIMIZED_DIR = path.join(__dirname, '../public/assets/optimized');

// Create optimized directory if it doesn't exist
if (!fs.existsSync(OPTIMIZED_DIR)) {
    fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
}

async function optimizeImage(inputPath, outputPath, options = {}) {
    try {
        const { width = 800, quality = 80, format = 'webp' } = options;

        await sharp(inputPath)
            .resize(width, null, {
                withoutEnlargement: true,
                fit: 'inside'
            })
            .toFormat(format, { quality })
            .toFile(outputPath);

        const inputStats = fs.statSync(inputPath);
        const outputStats = fs.statSync(outputPath);
        const reduction = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(1);

        console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
        console.log(`   Size: ${(inputStats.size / 1024).toFixed(1)}KB → ${(outputStats.size / 1024).toFixed(1)}KB (${reduction}% reduction)`);

        return outputPath;
    } catch (error) {
        console.error(`❌ Error optimizing ${inputPath}:`, error.message);
        return null;
    }
}

async function optimizeAssets() {
    console.log('🚀 Starting image optimization...\n');

    const images = [
        { input: 'ktel.png', width: 400, quality: 85 },
        { input: 'map.png', width: 800, quality: 80 },
        { input: 'cart.png', width: 200, quality: 85 }
    ];

    for (const img of images) {
        const inputPath = path.join(ASSETS_DIR, img.input);
        const outputPath = path.join(OPTIMIZED_DIR, img.input.replace(/\.(png|jpg|jpeg)$/, '.webp'));

        if (fs.existsSync(inputPath)) {
            await optimizeImage(inputPath, outputPath, {
                width: img.width,
                quality: img.quality,
                format: 'webp'
            });
        } else {
            console.log(`⚠️  File not found: ${inputPath}`);
        }
    }

    console.log('\n✅ Image optimization complete!');
    console.log('Update your components to use the optimized images from /assets/optimized/');
}

if (require.main === module) {
    optimizeAssets();
}

module.exports = { optimizeImage, optimizeAssets };