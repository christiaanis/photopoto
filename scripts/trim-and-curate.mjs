import sharp from "sharp";
import { readdirSync, writeFileSync, readFileSync } from "fs";
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

const MIN_DIMENSION = 800; // drop low-res shots that would look soft when enlarged

const all = [];
let trimmedCount = 0;

for (const file of files) {
  const slug = file.replace(/\.jpg$/i, "");
  const filePath = path.join(DIR, file);
  const before = await sharp(filePath).metadata();

  // Strip any baked-in solid-color border (some source uploads had white
  // padding around the photo itself) so every frame is a clean, true-bleed
  // image with no accidental matte.
  const trimmedBuffer = await sharp(readFileSync(filePath))
    .trim({ threshold: 12 })
    .jpeg({ quality: 90, mozjpeg: true })
    .toBuffer();
  const after = await sharp(trimmedBuffer).metadata();

  if (after.width !== before.width || after.height !== before.height) {
    trimmedCount++;
    writeFileSync(filePath, trimmedBuffer);
  }

  const w = after.width ?? 0;
  const h = after.height ?? 0;
  const ratio = w / h;
  const aspect = ratio > 1.15 ? "landscape" : ratio < 0.87 ? "portrait" : "square";
  all.push({ slug, aspect, w, h, area: w * h, max: Math.max(w, h) });
}

console.log(`Trimmed a baked-in border off ${trimmedCount} of ${files.length} photos.`);

const curated = all.filter((p) => p.max >= MIN_DIMENSION);
console.log(`Kept ${curated.length} of ${all.length} photos (dropped ${all.length - curated.length} low-res shots).`);

// Hero: strongest landscape shot by resolution
const hero = curated
  .filter((p) => p.aspect === "landscape")
  .sort((a, b) => b.area - a.area)[0];

const rest = curated.filter((p) => p.slug !== hero.slug);

// Featured (for potential future use): top shots per aspect
const byAspect = { landscape: [], portrait: [], square: [] };
for (const r of rest) byAspect[r.aspect].push(r);
for (const key of Object.keys(byAspect)) byAspect[key].sort((a, b) => b.area - a.area);
const featuredSlugs = new Set();
const quota = { landscape: 3, portrait: 3, square: 1 };
for (const [aspect, n] of Object.entries(quota)) {
  for (const r of byAspect[aspect].slice(0, n)) featuredSlugs.add(r.slug);
}

let ci = 0;
const tsLines = rest.map((r) => {
  const caption = captions[ci++ % captions.length];
  const featured = featuredSlugs.has(r.slug) ? ", featured: true" : "";
  const ratio = (r.w / r.h).toFixed(4);
  return `  { slug: "${r.slug}", alt: "${caption}", aspect: "${r.aspect}", ratio: ${ratio}${featured} },`;
});

const ts = `export interface Photo {
  slug: string;
  alt: string;
  aspect: "portrait" | "landscape" | "square";
  ratio: number;
  featured?: boolean;
}

export const heroPhoto: Photo = { slug: "${hero.slug}", alt: "Featured photograph", aspect: "landscape", ratio: ${(hero.w / hero.h).toFixed(4)} };

export const photos: Photo[] = [
${tsLines.join("\n")}
];

export const featuredPhotos = photos.filter((p) => p.featured);
`;

writeFileSync(path.join(process.cwd(), "src/lib/photos.ts"), ts);
console.log(`Hero: ${hero.slug} (${hero.w}x${hero.h})`);
