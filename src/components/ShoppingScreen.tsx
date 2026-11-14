"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TopBar } from "./TopBar";
import { EmptyState } from "./ui";
import { makeT, type Locale } from "@/i18n/dictionaries";
import { INGREDIENTS } from "@/data/ingredients";
import type { IngredientCategory } from "@/data/types";
import { formatQty } from "@/data/types";
import { priceFor, useStore } from "@/lib/store";

const GROUP_ORDER: { id: IngredientCategory; label: string; icon: string }[] = [
  { id: "veg", label: "catVegetables", icon: "🥕" },
  { id: "protein", label: "catProtein", icon: "🍗" },
  { id: "dairy", label: "catDairy", icon: "🥛" },
  { id: "pantry", label: "catPantry", icon: "🌾" },
  { id: "spice", label: "catSpices", icon: "🌶️" },
];

export function ShoppingScreen({ locale }: { locale: Locale }) {
  const t = makeT(locale);
  const store = useStore();
  const [adding, setAdding] = useState(false);
  const [query, setQuery] = useState("");

  const grouped = useMemo(() => {
    const map = new Map<IngredientCategory, typeof store.shopping>();
    for (const item of store.shopping) {
      const ing = INGREDIENTS.find((entry) => entry.id === item.id);
      const category: IngredientCategory = ing?.category ?? "pantry";
      map.set(category, [...(map.get(category) ?? []), item]);
    }
    return GROUP_ORDER.map((group) => ({
      ...group,
      items: (map.get(group.id) ?? []).sort((a, b) => Number(a.checked) - Number(b.checked)),
    })).filter((group) => group.items.length > 0);
  }, [store.shopping]);

  const total = store.shopping.reduce((sum, item) => {
    if (item.checked) return sum;
    const ing = INGREDIENTS.find((entry) => entry.id === item.id);
    const grams = ing?.pieceGrams ?? 100;
    const factor =
      item.unit === "g" || item.unit === "ml"
        ? item.qty / 1000
        : item.unit === "kg" || item.unit === "l"
          ? item.qty
          : (item.qty * grams) / 1000;
    return sum + priceFor(item.id) * Math.max(factor, 0.15);
  }, 0);

  const pending = store.shopping.filter((item) => !item.checked).length;

  const share = async () => {
    const lines = store.shopping
      .filter((item) => !item.checked)
      .map((item) => {
        const name = INGREDIENTS.find((entry) => entry.id === item.id)?.name[locale] ?? item.id;
        return `• ${name} — ${formatQty(item.qty, item.unit, locale)}`;
      });
    const text = `${t("shoppingTitle")}\n${lines.join("\n")}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: t("shoppingTitle"), text });
      } else {
        await navigator.clipboard.writeText(text);
        store.toast(t("copied"));
      }
    } catch {
      /* user cancelled */
    }
  };

  const addPool = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INGREDIENTS.filter((ing) =>
      q ? ing.name[locale].toLowerCase().includes(q) || ing.id.includes(q) : true
    ).slice(0, 40);
  }, [query, locale]);

  return (
    <>
      <TopBar
        title={t("shoppingTitle")}
        subtitle={`${pending} ${t("shoppingItems")}`}
        fallbackHref={`/${locale}/planner`}
        right={
          store.shopping.length > 0 ? (
            <button type="button" onClick={share} className="icon-btn" aria-label={t("shareList")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 16V4M8 8l4-4 4 4M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />
              </svg>
            </button>
          ) : undefined
        }
      />

      <div className="page pt-4">
        {store.shopping.length === 0 ? (
          <EmptyState
            title={t("emptyShoppingTitle")}
            body={t("emptyShoppingBody")}
            actionLabel={t("plannerTitle")}
            actionHref={`/${locale}/planner`}
            mood="sleepy"
          />
        ) : (
          <>
            <div className="flex items-center justify-between rounded-xl border border-line bg-card/85 px-3.5 py-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-ink-faint">
                  {t("shoppingApprox")}
                </p>
                <p className="text-[20px] font-bold tabular-nums leading-tight">
                  {Math.round(total)} {t("mad")}
                </p>
              </div>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => store.clearChecked()}
                  className="btn btn-ghost btn-sm"
                  disabled={!store.shopping.some((item) => item.checked)}
                >
                  {t("clearChecked")}
                </button>
                <button
                  type="button"
                  onClick={() => store.clearShopping()}
                  className="btn btn-ghost btn-sm text-danger"
                >
                  {t("clearAll")}
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              {grouped.map((group) => (
                <section key={group.id}>
                  <h2 className="mb-1.5 flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-ink-faint">
                    <span className="text-[14px]">{group.icon}</span>
                    {t(group.label)}
                  </h2>
                  <ul className="divide-y divide-line/60 overflow-hidden rounded-xl border border-line bg-card/85">
                    {group.items.map((item) => {
                      const ingredient = INGREDIENTS.find((entry) => entry.id === item.id);
                      return (
                        <li key={item.key} className="flex items-center gap-2 px-3 py-2">
                          <button
                            type="button"
                            onClick={() => store.toggleShoppingItem(item.key)}
                            className="flex min-w-0 flex-1 items-center gap-2.5 text-start"
                            aria-pressed={item.checked}
                          >
                            <span
                              className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors ${
                                item.checked
                                  ? "border-mint bg-mint text-white"
                                  : "border-line bg-card text-transparent"
                              }`}
                            >
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m5 12 5 5L20 7" />
                              </svg>
                            </span>
                            <span
                              className={`min-w-0 flex-1 truncate text-[13.5px] font-semibold ${
                                item.checked ? "text-ink-faint line-through" : "text-ink"
                              }`}
                            >
                              {ingredient?.icon} {ingredient?.name[locale] ?? item.id}
                            </span>
                            <span className="shrink-0 text-[11.5px] font-semibold tabular-nums text-ink-faint">
                              {formatQty(item.qty, item.unit, locale)}
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => store.removeShoppingItem(item.key)}
                            aria-label={t("removePlan")}
                            className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-ink-faint hover:bg-sand hover:text-clay"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                              <path d="M6 6l12 12M18 6 6 18" />
                            </svg>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          </>
        )}

        <button
          type="button"
          onClick={() => setAdding(true)}
          className="btn btn-secondary mt-5 w-full"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
          {t("addItem")}
        </button>

        <p className="mt-4 text-center text-[11px] font-medium text-ink-faint">
          {t("estimatedCost")}
        </p>
      </div>

      <AnimatePresence>
        {adding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/40 backdrop-blur-sm"
            onClick={() => setAdding(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              onClick={(event) => event.stopPropagation()}
              className="flex max-h-[80dvh] w-full max-w-[720px] flex-col rounded-t-2xl bg-cream"
            >
              <div className="border-b border-line px-4 pb-2 pt-3">
                <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-sand-deep" />
                <h2 className="text-[16px] font-bold">{t("addItem")}</h2>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t("fridgeTitle")}
                  className="mt-2 h-10 w-full rounded-lg border border-line bg-card/90 px-3 text-[13px] font-semibold outline-none focus:border-clay"
                />
              </div>
              <div className="flex-1 overflow-y-auto px-3 py-2">
                <div className="grid grid-cols-2 gap-1.5">
                  {addPool.map((ing) => (
                    <button
                      key={ing.id}
                      type="button"
                      onClick={() => {
                        store.addShoppingItem(ing.id);
                        store.toast(t("addToShoppingDone"));
                        setAdding(false);
                        setQuery("");
                      }}
                      className="flex items-center gap-2 rounded-xl border border-line bg-card/85 px-2.5 py-2 text-start transition-colors hover:border-clay/40"
                    >
                      <span className="text-[17px]">{ing.icon}</span>
                      <span className="min-w-0 flex-1 truncate text-[12.5px] font-semibold">
                        {ing.name[locale]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
