"use client";

import { TopBar } from "./TopBar";
import { RecipeImage } from "./RecipeImage";
import { makeT, type Locale } from "@/i18n/dictionaries";
import { getRecipe } from "@/data";
import { PHOTOS } from "@/data/photos";
import { PHOTO_CREDITS } from "@/data/photoCredits";

/**
 * Attribution page required by the CC BY / CC BY-SA licences that cover the
 * Wikimedia Commons dish photographs, plus a clear statement that recipes
 * without a photo use the hand-drawn illustration.
 */
export function CreditsScreen({ locale }: { locale: Locale }) {
  const t = makeT(locale);
  const slugs = Object.keys(PHOTOS).sort((a, b) => a.localeCompare(b));

  return (
    <>
      <TopBar title={t("creditsTitle")} fallbackHref={`/${locale}/settings`} />
      <div className="page pt-4">
        <p className="rounded-2xl border border-line bg-card/85 p-3.5 text-[12.5px] font-medium leading-relaxed text-ink-soft">
          {t("creditsIntro")}
        </p>

        <p className="mt-3 rounded-2xl border border-line bg-sand/60 p-3.5 text-[12px] font-medium leading-relaxed text-ink-faint">
          {t("creditsIllustration")}
        </p>

        <p className="mt-4 text-[12px] font-bold uppercase tracking-wide text-ink-faint">
          {slugs.length} {t("creditsCount")}
        </p>

        <ul className="mt-2 divide-y divide-line/60 overflow-hidden rounded-xl border border-line bg-card/85">
          {slugs.map((slug) => {
            const credit = PHOTO_CREDITS[slug];
            const recipe = getRecipe(slug);
            const name = recipe ? recipe.name[locale] : slug;

            return (
              <li key={slug} className="flex items-start gap-3 px-3 py-2.5">
                <span className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-sand">
                  <RecipeImage slug={slug} art={recipe?.art ?? "tagine"} alt={name} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-bold leading-snug">{name}</span>
                  {credit ? (
                    <>
                      <span className="mt-0.5 block text-[11.5px] font-medium text-ink-soft">
                        {t("creditsPhotoBy")} {credit.author}
                      </span>
                      <span className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] font-semibold text-ink-faint">
                        {credit.licenseUrl ? (
                          <a
                            href={credit.licenseUrl}
                            target="_blank"
                            rel="noopener noreferrer license"
                            className="underline decoration-dotted underline-offset-2 hover:text-clay"
                          >
                            {credit.license}
                          </a>
                        ) : (
                          <span>{credit.license}</span>
                        )}
                        {credit.page ? (
                          <a
                            href={credit.page}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-dotted underline-offset-2 hover:text-clay"
                          >
                            {t("creditsOpen")}
                          </a>
                        ) : null}
                      </span>
                    </>
                  ) : null}
                </span>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-center text-[11px] font-medium text-ink-faint">{t("madeIn")}</p>
      </div>
    </>
  );
}
