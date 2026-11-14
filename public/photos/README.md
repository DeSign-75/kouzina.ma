# Dish photography

Drop real food photos in this folder. The app picks them up automatically and
falls back to the hand-drawn illustration for any recipe that has no photo.

## Rules

1. **File name = recipe slug.** For example `tajine-djaj-bel-limoun.jpg`.
   The full list of slugs is in `src/data/recipes-*.ts` (`slug:` field).
2. **Landscape, 16:10** (e.g. 1600 × 1000). Cards crop to 16:10, detail pages
   to 16:11, so keep the plate centred with breathing room.
3. **Any size**, landscape preferred (16:10). Cards crop to 16:10, detail pages
   to 16:11, so keep the plate centred with breathing room. `npm run photos:optimize`
   converts to WebP at max 1400 px, which is what actually ships.
4. **One look for the whole book:** same light direction, same table, no text,
   no hands, no logos, no heavy filters.

## After adding photos

```bash
npm run photos:optimize   # JPEG/PNG -> WebP, max edge 1400 px, originals removed
npm run photos            # rewrites src/data/photos.ts + photoCredits.ts
npm run build
```

`npm run photos:optimize` typically takes a 700 KB Commons JPEG down to
120–200 KB, which matters a lot on Moroccan mobile data.

## Rights

Only use photos you own or that are licensed for commercial use. Keep the
photographer/source credit next to the original file (a `CREDITS.md` here is
fine) so attribution can be added to the site later.
