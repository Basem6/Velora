import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'public', 'images');

// Create images directory if it doesn't exist
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const images = {
  'headphones-1.jpg': 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop',
  'watch-rolex.jpg': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
  'shoes-nike.jpg': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
  'watch-casio.jpg': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
  'phone-iphone.jpg': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop',
  'headphones-sony.jpg': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
  'shoes-adidas.jpg': 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop',
  'phone-samsung.jpg': 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
  'headphones-bose.jpg': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=600&fit=crop',
  'headphones-classic.jpg': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
  'shoes-samba.jpg': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
  'watch-seiko.jpg': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
  'watch-garmin.jpg': 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&h=600&fit=crop',
  'headphones-sennheiser.jpg': 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=600&fit=crop',
  'shoes-nb.jpg': 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop',
  'phone-oneplus.jpg': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop',
  'phone-pixel.jpg': 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop',
  'speaker-jbl.jpg': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
  'shoes-puma.jpg': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
  'mic-audio.jpg': 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop',
};

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const filepath = path.join(imagesDir, filename);

    // Check if file already exists
    if (fs.existsSync(filepath)) {
      console.log(`✓ ${filename} (already exists)`);
      resolve();
      return;
    }

    const file = fs.createWriteStream(filepath);
    protocol
      .get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ Downloaded ${filename}`);
          resolve();
        });
      })
      .on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete the file if download failed
        console.error(`✗ Failed to download ${filename}: ${err.message}`);
        resolve(); // Don't reject, continue with next file
      });
  });
}

async function downloadAllImages() {
  console.log('📥 Starting image download...\n');
  const fileEntries = Object.entries(images);
  
  // Download images sequentially to avoid rate limiting
  for (const [filename, url] of fileEntries) {
    await downloadImage(url, filename);
  }
  
  console.log('\n✨ Image download complete!');
}

downloadAllImages().catch(console.error);
