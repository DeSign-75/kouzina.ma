"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RecipeImage } from "./RecipeImage";
import { LallaZohra } from "./Mascot";
import { makeT, type Locale } from "@/i18n/dictionaries";
import { getRecipe } from "@/data";
import { ingredientName } from "@/data/ingredients";
import { formatQty } from "@/data/types";
import { useStore } from "@/lib/store";

const TIMER_PRESETS = [5, 10, 15, 30];

export function CookMode({ locale, slug }: { locale: Locale; slug: string }) {
  const t = makeT(locale);
  const router = useRouter();
  const store = useStore();
  const recipe = getRecipe(slug);

  const [index, setIndex] = useState(() => {
    const saved = store.cooked[slug];
    return typeof saved === "number" ? Math.min(saved, (recipe?.steps.length ?? 1) - 1) : 0;
  });
  const [showIngredients, setShowIngredients] = useState(false);
  const [done, setDone] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);

  const steps = recipe?.steps ?? [];
  const totalSteps = steps.length;

  useEffect(() => {
    if (!timerRunning) return;
    const id = setInterval(() => {
      setSecondsLeft((value) => {
        if (value === null) return null;
        if (value <= 1) return 0;
        return value - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [timerRunning]);

  useEffect(() => {
    if (secondsLeft !== 0) return;
    setTimerRunning(false);
    store.toast(t("timerDone"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  const syncedRef = useRef<string | null>(null);
  const resumedRef = useRef(false);

  useEffect(() => {
    if (!store.hydrated || resumedRef.current || !recipe) return;
    resumedRef.current = true;
    const saved = store.cooked[recipe.slug];
    if (
      typeof saved === "number" &&
      saved > 0 &&
      saved < recipe.steps.length
    ) {
      setIndex(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.hydrated, recipe]);

  useEffect(() => {
    if (!recipe) return;
    const stamp = `${recipe.slug}:${index}`;
    if (syncedRef.current === stamp) return;
    syncedRef.current = stamp;
    store.setCookProgress(recipe.slug, index);
  }, [index, recipe, store]);

  if (!recipe) {
    return (
      <div className="page pt-16 text-center">
        <p className="text-[14px] text-ink-soft">{t("notFoundBody")}</p>
        <Link href={`/${locale}/recipes`} className="btn btn-primary btn-sm mt-4">
          {t("discoverRecipes")}
        </Link>
      </div>
    );
  }

  const progress = done ? 1 : (index + 1) / totalSteps;
  const timerLabel =
    secondsLeft === null
      ? null
      : `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(
          secondsLeft % 60
        ).padStart(2, "0")}`;

  const finish = () => {
    store.setCookProgress(recipe.slug, totalSteps);
    setDone(true);
  };

  return (
    <div className="flex min-h-dvh flex-col bg-cream">
      <header className="sticky top-0 z-30 border-b border-line/70 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[720px] items-center gap-2 px-3">
          <button
            type="button"
            onClick={() => router.push(`/${locale}/recipe/${recipe.slug}`)}
            className="icon-btn"
            aria-label={t("leave")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="rtl:-scale-x-100">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13.5px] font-bold">{recipe.name[locale]}</p>
            <p className="text-[11px] font-semibold text-ink-faint">
              {done
                ? t("cookingDone")
                : `${t("step")} ${index + 1} ${t("of")} ${totalSteps}`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowIngredients((value) => !value)}
            className="rounded-full border border-line bg-card/90 px-3 py-1.5 text-[11.5px] font-bold text-ink-soft"
          >
            {t("ingredients")}
          </button>
        </div>
        <div className="h-1 w-full bg-sand">
          <motion.div
            className="h-full bg-clay"
            animate={{ width: `${Math.round(progress * 100)}%` }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
          />
        </div>
      </header>

      <AnimatePresence>
        {showIngredients && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-line bg-card/85"
          >
            <ul className="mx-auto max-w-[720px] px-4 py-2">
              {recipe.ingredients.map((item) => (
                <li
                  key={`${item.id}-${item.unit}`}
                  className="flex items-center justify-between border-b border-line/50 py-1.5 text-[13px] last:border-0"
                >
                  <span className="font-semibold">{ingredientName(item.id, locale)}</span>
                  <span className="text-[12px] font-semibold text-ink-soft">
                    {formatQty(item.qty, item.unit, locale)}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="mx-auto flex w-full max-w-[720px] flex-1 flex-col px-4 pb-32 pt-5">
        {done ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <LallaZohra mood="happy" className="h-44 w-44" />
            <h2 className="mt-3 text-[26px]">{t("cookingDone")}</h2>
            <p className="mt-1.5 max-w-[300px] text-[14px] leading-relaxed text-ink-soft">
              {t("cookingDoneBody")}
            </p>
            <div className="mt-5 w-full max-w-[320px] space-y-2">
              <button
                type="button"
                className="btn btn-secondary w-full"
                onClick={() => {
                  store.addRecipeToShopping(
                    recipe.slug,
                    Math.max(0.5, Math.min(3, store.household / recipe.servings))
                  );
                  store.toast(t("addToShoppingDone"));
                }}
              >
                {t("addToShopping")}
              </button>
              <button
                type="button"
                className="btn btn-ghost w-full"
                onClick={() => {
                  store.toggleFavorite(recipe.slug);
                  store.toast(t("addFavorite"));
                }}
              >
                {t("addFavorite")}
              </button>
              <Link href={`/${locale}`} className="btn btn-primary w-full">
                {t("backHome")}
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center gap-3 rounded-2xl border border-line bg-card/75 p-3">
              <span className="h-12 w-12 overflow-hidden rounded-lg">
                <RecipeImage slug={recipe.slug} art={recipe.art} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold uppercase tracking-wide text-ink-faint">
                  {t("step")} {index + 1} / {totalSteps}
                </p>
                <p className="truncate text-[13px] font-semibold">{recipe.name[locale]}</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
                className="flex-1"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-clay text-[17px] font-bold text-white">
                  {index + 1}
                </span>
                <p className="mt-4 text-[22px] font-semibold leading-snug tracking-tight">
                  {steps[index]?.[locale]}
                </p>

                <div className="mt-6 rounded-2xl border border-line bg-card/75 p-3.5">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-ink-faint">
                    {t("stepTimer")}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    {TIMER_PRESETS.map((minutes) => (
                      <button
                        key={minutes}
                        type="button"
                        className="chip"
                        data-active={secondsLeft === minutes * 60}
                        onClick={() => {
                          setSecondsLeft(minutes * 60);
                          setTimerRunning(true);
                        }}
                      >
                        {minutes} {t("min")}
                      </button>
                    ))}
                  </div>
                  {timerLabel && (
                    <div className="mt-3 flex items-center gap-3">
                      <span className="text-[30px] font-bold tabular-nums leading-none">
                        {timerLabel}
                      </span>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => setTimerRunning((value) => !value)}
                      >
                        {timerRunning ? t("timerPause") : t("timerStart")}
                      </button>
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        onClick={() => {
                          setTimerRunning(false);
                          setSecondsLeft(null);
                        }}
                      >
                        {t("clearFilters")}
                      </button>
                    </div>
                  )}
                </div>

                {recipe.tips[index] && (
                  <div className="mt-4 rounded-xl border border-saffron/30 bg-saffron-tint/70 p-3 text-[12.5px] font-medium text-saffron-deep">
                    💡 {recipe.tips[index]?.[locale]}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </main>

      {!done && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-cream/95 backdrop-blur safe-bottom">
          <div className="mx-auto flex max-w-[720px] items-center gap-2 px-4 py-3">
            <button
              type="button"
              className="btn btn-secondary btn-sm flex-1"
              disabled={index === 0}
              onClick={() => setIndex((value) => Math.max(0, value - 1))}
            >
              {t("prev")}
            </button>
            {index === totalSteps - 1 ? (
              <button type="button" className="btn btn-primary flex-[1.4]" onClick={finish}>
                {t("finish")}
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary flex-[1.4]"
                onClick={() => setIndex((value) => Math.min(totalSteps - 1, value + 1))}
              >
                {t("next")}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
