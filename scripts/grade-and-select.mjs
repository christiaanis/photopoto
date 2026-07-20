import sharp from "sharp";
import { readdirSync, writeFileSync } from "fs";
import path from "path";

const DIR = path.join(process.cwd(), "public/images/portfolio");
const files = readdirSync(DIR).filter((f) => /\.jpg$/i.test(f)).sort();

const captions = [
  "Natural light, unposed moment",
  "Quiet composition, honest detail",
  "Candid frame, available light",
  "Study in light and shadow",
  "A moment, held still",
  "Texture and tone, on location",
  "Minimal frame, maximum light",
  "Documentary eye, editorial finish",
];

const results = [];

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const slug = file.replace(/\.jpg$/i, "");
  const filePath = path.join(DIR, file);
  const img = sharp(filePath);
  const meta = await img.metadata();
  const w = meta.width ?? 1;
  const h = meta.height ?? 1;
  const ratio = w / h;
  const aspect = ratio > 1.15 ? "landscape" : ratio < 0.87 ? "portrait" : "square";

  // Subtle, consistent editorial grade: gentle contrast lift, light desaturation,
  // slight cool shadows via tint, and a touch of sharpening for web crispness.
  const buf = await img
    .rotate()
    .modulate({ saturation: 0.94, brightness: 1.02 })
    .linear(1.06, -8) // gentle contrast
    .sharpen({ sigma: 0.6 })
    .jpeg({ quality: 84, mozjpeg: true })
    .toBuffer();

  writeFileSync(filePath, buf);

  results.push({ slug, aspect, area: w * h, index: i });
  console.log(`graded ${file} (${aspect}, ${w}x${h})`);
}

// Feature the highest-resolution shots, capped per-aspect for variety, ~8 total
const byAspect = { landscape: [], portrait: [], square: [] };
for (const r of results) byAspect[r.aspect].push(r);
for (const key of Object.keys(byAspect)) {
  byAspect[key].sort((a, b) => b.area - a.area);
}

const featuredSlugs = new Set();
const quota = { landscape: 4, portrait: 3, square: 1 };
for (const [aspect, n] of Object.entries(quota)) {
  for (const r of byAspect[aspect].slice(0, n)) featuredSlugs.add(r.slug);
}

const tsLines = results.map((r, i) => {
  const caption = captions[i % captions.length];
  const featured = featuredSlugs.has(r.slug) ? ", featured: true" : "";
  return `  { slug: "${r.slug}", alt: "${caption}", aspect: "${r.aspect}"${featured} },`;
});

const ts = `export interface Photo {
  slug: string;
  alt: string;
  aspect: "portrait" | "landscape" | "square";
  featured?: boolean;
}

export const photos: Photo[] = [
${tsLines.join("\n")}
];

export const featuredPhotos = photos.filter((p) => p.featured);
`;

writeFileSync(path.join(process.cwd(), "src/lib/photos.ts"), ts);
console.log(`\nDone. Featured: ${featuredSlugs.size} photos.`);
