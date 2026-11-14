// Downloads commercial-friendly dish photos from Wikimedia Commons.
//
//   node scripts/fetch-photos.mjs            # all recipes with a query
//   node scripts/fetch-photos.mjs harira     # one or more slugs
//
// Only CC0, public domain, CC BY and CC BY-SA files are accepted.
// Each chosen file is written to public/photos/<slug>.jpg together with
// src/data/photoCredits.ts so attribution can be shown on the site.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const API = "https://commons.wikimedia.org/w/api.php";
const UA = "KouzinaRecipeSite/0.1 (local development; photo sourcing)";
const WIDTH = 1600;

/** Hand-picked Commons files where automatic search picks the wrong dish. */
const PICKS = {
  chebakia: "File:Chebakia.jpg",
  loubia: "File:Loubia.jpg",
  "couscous-seb3a-khdra": "File:Couscous \"7 vegetables\".jpg",
  "pastilla-bel-hout": "File:Pastilla Seafood.jpg",
  ghriba: "File:Ghoriba ghraïba Moroccan cookie.jpg",
  "krevettes-bel-toum": "File:Gambas Al Ajillo (Spanish Garlic Shrimp).jpg",
  "makarona-bel-tmatem": "File:Tomato macaroni.jpg",
  "mar9a-bida-bel-hmoss": "File:Moroccan Chickpea and Vegetable Stew (6750034613).jpg",
  "riz-bel-djaj-box": "File:دجاج بلأرز.jpg",
  fekkas: "File:Fekkass الفقاص.jpg",
};
const QUERIES = {
  "msemen-bel-asal": ["msemen", "meloui moroccan pancake"],
  "harcha-bel-jben": ["harcha", "moroccan semolina bread"],
  baghrir: ["baghrir", "beghrir"],
  sfenj: ["sfenj", "sfenj morocco"],
  "bid-bel-tmatem": ["shakshuka", "eggs tomato Moroccan"],
  "atay-bel-na3na3": ["moroccan mint tea", "atay"],  loubia: ["loubia moroccan", "white beans tomato"],
  bissara: ["bissara", "fava bean soup"],
  harira: ["harira"],
  ades: ["lentil soup", "chorba lentils"],
  mchouia: ["eggplant salad moroccan", "zaalouk"],
  zaalouk: ["zaalouk", "eggplant salad moroccan"],
  taktouka: ["taktouka", "moroccan tomato pepper salad"],
  "batata-mchermla": ["batata mchermel", "moroccan potatoes"],
  "sandwich-tona": ["tuna sandwich", "sandwich thon"],
  "msemen-bel-jben-box": ["msemen"],
  "riz-bel-djaj-box": ["chicken rice"],
  "salade-batata-box": ["potato salad"],
  "cake-bel-yaourt": ["yogurt cake", "gâteau au yaourt"],
  ghriba: ["ghriba", "moroccan cookies"],
  fekkas: ["fekkas", "moroccan biscuits"],
  chebakia: ["chebakia", "chebakia ramadan"],
  "djaj-mhamer": ["roast chicken moroccan", "poulet rôti"],
  "smak-meqli": ["fried fish moroccan", "fried whiting"],
  "dorada-fel-for": ["grilled whole fish", "dorade grillée"],
  "pastilla-bel-hout": ["pastilla", "seafood pastilla"],
  "makarona-bel-tmatem": ["pasta tomato sauce", "macaroni tomato"],
  "riz-bel-khodra": ["vegetable rice", "riz aux légumes"],
  chakchouka: ["chakchouka", "shakshuka"],
  "omelette-bel-jben": ["cheese omelette", "omelette"],
  "kebda-mchermla": ["beef liver dish", "foie sauté"],
  "krevettes-bel-toum": ["shrimp garlic", "crevettes ail"],
  "batbout-bel-kefta": ["batbout", "moroccan sandwich kefta"],
  "tajine-kefta-bel-bid": ["kefta tagine", "tajine kefta"],
  "tajine-djaj-bel-limoun": ["chicken tagine", "tajine poulet citron"],
  "tajine-sardine-chermoula": ["sardine tagine", "tajine sardines"],
  "sardine-mchermla": ["sardines chermoula", "moroccan sardines"],
  "couscous-bel-khodra": ["couscous vegetables", "couscous légumes"],
  "couscous-bel-djaj": ["couscous chicken", "couscous poulet"],
  rfissa: ["rfissa", "trid"],
  "couscous-tfaya": ["couscous tfaya", "couscous onions raisins"],
  "tajine-lahm-bel-barkok": ["lamb tagine prunes", "tajine pruneaux"],
  "couscous-seb3a-khdra": ["couscous seven vegetables", "couscous légumes"],
  "mar9a-bida-bel-hmoss": ["chicken chickpea stew", "chickpea stew"],
  "tajine-jelbana-bel-lahm": ["peas tagine", "lamb peas"],
  "batata-bel-zeitoun": ["potatoes olives", "moroccan potatoes"],
  "poulet-panee-box": ["breaded chicken", "chicken nuggets"],
  "briouat-bel-loz": ["briouat", "almond briouats"],
};

