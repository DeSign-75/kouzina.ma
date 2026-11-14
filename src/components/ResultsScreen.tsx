"use client";

import { useMemo, useState } from "react";
import { TopBar } from "./TopBar";
import { RecipeCard } from "./RecipeCard";
import { EmptyState } from "./ui";
import { makeT, type Locale } from "@/i18n/dictionaries";
import { CATEGORY_MAP, filterRecipes, recipesBySlot, sortRecipes } from "@/data";
import type { CategoryId, MealSlot } from "@/data/types";

interface Props {
  locale: Locale;
  slot: MealSlot;
  initial: { time?: number; cost?: number; servings?: number; cat?: string; sort?: string };
}

export function ResultsScreen({ locale, slot, initial }: Props) {
  const t = makeT(locale);
  const [maxTime, setMaxTime] = useState<number | undefined>(initial.time);
  const [maxCost, setMaxCost] = useState<number | undefined>(initial.cost);
  const [servings, setServings] = useState<number | undefined>(initial.servings);
  const [category, setCategory] = useState<CategoryId | undefined>(
    (initial.cat as CategoryId) || undefined
  );
  const [sort, setSort] = useState<"match" | "fast" | "cheap">(
    (initial.sort as "match" | "fast" | "cheap") || "match"
  );

  const pool = useMemo(() => recipesBySlot(slot), [slot]);
  const filtered = useMemo(
    () => sortRecipes(filterRecipes(pool, { maxTime, maxCost, servings, category }), sort),
    [pool, maxTime, maxCost, servings, category, sort]
  );

  const suggestions = useMemo(
    () => sortRecipes(filterRecipes(pool, {}), "fast").slice(0, 3),
    [pool]
  );

  const hasFilters = Boolean(maxTime || maxCost || servings || category);
  const catName = category ? CATEGORY_MAP[category]?.name[locale] : undefined;

  return (
    <>
      <TopBar
        title={`${t(slot)} · ${filtered.length} ${t("results")}`}
        fallbackHref={`/${locale}/meal/${slot}`}
      />
      <div className="page pt-4">
        <div className="no-scrollbar -mx-4 flex items-center gap-2 overflow-x-auto px-4">
          {maxTime && (
            <button type="button" className="chip" data-active="true" onClick={() => setMaxTime(undefined)}>
              ≤ {maxTime} {t("min")} <span aria-hidden>×</span>
            </button>
          )}
          {maxCost && (
            <button type="button" className="chip" data-active="true" onClick={() => setMaxCost(undefined)}>
              ≤ {maxCost} {t("mad")} <span aria-hidden>×</span>
            </button>
          )}
          {servings && (
            <button type="button" className="chip" data-active="true" onClick={() => setServings(undefined)}>
              {servings} {t("persons")} <span aria-hidden>×</span>
            </button>
          )}
          {catName && (
            <button type="button" className="chip" data-active="true" onClick={() => setCategory(undefined)}>
              {catName} <span aria-hidden>×</span>
            </button>
          )}
          <button
            type="button"
            className="chip"
            data-active={hasFilters ? "false" : "true"}
            onClick={() => {
              setMaxTime(undefined);
              setMaxCost(undefined);
              setServings(undefined);
              setCategory(undefined);
            }}
          >
            {t("clearFilters")}
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-[12.5px] font-semibold text-ink-soft">
            {filtered.length} {t("results")}
          </p>
          <label className="flex items-center gap-1.5 text-[12px] font-semibold text-ink-soft">
            {t("sortBy")}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "match" | "fast" | "cheap")}
              className="rounded-lg border border-line bg-card/85 px-2 py-1.5 text-[12px] font-semibold"
            >
              <option value="match">{t("sortMatch")}</option>
              <option value="fast">{t("sortFast")}</option>
              <option value="cheap">{t("sortCheap")}</option>
            </select>
          </label>
        </div>

        {filtered.length === 0 ? (
          <div>
            <EmptyState
              title={t("noResultsTitle")}
              body={t("noResultsBody")}
              actionLabel={t("relaxFilters")}
              actionHref={`/${locale}/meal/${slot}`}
            />
            <div className="mt-2 space-y-3">
              {suggestions.map((recipe) => (
                <RecipeCard key={recipe.slug} recipe={recipe} locale={locale} />
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-3 grid gap-3.5 sm:grid-cols-2">
            {filtered.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
