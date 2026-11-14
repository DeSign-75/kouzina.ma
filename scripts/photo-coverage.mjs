import { readFileSync, readdirSync } from "node:fs";

const photos = readFileSync("src/data/photos.ts", "utf8");
const have = new Set([...photos.matchAll(/"([a-z0-9-]+)":/g)].map((m) => m[1]));

const all = [];
for (const file of readdirSync("src/data").filter((f) => f.startsWith("recipes-") && f.endsWith(".ts"))) {
  const text = readFileSync(`src/data/${file}`, "utf8");
  for (const m of text.matchAll(/slug: "([a-z0-9-]+)"/g)) all.push(m[1]);
}

const missing = all.filter((slug) => !have.has(slug));
console.log(`total ${all.length} · photos ${have.size} · missing ${missing.length}`);
console.log(missing.join("\n"));