const BAD_TITLE =
  /logo|map|diagram|chart|menu|poster|stamp|coin|banknote|portrait|people|market stall|beach|souk|restaurant|harvest|batter|raw |street|shop|supermarket|package|label|farm|plantation|building|entrance|interior/i;

/** A photo is only kept when its file name actually names the dish. */
const MATCH = {
  "msemen-bel-asal": /msemen|msemmen|meloui|rghaif|rghaïf/i,
  "harcha-bel-jben": /harcha|harsha|semolina/i,
  baghrir: /baghrir|beghrir|beghrir|thousand.?hole/i,
  sfenj: /sfenj|sfenj|beignet/i,
  "bid-bel-tmatem": /shakshuka|chakchouka|ojja|oeufs?.*tomate|eggs?.*tomato/i,
  "atay-bel-na3na3": /mint tea|atay|thé à la menthe/i,
  loubia: /loubia|white beans|haricots blancs/i,
  bissara: /bissara|bessara|fava|fève/i,
  harira: /harira/i,
  ades: /lentil|adas|chorba/i,
  mchouia: /eggplant|aubergine|zaalouk|mchouia/i,
  zaalouk: /zaalouk|eggplant|aubergine/i,
  taktouka: /taktouka|taktouka|pepper.*salad|salade.*poivron/i,
  "batata-mchermla": /batata|potato|pommes de terre/i,
  "sandwich-tona": /sandwich|thon|tuna/i,
  "msemen-bel-jben-box": /msemen|msemmen|meloui|rghaif|rghaïf/i,
  "riz-bel-djaj-box": /chicken rice|riz.*poulet|pilaf|دجاج/i,
  "salade-batata-box": /potato salad|salade de pommes/i,
  "cake-bel-yaourt": /yogurt cake|gâteau au yaourt|yaourt/i,
  ghriba: /ghriba|ghoriba|ghrieba/i,
  fekkas: /fekkas|feqqas|fequas/i,
  chebakia: /chebakia|chebekia|chebakiya/i,
  "djaj-mhamer": /roast chicken|poulet rôti|poulet rôti|chicken/i,
  "smak-meqli": /fried fish|poisson frit|friture/i,
  "dorada-fel-for": /grilled.*fish|dorade|sea bream|poisson grillé/i,
  "pastilla-bel-hout": /pastilla|bastilla|seafood|poisson/i,
  "makarona-bel-tmatem": /pasta|macaroni|penne|coquillette/i,
  "riz-bel-khodra": /vegetable rice|riz aux légumes|riz/i,
  chakchouka: /shakshuka|chakchouka|ojja/i,
  "omelette-bel-jben": /omelette/i,
  "kebda-mchermla": /liver|foie/i,
  "krevettes-bel-toum": /shrimp|crevette|gamba|prawn/i,
  "batbout-bel-kefta": /batbout|kefta|sandwich/i,
  "tajine-kefta-bel-bid": /kefta|meatball|tajine|tagine/i,
  "tajine-djaj-bel-limoun": /tagine|tajine/i,
  "tajine-sardine-chermoula": /sardine|tajine|tagine/i,
  "sardine-mchermla": /sardine/i,
  "couscous-bel-khodra": /couscous/i,
  "couscous-bel-djaj": /couscous/i,
  rfissa: /rfissa|trid/i,
  "couscous-tfaya": /couscous/i,
  "tajine-lahm-bel-barkok": /tagine|tajine|prune/i,
  "couscous-seb3a-khdra": /couscous/i,
  "mar9a-bida-bel-hmoss": /chickpea|pois chiches|stew|marqa/i,
  "tajine-jelbana-bel-lahm": /peas|petits pois|tajine|tagine/i,
  "batata-bel-zeitoun": /potato|pommes de terre/i,
  "poulet-panee-box": /breaded|pané|nuggets/i,
  "briouat-bel-loz": /briouat|briouate|almond|amande/i,
};

