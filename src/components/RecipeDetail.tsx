"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { TopBar } from "./TopBar";
import { RecipeImage } from "./RecipeImage";
import { FavoriteButton } from "./FavoriteButton";
import { RecipeCard } from "./RecipeCard";
import { makeT, type Locale } from "@/i18n/dictionaries";
import { RECIPES, getRecipe } from "@/data";
import { ingredientName } from "@/data/ingredients";
import type { Recipe } from "@/data/types";
import { formatQty, totalTime } from "@/data/types";
import { useStore } from "@/lib/store";
import { dateKey } from "@/lib/date";

export function RecipeDetail({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string;
}) {
  const t = makeT(locale);
  const recipe = getRecipe(slug);
  const store = useStore();
  const [servings, setServings] = useState(recipe?.servings ?? 4);
  const [servingsTouched, setServingsTouched] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  // A household of 6 should not have to tap "+" twice on every recipe.
  useEffect(() => {
    if (!store.hydrated || servingsTouched) return;
    setServings(Math.max(1, Math.min(24, store.household)));
  }, [store.hydrated, store.household, servingsTouched]);

  useEffect(() => {
    store.markSeen(slug);
  }, [slug, store]);

  const similar = useMemo(() => {
    if (!recipe) return [];
    return RECIPES.filter(
      (r) =>
        r.slug !== recipe.slug &&
        (r.category === recipe.category ||
          r.tags.some((tag) => recipe.tags.includes(tag)))
    ).slice(0, 4);
  }, [recipe]);

  if (!recipe) {
    return (
      <>
        <TopBar title={t("notFoundTitle")} fallbackHref={`/${locale}`} />
        <div className="page pt-10 text-center">
          <p className="text-[14px] text-ink-soft">{t("notFoundBody")}</p>
          <Link href={`/${locale}/recipes`} className="btn btn-primary btn-sm mt-4">
            {t("discoverRecipes")}
          </Link>
        </div>
      </>
    );
  }

  const scale = servings / recipe.servings;
  const total = totalTime(recipe);
  const difficultyKey = recipe.difficulty === 1 ? "easy" : recipe.difficulty === 2 ? "medium" : "hard";
  const scaledCost = Math.round(recipe.cost * scale);

  return (
    <>
      <TopBar
        title={recipe.name[locale]}
        fallbackHref={`/${locale}/meal/${recipe.slots[0]}`}
        right={
          <FavoriteButton
            slug={recipe.slug}
            label={t("favorite")}
            variant="plain"
            savedLabel={t("saved")}
            removedLabel={t("removed")}
          />
        }
      />

      <div className="page pt-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative -mx-4 aspect-[16/11] overflow-hidden sm:mx-0 sm:mt-4 sm:rounded-2xl"
        >
          <RecipeImage
            slug={recipe.slug}
            art={recipe.art}
            alt={recipe.name[locale]}
            eager
          />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-cream to-transparent sm:hidden" />
        </motion.div>

        <div className="relative -mt-3 sm:mt-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {recipe.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="pill pill-clay">
                {t(`${tag}Tag`)}
              </span>
            ))}
          </div>
          <h1 className="mt-2 text-[26px] leading-tight">{recipe.name[locale]}</h1>
          <p className="mt-1.5 text-[14px] leading-relaxed text-ink-soft">
            {recipe.description[locale]}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          <Stat label={t("totalTime")} value={`${total}`} unit={t("min")} />
          <Stat label={t("cost")} value={`${scaledCost}`} unit={t("mad")} />
          <Stat label={t("persons")} value={`${servings}`} unit="" />
          <Stat label={t("difficulty")} value={t(difficultyKey)} unit="" />
        </div>

        <p className="mt-2 text-[11px] font-medium text-ink-faint">
          {servings !== recipe.servings
            ? `${t("scaledForHousehold")} ${servings} ${t("persons")} · ${t("estimatedCost")}`
            : t("estimatedCost")}
        </p>

        <div className="mt-5 flex gap-2">
          <Link href={`/${locale}/recipe/${recipe.slug}/cook`} className="btn btn-primary flex-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            {t("startCooking")}
          </Link>
          <button
            type="button"
            aria-label={t("addToPlan")}
            className="grid h-[52px] w-[52px] place-items-center rounded-xl border border-line bg-card/90 text-ink-soft"
            onClick={() => {
              store.setPlanSlot(dateKey(new Date()), recipe.slots[0], recipe.slug);
              store.toast(t("addedToPlan"));
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
              <rect x="3.5" y="5" width="17" height="15" rx="3" />
              <path d="M8 3v4M16 3v4M3.5 10h17M12 13v4M10 15h4" />
            </svg>
          </button>
          <button
            type="button"
            aria-label={t("addToShopping")}
            className="grid h-[52px] w-[52px] place-items-center rounded-xl border border-line bg-card/90 text-ink-soft"
            onClick={() => {
              store.addRecipeToShopping(recipe.slug, scale);
              store.toast(t("addToShoppingDone"), t("goShopping"), () => {
                window.location.href = `/${locale}/shopping`;
              });
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
              <path d="M4 5h2l2.2 10.5a2 2 0 0 0 2 1.5h7.4a2 2 0 0 0 2-1.6L21 8H7" />
              <circle cx="10" cy="20" r="1.2" fill="currentColor" />
              <circle cx="18" cy="20" r="1.2" fill="currentColor" />
            </svg>
          </button>
        </div>

        <section className="mt-7">
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] font-bold">{t("ingredients")}</h2>
            <div className="flex items-center gap-1 rounded-full border border-line bg-card/90 p-0.5">
              <button
                type="button"
                onClick={() => {
                  setServingsTouched(true);
                  setServings(Math.max(1, servings - 1));
                }}
                className="grid h-8 w-8 place-items-center rounded-full text-ink-soft hover:bg-sand"
                aria-label="-"
              >
                −
              </button>
              <span className="min-w-6 text-center text-[13px] font-bold tabular-nums">{servings}</span>
              <button
                type="button"
                onClick={() => {
                  setServingsTouched(true);
                  setServings(Math.min(24, servings + 1));
                }}
                className="grid h-8 w-8 place-items-center rounded-full text-ink-soft hover:bg-sand"
                aria-label="+"
              >
                +
              </button>
            </div>
          </div>

          <ul className="mt-3 divide-y divide-line/70 overflow-hidden rounded-xl border border-line bg-card/85">
            {recipe.ingredients.map((item) => {
              const isChecked = checked[item.id];
              return (
                <li key={`${item.id}-${item.unit}`}>
                  <button
                    type="button"
                    onClick={() =>
                      setChecked((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                    }
                    className="flex w-full items-center gap-3 px-3.5 py-2.5 text-start"
                  >
                    <span
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors ${
                        isChecked
                          ? "border-clay bg-clay text-white"
                          : "border-line bg-card text-transparent"
                      }`}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m5 12 5 5L20 7" />
                      </svg>
                    </span>
                    <span
                      className={`flex-1 text-[14px] font-semibold ${
                        isChecked ? "text-ink-faint line-through" : "text-ink"
                      }`}
                    >
                      {ingredientName(item.id, locale)}
                      {item.optional && (
                        <span className="ms-1.5 text-[11px] font-medium text-ink-faint">
                          ({t("optional")})
                        </span>
                      )}
                    </span>
                    <span className="shrink-0 text-[12.5px] font-semibold tabular-nums text-ink-soft">
                      {formatQty(item.qty * scale, item.unit, locale)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {recipe.equipment.length > 0 && (
          <section className="mt-6">
            <h2 className="text-[17px] font-bold">{t("equipment")}</h2>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {recipe.equipment.map((entry) => (
                <span key={entry[locale]} className="pill">
                  {entry[locale]}
                </span>
              ))}
            </div>
          </section>
        )}

        <section className="mt-6">
          <h2 className="text-[17px] font-bold">{t("steps")}</h2>
          <ol className="mt-3 space-y-3">
            {recipe.steps.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-clay-tint text-[12px] font-bold text-clay-deep">
                  {index + 1}
                </span>
                <p className="pt-0.5 text-[13.5px] leading-relaxed text-ink-soft">
                  {step[locale]}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {recipe.tips.length > 0 && (
          <section className="mt-6">
            <h2 className="text-[17px] font-bold">{t("tips")}</h2>
            <div className="mt-2 space-y-2">
              {recipe.tips.map((tip, index) => (
                <div
                  key={index}
                  className="flex gap-2.5 rounded-xl border border-saffron/30 bg-saffron-tint/70 p-3"
                >
                  <span className="text-[15px] leading-none">💡</span>
                  <p className="text-[13px] font-medium leading-relaxed text-saffron-deep">
                    {tip[locale]}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {similar.length > 0 && (
          <section className="mt-8">
            <h2 className="text-[17px] font-bold">{t("similar")}</h2>
            <div className="mt-2 grid gap-2">
              {similar.map((entry) => (
                <RecipeCard key={entry.slug} recipe={entry} locale={locale} variant="compact" />
              ))}
            </div>
          </section>
        )}

        <p className="mt-8 text-center text-[11px] font-medium text-ink-faint">
          {t("madeIn")}
        </p>
      </div>
    </>
  );
}

function Stat({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="rounded-xl border border-line bg-card/85 px-2 py-2.5 text-center">
      <p className="text-[10px] font-bold uppercase tracking-wide text-ink-faint">{label}</p>
      <p className="mt-0.5 text-[15px] font-bold tabular-nums leading-none">
        {value}
        {unit && <span className="ms-0.5 text-[10.5px] font-semibold text-ink-soft">{unit}</span>}
      </p>
    </div>
  );
}

export type { Recipe };
