// Converts every dish photo in public/photos to a web-sized WebP and removes
// the heavy original. Keeps aspect ratio, caps the long edge at 1400 px.
//
//   npm run photos:optimize
//   npm run photos          # then relink src/data/photos.ts
import { readdir, readFile, unlink, writeFile } from "node:fs/promises";
import { join, parse } from "node:path";
import sharp from "sharp";

const DIR = join(process.cwd(), "public", "photos");
const MAX_EDGE = 1400;
const QUALITY = 76;
const SOURCE = /\.(jpe?g|png)$/i;

const files = (await readdir(DIR)).filter((file) => SOURCE.test(file));
let saved = 0;
let before = 0;
let after = 0;

for (const file of files) {
  const source = join(DIR, file);
  const { name } = parse(file);
  const target = join(DIR, `${name}.webp`);

  const input = await readFile(source);
  const image = sharp(input, { failOn: "error" });
  const meta = await image.metadata();
  const longEdge = Math.max(meta.width ?? 0, meta.height ?? 0);

  const pipeline = image.rotate();
  if (longEdge > MAX_EDGE) {
    pipeline.resize({
      width: (meta.width ?? 0) >= (meta.height ?? 0) ? MAX_EDGE : undefined,
      height: (meta.height ?? 0) > (meta.width ?? 0) ? MAX_EDGE : undefined,
      withoutEnlargement: true,
      fit: "inside",
    });
  }

  const output = await pipeline.webp({ quality: QUALITY, effort: 5 }).toBuffer();
  await writeFile(target, output);
  await unlink(source);

  before += input.length;
  after += output.length;
  saved += 1;
  console.log(
    `${name}: ${Math.round(input.length / 1024)} KB -> ${Math.round(output.length / 1024)} KB`
  );
}

console.log(
  `\n${saved} photos optimised · ${Math.round(before / 1024)} KB -> ${Math.round(
    after / 1024
  )} KB (${before ? Math.round((after / before) * 100) : 0}%)`
);
