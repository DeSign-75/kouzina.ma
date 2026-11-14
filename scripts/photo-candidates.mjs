// Prints Commons candidates (licence + size ok) for a list of queries so a
// human can pick the right file into PICKS in scripts/fetch-photos.mjs.
//
//   node scripts/photo-candidates.mjs "taktouka" "moroccan tomato salad"
const API = "https://commons.wikimedia.org/w/api.php";
const UA = "KouzinaRecipeSite/0.1 (local development; photo sourcing)";

const licenceOk = (value = "") =>
  /^CC0/i.test(value) ||
  /^Public domain/i.test(value) ||
  /^CC BY(-SA)?( \d)/i.test(value);

const strip = (value = "") =>
  value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

const queries = process.argv.slice(2);

for (const query of queries) {
  console.log(`\n### ${query}`);
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: `filetype:bitmap ${query}`,
    gsrnamespace: "6",
    gsrlimit: "20",
    prop: "imageinfo",
    iiprop: "url|size|mime|extmetadata",
    iiurlwidth: "1600",
    format: "json",
  });

  try {
    let response;
    for (let attempt = 1; attempt <= 4; attempt++) {
      response = await fetch(`${API}?${params}`, { headers: { "User-Agent": UA } });
      if (response.ok) break;
      if (response.status !== 429) break;
      await new Promise((resolve) => setTimeout(resolve, 6000 * attempt));
    }
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const pages = Object.values(data?.query?.pages ?? {});
    let shown = 0;
    for (const page of pages) {
      const info = page.imageinfo?.[0] ?? {};
      const meta = info.extmetadata ?? {};
      const licence = meta.LicenseShortName?.value ?? "";
      if (!licenceOk(licence)) continue;
      if ((info.width ?? 0) < 1200 || (info.height ?? 0) < 700) continue;
      if (info.mime !== "image/jpeg") continue;
      shown += 1;
      console.log(
        `  ${page.title} | ${info.width}x${info.height} | ${licence} | ${strip(
          meta.Artist?.value ?? ""
        ).slice(0, 40)}`
      );
    }
    if (!shown) console.log("  (nothing usable)");
  } catch (error) {
    console.log(`  ERR ${error.message}`);
  }
  await new Promise((resolve) => setTimeout(resolve, 1200));
}
