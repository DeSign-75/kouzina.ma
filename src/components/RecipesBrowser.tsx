"use client";

import { useMemo, useState } from "react";
import { TopBar } from "./TopBar";
import { RecipeCard } from "./RecipeCard";
import { EmptyState } from "./ui";
import { makeT, type Locale } from "@/i18n/dictionaries";
import { CATEGORIES, COLLECTIONS, RECIPES, byCollection, filterRecipes, sortRecipes } from "@/data";
import type { CategoryId, Tag } from "@/data/types";

const TAG_FILTERS: { tag: Tag; label: string }[] = [
  { tag: "quick", label: "quickFilter" },
  { tag: "budget", label: "budgetFilter" },
  { tag: "traditional", label: "traditionalFilter" },
  { tag: "tangier", label: "tangierTag" },
  { tag: "vegetarian", label: "vegTag" },
  { tag: "fish", label: "fishTag" },
  { tag: "friday", label: "fridayTag" },
  { tag: "ramadan", label: "ramadanTag" },
  { tag: "kid", label: "kidTag" },
  { tag: "guests", label: "guestsTag" },
];

export function RecipesBrowser({ locale }: { locale: Locale }) {
  const t = makeT(locale);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | undefined>();
  const [tag, setTag] = useState<Tag | undefined>();
  const [collection, setCollection] = useState<string | undefined>();
  const [sort, setSort] = useState<"match" | "fast" | "cheap">("match");

  const allCategories = category === undefined && tag === undefined && !query && !collection;

  const results = useMemo(() => {
    const base = collection ? byCollection(collection) : RECIPES;
    const filtered = filterRecipes(base, {
      query,
      category,
      tags: tag ? [tag] : undefined,
    });
    return sortRecipes(filtered, sort);
  }, [query, category, tag, collection, sort]);

  return (
    <>
      <TopBar title={t("navRecipes")} subtitle={`${RECIPES.length} ${t("results")}`} fallbackHref={`/${locale}`} />
      <div className="page pt-4">
        <label className="relative block">
          <span className="pointer-events-none absolute inset-y-0 start-3.5 grid place-items-center text-ink-faint">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("homeQuestion")}
            className="h-12 w-full rounded-xl border border-line bg-card/90 pe-4 ps-11 text-[14px] font-semibold outline-none transition-colors placeholder:font-medium placeholder:text-ink-faint focus:border-clay"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={t("clearFilters")}
              className="absolute inset-y-0 end-3 my-auto grid h-6 w-6 place-items-center rounded-full bg-sand text-ink-soft"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          )}
        </label>

        <div className="no-scrollbar -mx-4 mt-4 flex items-center gap-2 overflow-x-auto px-4">
          <button
            type="button"
            className="chip"
            data-active={allCategories}
            onClick={() => {
              setCategory(undefined);
              setTag(undefined);
              setCollection(undefined);
            }}
          >
            {t("all")}
          </button>
          {COLLECTIONS.map((entry) => (
            <button
              key={entry.slug}
              type="button"
              className="chip"
              data-active={collection === entry.slug}
              onClick={() => {
                setCollection(collection === entry.slug ? undefined : entry.slug);
                setCategory(undefined);
                setTag(undefined);
              }}
            >
              {entry.name[locale]}
            </button>
          ))}
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className="chip"
              data-active={category === cat.id}
              onClick={() => setCategory(category === cat.id ? undefined : cat.id)}
            >
              {cat.name[locale]}
            </button>
          ))}
        </div>

        <div className="no-scrollbar -mx-4 mt-2 flex gap-2 overflow-x-auto px-4">
          {TAG_FILTERS.map((entry) => (
            <button
              key={entry.tag}
              type="button"
              className="chip"
              data-active={tag === entry.tag}
              onClick={() => setTag(tag === entry.tag ? undefined : entry.tag)}
            >
              {t(entry.label)}
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-[12.5px] font-semibold text-ink-soft">
            {results.length} {t("results")}
          </p>
          <label className="flex items-center gap-1.5 text-[12px] font-semibold text-ink-soft">
            {t("sortBy")}
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as "match" | "fast" | "cheap")}
              className="rounded-lg border border-line bg-card/85 px-2 py-1.5 text-[12px] font-semibold"
            >
              <option value="match">{t("sortMatch")}</option>
              <option value="fast">{t("sortFast")}</option>
              <option value="cheap">{t("sortCheap")}</option>
            </select>
          </label>
        </div>

        {results.length === 0 ? (
          <EmptyState
            title={t("noResultsTitle")}
            body={t("noResultsBody")}
            actionLabel={t("clearFilters")}
            actionHref={`/${locale}/recipes`}
          />
        ) : (
          <div className="mt-3 grid gap-3.5 sm:grid-cols-2">
            {results.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
