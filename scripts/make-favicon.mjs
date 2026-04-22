// Generates favicon.png (512x512) and apple-touch-icon.png (180x180)
// from the brand mark (logo-reduzido.png).
//
// The source PNG contains a compass rose badge with decorative curves
// that extend far beyond the circle. We detect the beige badge fill,
// compute its bounding box, then crop a square centered on it with a
// small margin so the favicon is a clean, recognizable mark.
//
// Run: node scripts/make-favicon.mjs
import sharp from 'sharp';

const SRC = 'public/brand/logo-reduzido.png';

const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels } = info;

let minX = W, minY = H, maxX = 0, maxY = 0;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * channels;
    const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
    if (a < 200) continue;
    // Warm beige badge fill (~#E8DFC8): low saturation, R>=G>B.
    const isBeige = r > 200 && g > 190 && b > 160 && b < 210 && r >= g && g >= b && r - b < 60;
    if (!isBeige) continue;
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
}

const cx = (minX + maxX) / 2;
const cy = (minY + maxY) / 2;
const radius = Math.max(maxX - minX, maxY - minY) / 2;
const margin = 1.15;
const size = Math.round(radius * 2 * margin);
const left = Math.round(Math.max(0, cx - size / 2));
const top = Math.round(Math.max(0, cy - size / 2));
const width = Math.min(size, W - left);
const height = Math.min(size, H - top);

console.log(
  `badge=(${minX},${minY})-(${maxX},${maxY}) center=(${cx.toFixed(0)},${cy.toFixed(0)}) crop=${width}x${height}@(${left},${top})`,
);

const cropped = sharp(SRC).extract({ left, top, width, height });

await cropped
  .clone()
  .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile('public/favicon.png');

await cropped
  .clone()
  .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile('public/apple-touch-icon.png');

console.log('wrote public/favicon.png and public/apple-touch-icon.png');