function licenceOk(value = "") {
  if (/^CC0/i.test(value)) return true;
  if (/^Public domain/i.test(value)) return true;
  if (/^CC BY(-SA)?( \d)/i.test(value)) return true;
  return false;
}

function stripHtml(value = "") {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

async function retry(task, attempts = 5) {
  let last;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await task();
    } catch (error) {
      last = error;
      if (attempt < attempts) {
        const limit = /429/.test(String(error.message)) ? 7000 : 500 * attempt;
        await new Promise((resolve) => setTimeout(resolve, limit));
      }
    }
  }
  throw last;
}

async function search(query) {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: `filetype:bitmap ${query}`,
    gsrnamespace: "6",
    gsrlimit: "12",
    prop: "imageinfo",
    iiprop: "url|size|mime|extmetadata",
    iiurlwidth: String(WIDTH),
    format: "json",
  });

  return retry(async () => {
    const response = await fetch(`${API}?${params}`, { headers: { "User-Agent": UA } });
    if (!response.ok) throw new Error(`Commons HTTP ${response.status}`);
    const data = await response.json();
    const pages = data?.query?.pages ?? {};
    return Object.values(pages).map((page) => {
      const info = page.imageinfo?.[0] ?? {};
      const meta = info.extmetadata ?? {};
      return {
        title: page.title,
        description: stripHtml(meta.ImageDescription?.value ?? ""),
        author: stripHtml(meta.Artist?.value ?? ""),
        license: meta.LicenseShortName?.value ?? "",
        licenseUrl: meta.LicenseUrl?.value ?? "",
        page: info.descriptionurl ?? "",
        thumb: info.thumburl ?? info.url ?? "",
        mime: info.mime ?? "",
        width: info.width ?? 0,
        height: info.height ?? 0,
      };
    });
  });
}

async function fetchFile(title) {
  const params = new URLSearchParams({
    action: "query",
    titles: title,
    prop: "imageinfo",
    iiprop: "url|size|mime|extmetadata",
    iiurlwidth: String(WIDTH),
    format: "json",
  });

  return retry(async () => {
    const response = await fetch(`${API}?${params}`, { headers: { "User-Agent": UA } });
    if (!response.ok) throw new Error(`Commons HTTP ${response.status}`);
    const data = await response.json();
    const pages = data?.query?.pages ?? {};
    return Object.values(pages).map((page) => {
      const info = page.imageinfo?.[0] ?? {};
      const meta = info.extmetadata ?? {};
      return {
        title: page.title,
        description: stripHtml(meta.ImageDescription?.value ?? ""),
        author: stripHtml(meta.Artist?.value ?? ""),
        license: meta.LicenseShortName?.value ?? "",
        licenseUrl: meta.LicenseUrl?.value ?? "",
        page: info.descriptionurl ?? "",
        thumb: info.thumburl ?? info.url ?? "",
        mime: info.mime ?? "",
        width: info.width ?? 0,
        height: info.height ?? 0,
      };
    });
  });
}

function acceptable(candidate, slug, allowPortrait = false) {
  if (!candidate.thumb || candidate.mime !== "image/jpeg") return false;
  if (candidate.width < 1200 || candidate.height < 700) return false;
  if (!allowPortrait && candidate.width / candidate.height < 1) return false;
  if (!licenceOk(candidate.license)) return false;
  if (BAD_TITLE.test(candidate.title)) return false;
  const match = MATCH[slug];
  if (!match || !match.test(candidate.title)) return false;
  return true;
}

