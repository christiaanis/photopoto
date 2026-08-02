import sharp from "sharp";
import { readdirSync, writeFileSync, mkdirSync, rmSync, readFileSync } from "fs";
import path from "path";

const SRC_DIR = "/tmp/newraw";
const OUT_DIR = path.join(process.cwd(), "public/images/portfolio");
const MIN_DIMENSION = 1200; // these are real camera files; keep the bar high
const MAX_DIMENSION = 3200; // sublime quality for a real-camera source

const dropList = new Set(JSON.parse(readFileSync("/tmp/drop-list.json", "utf-8")));

rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });

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

const files = readdirSync(SRC_DIR)
  .filter((f) => /\.jpe?g$/i.test(f) && !dropList.has(f))
  .sort();

const all = [];

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const slug = `photo-${String(i + 1).padStart(3, "0")}`;
  const srcPath = path.join(SRC_DIR, file);

  const oriented = await sharp(srcPath).rotate().toBuffer();
  const trimmed = await sharp(oriented).trim({ threshold: 12 }).toBuffer();
  const meta = await sharp(trimmed).metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;
  const ratio = w / h;
  const aspect = ratio > 1.15 ? "landscape" : ratio < 0.87 ? "portrait" : "square";
  const max = Math.max(w, h);

  if (max < MIN_DIMENSION) {
    console.log(`skip ${file} (${w}x${h}, too small)`);
    continue;
  }

  await sharp(trimmed)
    .resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: "inside",
      withoutEnlargement: true,
    })
    .modulate({ saturation: 0.97, brightness: 1.01 })
    .linear(1.035, -3) // gentle, consistent contrast lift
    .sharpen({ sigma: 0.6 })
    .jpeg({ quality: 94, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(path.join(OUT_DIR, `${slug}.jpg`));

  all.push({ slug, aspect, ratio, w, h, area: w * h });
  console.log(`${file} -> ${slug}.jpg (${aspect}, ${w}x${h})`);
}

const hero = all.filter((p) => p.aspect === "landscape").sort((a, b) => b.area - a.area)[0];
const rest = all.filter((p) => p.slug !== hero.slug);

const byAspect = { landscape: [], portrait: [], square: [] };
for (const r of rest) byAspect[r.aspect].push(r);
for (const key of Object.keys(byAspect)) byAspect[key].sort((a, b) => b.area - a.area);
const featuredSlugs = new Set();
const quota = { landscape: 4, portrait: 4, square: 2 };
for (const [aspect, n] of Object.entries(quota)) {
  for (const r of byAspect[aspect].slice(0, n)) featuredSlugs.add(r.slug);
}

let ci = 0;
const tsLines = rest.map((r) => {
  const caption = captions[ci++ % captions.length];
  const featured = featuredSlugs.has(r.slug) ? ", featured: true" : "";
  return `  { slug: "${r.slug}", alt: "${caption}", aspect: "${r.aspect}", ratio: ${r.ratio.toFixed(4)}${featured} },`;
});

const ts = `export interface Photo {
  slug: string;
  alt: string;
  aspect: "portrait" | "landscape" | "square";
  ratio: number;
  featured?: boolean;
}

export const heroPhoto: Photo = { slug: "${hero.slug}", alt: "Featured photograph", aspect: "landscape", ratio: ${hero.ratio.toFixed(4)} };

export const photos: Photo[] = [
${tsLines.join("\n")}
];

export const featuredPhotos = photos.filter((p) => p.featured);
`;

writeFileSync(path.join(process.cwd(), "src/lib/photos.ts"), ts);
console.log(`\nDone. ${all.length} kept (of ${files.length}). Hero: ${hero.slug} (${hero.w}x${hero.h})`);
