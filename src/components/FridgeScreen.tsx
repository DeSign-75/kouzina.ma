"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { TopBar } from "./TopBar";
import { RecipeCard } from "./RecipeCard";
import { EmptyState } from "./ui";
import { makeT, type Locale } from "@/i18n/dictionaries";
import { INGREDIENTS, STAPLES } from "@/data/ingredients";
import { matchRecipes } from "@/data";
import type { IngredientCategory } from "@/data/types";

const FRIDGE_KEY = "kouzina:fridge";

const GROUPS: { id: IngredientCategory; label: string }[] = [
  { id: "veg", label: "catVegetables" },
  { id: "protein", label: "catProtein" },
  { id: "dairy", label: "catDairy" },
  { id: "pantry", label: "catPantry" },
  { id: "spice", label: "catSpices" },
];

export function FridgeScreen({ locale }: { locale: Locale }) {
  const t = makeT(locale);
  const [selected, setSelected] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(FRIDGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) setSelected(parsed.filter((id) => typeof id === "string"));
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(FRIDGE_KEY, JSON.stringify(selected));
    } catch {
      /* ignore */
    }
  }, [selected, ready]);

  const results = useMemo(() => {
    if (selected.length < 2) return [];
    return matchRecipes(selected).slice(0, 12);
  }, [selected]);

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((entry) => entry !== id) : [...prev, id]
    );

  return (
    <>
      <TopBar title={t("fridgeTitle")} subtitle={t("fridgeHint")} fallbackHref={`/${locale}`} />
      <div className="page pt-4">
        <div className="sticky top-14 z-20 -mx-4 bg-cream/95 px-4 py-2 backdrop-blur">
          <div className="flex items-center justify-between rounded-xl border border-line bg-card/90 px-3 py-2">
            <p className="text-[12.5px] font-bold text-ink">
              {selected.length > 0
                ? `${selected.length} ${t("selectedIngredients")}`
                : t("fridgeEmpty")}
            </p>
            <button
              type="button"
              onClick={() => setSelected([])}
              className="text-[12px] font-bold text-clay disabled:opacity-40"
              disabled={selected.length === 0}
            >
              {t("fridgeClear")}
            </button>
          </div>
        </div>

        {GROUPS.map((group) => {
          const items = INGREDIENTS.filter(
            (ingredient) => ingredient.category === group.id && !STAPLES.includes(ingredient.id)
          );
          if (!items.length) return null;
          return (
            <section key={group.id} className="mt-4">
              <h2 className="mb-2 text-[13px] font-bold text-ink-soft">{t(group.label)}</h2>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {items.map((ingredient) => {
                  const active = selected.includes(ingredient.id);
                  return (
                    <button
                      key={ingredient.id}
                      type="button"
                      onClick={() => toggle(ingredient.id)}
                      aria-pressed={active}
                      className={`flex min-h-[76px] flex-col items-center justify-center gap-1 rounded-xl border px-1.5 py-2 text-center transition-all active:scale-[0.97] ${
                        active
                          ? "border-mint bg-mint-tint shadow-[0_2px_8px_rgba(31,111,92,0.16)]"
                          : "border-line bg-card/85"
                      }`}
                    >
                      <span className="text-[20px] leading-none">{ingredient.icon}</span>
                      <span
                        className={`text-[11px] font-bold leading-tight ${
                          active ? "text-mint-deep" : "text-ink-soft"
                        }`}
                      >
                        {ingredient.name[locale]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}

        <div className="mt-5 rounded-xl border border-line bg-card/75 p-3">
          <p className="text-[11.5px] font-semibold leading-relaxed text-ink-soft">
            {t("fridgeStaples")}: {STAPLES.map((id) => INGREDIENTS.find((i) => i.id === id)?.name[locale]).filter(Boolean).join(" · ")}
          </p>
        </div>

        <section className="mt-7">
          <div className="flex items-baseline justify-between">
            <h2 className="text-[17px] font-bold">{t("fridgeGo")}</h2>
            {results.length > 0 && (
              <span className="text-[12px] font-semibold text-ink-faint">
                {results.length} {t("results")}
              </span>
            )}
          </div>

          {selected.length < 2 ? (
            <p className="mt-3 rounded-xl bg-sand/70 px-4 py-6 text-center text-[13px] font-semibold text-ink-soft">
              {t("fridgeEmpty")}
            </p>
          ) : results.length === 0 ? (
            <EmptyState title={t("noResultsTitle")} body={t("noResultsBody")} mood="thinking" />
          ) : (
            <div className="mt-3 space-y-3">
              {results.map((result, index) => (
                <motion.div
                  key={result.recipe.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.04, 0.24) }}
                >
                  <RecipeCard
                    recipe={result.recipe}
                    locale={locale}
                    missing={result.missing}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
