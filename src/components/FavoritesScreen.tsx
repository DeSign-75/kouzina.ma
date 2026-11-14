"use client";

import { useState } from "react";
import { TopBar } from "./TopBar";
import { RecipeCard } from "./RecipeCard";
import { EmptyState } from "./ui";
import { makeT, type Locale } from "@/i18n/dictionaries";
import { getRecipe } from "@/data";
import { useStore } from "@/lib/store";

export function FavoritesScreen({ locale }: { locale: Locale }) {
  const t = makeT(locale);
  const store = useStore();
  const [tab, setTab] = useState<"favorites" | "seen">("favorites");

  const favorites = store.favorites.map(getRecipe).filter(Boolean);
  const seen = store.seen.map(getRecipe).filter(Boolean);
  const list = tab === "favorites" ? favorites : seen;

  return (
    <>
      <TopBar
        title={t("favoritesTitle")}
        fallbackHref={`/${locale}/settings`}
      />
      <div className="page pt-4">
        <div className="flex gap-2">
          <button
            type="button"
            className="chip"
            data-active={tab === "favorites"}
            onClick={() => setTab("favorites")}
          >
            {t("favoritesTitle")}
            <span className="rounded-full bg-black/10 px-1.5 text-[10.5px] tabular-nums">
              {favorites.length}
            </span>
          </button>
          <button
            type="button"
            className="chip"
            data-active={tab === "seen"}
            onClick={() => setTab("seen")}
          >
            {t("recentlyViewed")}
            <span className="rounded-full bg-black/10 px-1.5 text-[10.5px] tabular-nums">
              {seen.length}
            </span>
          </button>
        </div>

        {list.length === 0 ? (
          <EmptyState
            title={tab === "favorites" ? t("favoritesEmptyTitle") : t("recentlyViewed")}
            body={tab === "favorites" ? t("favoritesEmptyBody") : t("fridgeHint")}
            actionLabel={t("discoverRecipes")}
            actionHref={`/${locale}/recipes`}
            mood={tab === "favorites" ? "welcome" : "sleepy"}
          />
        ) : (
          <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
            {list.map((recipe) => (
              <RecipeCard key={recipe!.slug} recipe={recipe!} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
