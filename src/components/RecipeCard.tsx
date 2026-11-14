import Link from "next/link";
import { RecipeImage } from "./RecipeImage";
import type { Locale } from "@/i18n/dictionaries";
import { makeT } from "@/i18n/dictionaries";
import type { Recipe } from "@/data/types";
import { totalTime } from "@/data/types";
import { ingredientLabel } from "@/data";
import { FavoriteButton } from "./FavoriteButton";

export function RecipeCard({
  recipe,
  locale,
  missing = [],
  variant = "large",
}: {
  recipe: Recipe;
  locale: Locale;
  missing?: string[];
  variant?: "large" | "compact";
}) {
  const t = makeT(locale);
  const href = `/${locale}/recipe/${recipe.slug}`;

  if (variant === "compact") {
    return (
      <Link
        href={href}
        className="flex items-center gap-3 rounded-xl border border-line bg-card/85 p-2 transition-colors hover:bg-card"
      >
        <span className="h-14 w-14 shrink-0 overflow-hidden rounded-lg">
          <RecipeImage slug={recipe.slug} art={recipe.art} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-bold">{recipe.name[locale]}</span>
          <span className="mt-0.5 flex items-center gap-1.5 text-[11.5px] font-semibold text-ink-faint">
            <span>
              {totalTime(recipe)} {t("min")}
            </span>
            <span aria-hidden>·</span>
            <span>
              {recipe.cost} {t("mad")}
            </span>
            <span aria-hidden>·</span>
            <span>
              {recipe.servings} {t("persons")}
            </span>
          </span>
        </span>
      </Link>
    );
  }

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-line bg-card shadow-[var(--shadow-e1)] transition-all hover:shadow-[var(--shadow-e2)] active:scale-[0.995]">
      <Link href={href} className="block">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
            <RecipeImage slug={recipe.slug} art={recipe.art} />
          </div>
          <div className="absolute start-3 top-3 flex flex-wrap gap-1.5">
            {recipe.tags.includes("tangier") && (
              <span className="rounded-full bg-card/90 px-2 py-0.5 text-[10.5px] font-bold text-clay backdrop-blur">
                {t("tangierTag")}
              </span>
            )}
            {recipe.tags.includes("quick") && (
              <span className="rounded-full bg-mint px-2 py-0.5 text-[10.5px] font-bold text-cream">
                {t("quickTag")}
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="absolute end-2.5 top-2.5">
        <FavoriteButton
          slug={recipe.slug}
          label={t("favorite")}
          savedLabel={t("saved")}
          removedLabel={t("removed")}
        />
      </div>

      <div className="p-3.5">
        <Link href={href}>
          <h3 className="line-clamp-2 text-[16.5px] font-bold leading-snug">
            {recipe.name[locale]}
          </h3>
          <p className="mt-1 line-clamp-1 text-[12.5px] text-ink-soft">
            {recipe.description[locale]}
          </p>
        </Link>
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
          <span className="pill">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="8.5" />
              <path d="M12 7.5V12l3 2" strokeLinecap="round" />
            </svg>
            {totalTime(recipe)} {t("min")}
          </span>
          <span className="pill pill-mint">
            {recipe.cost} {t("mad")}
          </span>
          <span className="pill">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="9" cy="8" r="3" />
              <path d="M3 19c.8-3 3-4.4 6-4.4s5.2 1.4 6 4.4M16 7.2a3 3 0 0 1 0 5.6M18.5 19c-.4-2-1.4-3.3-3-3.9" />
            </svg>
            {recipe.servings}
          </span>
        </div>

        {missing.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center gap-1">
            <span className="text-[11px] font-bold text-clay">{t("missing")}:</span>
            {missing.slice(0, 3).map((id) => (
              <span key={id} className="rounded-full bg-clay-tint px-2 py-0.5 text-[10.5px] font-semibold text-clay-deep">
                {ingredientLabel(id, locale)}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