async function download(url, path) {
  return retry(async () => {
    const response = await fetch(url, { headers: { "User-Agent": UA } });
    if (!response.ok) throw new Error(`download HTTP ${response.status}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length < 40_000) throw new Error(`file too small (${buffer.length} bytes)`);
    await writeFile(path, buffer);
    return buffer.length;
  });
}

const slugs = process.argv.slice(2);
const entries = slugs.length ? slugs.map((s) => [s, QUERIES[s]]) : Object.entries(QUERIES);

const PHOTO_DIR = join(process.cwd(), "public", "photos");
await mkdir(PHOTO_DIR, { recursive: true });

const chosen = [];
const failures = [];

for (const [slug, queries] of entries) {
  if (!queries) {
    failures.push({ slug, reason: "no query defined" });
    continue;
  }

  let picked = null;

  if (PICKS[slug]) {
    try {
      const pages = await fetchFile(PICKS[slug]);
      picked = pages.find((candidate) => acceptable(candidate, slug, true)) ?? null;
    } catch (error) {
      failures.push({ slug, reason: `pick: ${error.message}` });
    }
  }

  if (!picked) {
    for (const query of queries) {
    let results = [];
    try {
      results = await search(query);
    } catch (error) {
      failures.push({ slug, reason: `${query}: ${error.message}` });
      continue;
    }
    picked = results.find((candidate) => acceptable(candidate, slug)) ?? null;
    if (picked) {
      picked.query = query;
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 1200));
    }
  }

  if (!picked) {
    failures.push({ slug, reason: "no acceptable image" });
    continue;
  }

  try {
    const bytes = await download(picked.thumb, join(PHOTO_DIR, `${slug}.jpg`));
    chosen.push({ slug, ...picked, bytes });
    console.log(`ok   ${slug} <- ${picked.title} [${picked.license}]`);
  } catch (error) {
    failures.push({ slug, reason: error.message });
    console.log(`fail ${slug}: ${error.message}`);
  }
}

// Merge with whatever is already credited (other runs may have added photos).
let previous = {};
try {
  previous = JSON.parse(await readFile(join(process.cwd(), "scripts", "photo-credits.json"), "utf8"));
} catch {
  previous = {};
}

const credits = { ...previous };
for (const entry of chosen) {
  credits[entry.slug] = {
    title: entry.title,
    author: entry.author || "Unknown",
    license: entry.license,
    licenseUrl: entry.licenseUrl,
    page: entry.page,
  };
}

const sorted = Object.fromEntries(
  Object.entries(credits).sort(([a], [b]) => a.localeCompare(b))
);

await writeFile(
  join(process.cwd(), "scripts", "photo-credits.json"),
  JSON.stringify(sorted, null, 2),
  "utf8"
);

const lines = sorted
  ? Object.entries(sorted)
      .map(
        ([slug, c]) =>
          `  ${JSON.stringify(slug)}: { title: ${JSON.stringify(c.title)}, author: ${JSON.stringify(
            c.author
          )}, license: ${JSON.stringify(c.license)}, licenseUrl: ${JSON.stringify(
            c.licenseUrl
          )}, page: ${JSON.stringify(c.page)} },`
      )
      .join("\n")
  : "";

await writeFile(
  join(process.cwd(), "src", "data", "photoCredits.ts"),
  `// Generated by \`node scripts/fetch-photos.mjs\` — source and licence for each dish photo.
export interface PhotoCredit {
  title: string;
  author: string;
  license: string;
  licenseUrl: string;
  page: string;
}

export const PHOTO_CREDITS: Record<string, PhotoCredit> = {
${lines}
};
`,
  "utf8"
);

console.log(`\ndownloaded ${chosen.length}, skipped ${failures.length}`);
if (failures.length) {
  console.log("skipped:", failures.map((f) => `${f.slug} (${f.reason})`).join("\n         "));
}
