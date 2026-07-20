import sharp from "sharp";
import { readdirSync, mkdirSync, rmSync, writeFileSync } from "fs";
import path from "path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public/images/portfolio");
const RAW_FILES = readdirSync(ROOT).filter((f) => /\.jpe?g$/i.test(f));

if (RAW_FILES.length === 0) {
  console.log("No raw jpeg files found in repo root.");
  process.exit(0);
}

rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });

const entries = [];

for (let i = 0; i < RAW_FILES.length; i++) {
  const file = RAW_FILES[i];
  const slug = `photo-${String(i + 1).padStart(3, "0")}`;
  const srcPath = path.join(ROOT, file);
  const img = sharp(srcPath).rotate(); // auto-orient via EXIF
  const meta = await img.metadata();
  const w = meta.width ?? 1;
  const h = meta.height ?? 1;
  const ratio = w / h;
  const aspect = ratio > 1.15 ? "landscape" : ratio < 0.87 ? "portrait" : "square";

  const outPath = path.join(OUT_DIR, `${slug}.jpg`);
  await img
    .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(outPath);

  entries.push({ slug, aspect, sourceFile: file });
  console.log(`${file} -> ${slug}.jpg (${aspect}, ${w}x${h})`);
}

// pick a spread of featured photos across the set
const featuredIdx = new Set();
const step = Math.max(1, Math.floor(entries.length / 8));
for (let i = 0; i < entries.length && featuredIdx.size < 8; i += step) {
  featuredIdx.add(i);
}

const tsLines = entries.map((e, i) =>
  `  { slug: "${e.slug}", alt: "Photograph ${i + 1}", aspect: "${e.aspect}"${
    featuredIdx.has(i) ? ", featured: true" : ""
  } },`
);

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

writeFileSync(path.join(ROOT, "src/lib/photos.ts"), ts);
console.log(`\nDone. ${entries.length} photos processed. src/lib/photos.ts regenerated.`);
