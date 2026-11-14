"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TopBar } from "./TopBar";
import { RecipeImage } from "./RecipeImage";
import { EmptyState } from "./ui";
import { makeT, type Locale } from "@/i18n/dictionaries";
import { SLOTS, getRecipe, recipesBySlot } from "@/data";
import type { MealSlot, Recipe } from "@/data/types";
import { addDays, dateKey, formatShortDate, isSameDay, startOfWeek, weekDays } from "@/lib/date";
import { useStore } from "@/lib/store";

export function PlannerScreen({ locale }: { locale: Locale }) {
  const t = makeT(locale);
  const store = useStore();
  const [weekOffset, setWeekOffset] = useState(0);
  const [picker, setPicker] = useState<{ day: string; slot: MealSlot } | null>(null);

  const weekStart = useMemo(
    () => addDays(startOfWeek(new Date()), weekOffset * 7),
    [weekOffset]
  );
  const days = useMemo(() => weekDays(weekStart), [weekStart]);
  const today = new Date();

  const plannedCount = days.reduce(
    (sum, day) =>
      sum +
      SLOTS.filter((slot) => store.plan[`${dateKey(day)}:${slot}`]).length,
    0
  );

  return (
    <>
      <TopBar
        title={t("plannerTitle")}
        subtitle={t("plannerHint")}
        fallbackHref={`/${locale}`}
        right={
          <Link
            href={`/${locale}/shopping`}
            className="rounded-full border border-line bg-card/90 px-3 py-1.5 text-[11.5px] font-bold text-clay"
          >
            {t("goShopping")}
          </Link>
        }
      />

      <div className="page pt-4">
        <div className="flex items-center justify-between rounded-xl border border-line bg-card/85 px-2 py-1.5">
          <button
            type="button"
            className="icon-btn"
            aria-label="previous week"
            onClick={() => setWeekOffset((value) => value - 1)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="rtl:-scale-x-100">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="text-center">
            <p className="text-[13px] font-bold">{t("thisWeek")}</p>
            <p className="text-[11px] font-semibold text-ink-faint">
              {formatShortDate(days[0], locale)} — {formatShortDate(days[6], locale)}
            </p>
          </div>
          <button
            type="button"
            className="icon-btn"
            aria-label="next week"
            onClick={() => setWeekOffset((value) => value + 1)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="rtl:-scale-x-100">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            store.autofillWeek();
            store.toast(t("addedToPlan"));
          }}
          className="btn btn-primary btn-sm mt-3 w-full"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
          </svg>
          {t("fillWeek")}
        </button>

        {plannedCount === 0 && (
          <EmptyState
            title={t("emptyPlannerTitle")}
            body={t("emptyPlannerBody")}
            mood="thinking"
          />
        )}

        <div className="mt-4 space-y-4">
          {days.map((day) => {
            const key = dateKey(day);
            const isToday = isSameDay(day, today);
            return (
              <section key={key}>
                <div className="mb-1.5 flex items-center gap-2">
                  <h2
                    className={`text-[13.5px] font-bold ${
                      isToday ? "text-clay" : "text-ink"
                    }`}
                  >
                    {new Intl.DateTimeFormat(locale === "ar" ? "ar-MA" : locale, {
                      weekday: "long",
                    }).format(day)}
                  </h2>
                  <span className="text-[11px] font-semibold text-ink-faint">
                    {formatShortDate(day, locale)}
                  </span>
                  {isToday && (
                    <span className="rounded-full bg-clay-tint px-2 py-0.5 text-[10px] font-bold text-clay-deep">
                      {t("today")}
                    </span>
                  )}
                </div>

                <div className="grid gap-1.5">
                  {SLOTS.map((slot) => {
                    const slug = store.plan[`${key}:${slot}`];
                    const recipe = slug ? getRecipe(slug) : undefined;
                    return (
                      <div key={slot} className="flex items-center gap-2">
                        <span className="w-14 shrink-0 text-[11px] font-bold uppercase tracking-wide text-ink-faint">
                          {t(slot)}
                        </span>
                        {recipe ? (
                          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-line bg-card/85 p-1.5">
                            <Link
                              href={`/${locale}/recipe/${recipe.slug}`}
                              className="flex min-w-0 flex-1 items-center gap-2"
                            >
                              <span className="h-8 w-8 shrink-0 overflow-hidden rounded-md">
                                <RecipeImage slug={recipe.slug} art={recipe.art} />
                              </span>
                              <span className="truncate text-[12.5px] font-semibold">
                                {recipe.name[locale]}
                              </span>
                            </Link>
                            <button
                              type="button"
                              aria-label={t("removePlan")}
                              onClick={() => store.removePlanEntry(key, slot)}
                              className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-ink-faint hover:bg-sand hover:text-clay"
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                                <path d="M6 6l12 12M18 6 6 18" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setPicker({ day: key, slot })}
                            className="flex min-h-[42px] flex-1 items-center justify-center gap-1 rounded-lg border border-dashed border-sand-deep bg-card/55 text-[12px] font-semibold text-ink-faint transition-colors hover:border-clay/50 hover:text-clay"
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                              <path d="M12 5v14M5 12h14" />
                            </svg>
                            {t("emptySlot")}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => {
            const count = store.addPlanToShopping();
            store.toast(t("addToShoppingDone"), t("goShopping"), () => {
              window.location.href = `/${locale}/shopping`;
            });
            if (count === 0) store.toast(t("emptyPlannerBody"));
          }}
          className="btn btn-secondary mt-6 w-full"
        >
          {t("goShopping")}
        </button>
      </div>

      <RecipePicker
        open={picker !== null}
        locale={locale}
        slot={picker?.slot ?? "ghda"}
        onClose={() => setPicker(null)}
        onPick={(recipe) => {
          if (picker) {
            store.setPlanSlot(picker.day, picker.slot, recipe.slug);
            store.toast(t("addedToPlan"));
          }
          setPicker(null);
        }}
      />
    </>
  );
}

function RecipePicker({
  open,
  locale,
  slot,
  onClose,
  onPick,
}: {
  open: boolean;
  locale: Locale;
  slot: MealSlot;
  onClose: () => void;
  onPick: (recipe: Recipe) => void;
}) {
  const t = makeT(locale);
  const [query, setQuery] = useState("");

  const pool = useMemo(() => {
    const base = recipesBySlot(slot);
    if (!query.trim()) return base;
    const q = query.trim().toLowerCase();
    return base.filter((recipe) =>
      [recipe.name.ar, recipe.name.fr, recipe.name.en]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [slot, query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            onClick={(event) => event.stopPropagation()}
            className="flex max-h-[82dvh] w-full max-w-[720px] flex-col rounded-t-2xl bg-cream"
          >
            <div className="border-b border-line px-4 pb-2 pt-3">
              <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-sand-deep" />
              <h2 className="text-[16px] font-bold">{t("pickRecipe")} · {t(slot)}</h2>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("homeQuestion")}
                className="mt-2 h-10 w-full rounded-lg border border-line bg-card/90 px-3 text-[13px] font-semibold outline-none focus:border-clay"
              />
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-2">
              {pool.length === 0 && (
                <p className="py-8 text-center text-[13px] font-semibold text-ink-faint">
                  {query ? t("noResultsTitle") : t("emptyPlannerBody")}
                </p>
              )}
              {pool.map((recipe) => (
                <button
                  key={recipe.slug}
                  type="button"
                  onClick={() => onPick(recipe)}
                  className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-start transition-colors hover:bg-sand/70"
                >
                  <span className="h-11 w-11 shrink-0 overflow-hidden rounded-lg">
                    <RecipeImage slug={recipe.slug} art={recipe.art} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13.5px] font-bold">
                      {recipe.name[locale]}
                    </span>
                    <span className="block text-[11.5px] font-semibold text-ink-faint">
                      {recipe.prep + recipe.cook} {t("min")} · {recipe.cost} {t("mad")}
                    </span>
                  </span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="shrink-0 text-ink-faint rtl:-scale-x-100">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
