import sharp from "sharp";
import { readdirSync, writeFileSync } from "fs";
import path from "path";

const DIR = "/tmp/newraw";
const files = readdirSync(DIR).filter((f) => /\.jpe?g$/i.test(f)).sort();

function laplacianVariance(buf, w, h) {
  // buf is greyscale raw pixels. Simple 3x3 Laplacian for sharpness estimate.
  let sum = 0;
  let sumSq = 0;
  let n = 0;
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = y * w + x;
      const lap =
        -4 * buf[idx] +
        buf[idx - 1] +
        buf[idx + 1] +
        buf[idx - w] +
        buf[idx + w];
      sum += lap;
      sumSq += lap * lap;
      n++;
    }
  }
  const mean = sum / n;
  return sumSq / n - mean * mean;
}

const results = [];

for (const file of files) {
  const p = path.join(DIR, file);
  try {
    const img = sharp(p).rotate();
    const meta = await img.metadata();
    const w = meta.width ?? 0;
    const h = meta.height ?? 0;

    // Downscale for fast analysis
    const small = await sharp(p).rotate().resize(400, 400, { fit: "inside" }).greyscale().raw().toBuffer({ resolveWithObject: true });
    const { data, info } = small;
    const sharpness = laplacianVariance(data, info.width, info.height);

    let brightSum = 0;
    for (let i = 0; i < data.length; i++) brightSum += data[i];
    const brightness = brightSum / data.length;

    // tiny hash for near-duplicate clustering
    const tiny = await sharp(p).rotate().resize(8, 8, { fit: "fill" }).greyscale().raw().toBuffer();
    let avg = 0;
    for (const v of tiny) avg += v;
    avg /= tiny.length;
    let hash = "";
    for (const v of tiny) hash += v > avg ? "1" : "0";

    results.push({
      file,
      w,
      h,
      area: w * h,
      sharpness: Math.round(sharpness),
      brightness: Math.round(brightness),
      hash,
    });
  } catch (e) {
    console.log(file, "ERROR", e.message);
  }
}

writeFileSync("/tmp/analysis.json", JSON.stringify(results, null, 2));
console.log(`Analyzed ${results.length} photos.`);

const sharpnessVals = results.map((r) => r.sharpness).sort((a, b) => a - b);
console.log("Sharpness range:", sharpnessVals[0], "to", sharpnessVals[sharpnessVals.length - 1]);
console.log("Sharpness median:", sharpnessVals[Math.floor(sharpnessVals.length / 2)]);
