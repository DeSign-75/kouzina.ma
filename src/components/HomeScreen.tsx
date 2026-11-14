"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { RecipeImage } from "./RecipeImage";
import { RecipeCard } from "./RecipeCard";
import { FavoriteButton } from "./FavoriteButton";
import { BrandLockup } from "./Logo";
import { LallaZohra } from "./Mascot";
import { StarDivider } from "./Moroccan";
import { makeT, type Locale } from "@/i18n/dictionaries";
import {
  RECIPES,
  byCollection,
  getRecipe,
  recipeOfDay,
  surpriseRecipe,
} from "@/data";
import { totalTime } from "@/data/types";
import { dateKey } from "@/lib/date";
import { useStore } from "@/lib/store";

const SLOT_META = [
  {
    slot: "ftour",
    label: "ftour",
    hint: "ftourHint",
    tint: "bg-saffron-tint",
    icon: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
      </>
    ),
  },
  {
    slot: "ghda",
    label: "ghda",
    hint: "ghdaHint",
    tint: "bg-clay-tint",
    icon: (
      <>
        <path d="M4 12h16a8 8 0 0 1-16 0Z" />
        <path d="M2 12h20M9 7c0-1.5 1-2 1-3M14 7c0-1.5 1-2 1-3" />
      </>
    ),
  },
  {
    slot: "cha",
    label: "cha",
    hint: "chaHint",
    tint: "bg-mint-tint",
    icon: <path d="M20 14.5A8 8 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />,
  },
  {
    slot: "lunchbox",
    label: "lunchbox",
    hint: "lunchboxHint",
    tint: "bg-cream-deep",
    icon: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="3" />
        <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3 12h18" />
      </>
    ),
  },
] as const;

export function HomeScreen({ locale }: { locale: Locale }) {
  const t = makeT(locale);
  const router = useRouter();
  const store = useStore();
  const [greeting, setGreeting] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    setGreeting(
      hour < 12 ? t("greetingMorning") : hour < 17 ? t("greetingNoon") : hour < 22 ? t("greetingEvening") : t("greetingNight")
    );

    if (!window.localStorage.getItem("kouzina:onboarded")) {
      router.replace(`/${locale}/onboarding`);
    }
  }, [locale, router]);

  const rotd = recipeOfDay();
  const quick = byCollection("quick").slice(0, 6);
  const budget = byCollection("budget").slice(0, 6);
  const friday = byCollection("friday").slice(0, 4);
  const today = dateKey(new Date());
  const todayPlan = ["ftour", "ghda", "cha", "lunchbox"]
    .map((slot) => ({ slot, slug: store.plan[`${today}:${slot}`] }))
    .filter((entry) => entry.slug)
    .map((entry) => ({ slot: entry.slot, recipe: getRecipe(entry.slug as string) }))
    .filter((entry) => entry.recipe);

  const resume = store.lastCooked ? getRecipe(store.lastCooked.slug) : undefined;

  return (
    <div className="page">
      <header className="flex items-center justify-between pb-4 pt-5">
        <BrandLockup locale={locale} />
        <Link
          href={`/${locale}/settings`}
          className="grid h-10 w-10 place-items-center rounded-full border border-line bg-card/85 text-clay"
          aria-label={t("settingsTitle")}
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="3.4" />
            <path d="M5 20c1.2-3.6 3.8-5.4 7-5.4s5.8 1.8 7 5.4" />
          </svg>
        </Link>
      </header>

      <div className="zellige-edge -mx-4 h-2.5 opacity-80" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
        className="flex items-start justify-between gap-2"
      >
        <div className="min-w-0">
          <p className="eyebrow">{mounted ? greeting : "\u00a0"}</p>
          <h1 className="mt-1.5 text-[30px] leading-[1.12] text-ink">
            {t("homeQuestion")}
          </h1>
        </div>
        <LallaZohra
          mood="welcome"
          showBackground={false}
          className="mt-1 h-[68px] w-[68px] shrink-0"
        />
      </motion.div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {SLOT_META.map((meta, index) => (
          <motion.div
            key={meta.slot}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index, duration: 0.3 }}
          >
            <Link
              href={`/${locale}/meal/${meta.slot}`}
              className={`group relative flex h-[112px] flex-col justify-between overflow-hidden rounded-2xl border border-line/70 p-3.5 ${meta.tint} transition-transform active:scale-[0.985]`}
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-line/70 bg-card/85 text-clay">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {meta.icon}
                </svg>
              </span>
              <span>
                <span className="block text-[17px] font-bold leading-tight text-ink">
                  {t(meta.label)}
                </span>
                <span className="mt-0.5 block text-[11.5px] font-medium text-ink-soft">
                  {t(meta.hint)}
                </span>
              </span>
              <svg
                className="absolute end-3 top-3.5 text-ink/25 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 rtl:-scale-x-100"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </Link>
          </motion.div>
        ))}
      </div>

      {resume && (
        <Link
          href={`/${locale}/recipe/${resume.slug}/cook`}
          className="mt-4 flex items-center gap-3 rounded-2xl border border-saffron/40 bg-saffron-tint px-4 py-3"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-card text-saffron-deep">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] font-bold uppercase tracking-wide text-saffron-deep">
              {t("continueCooking")}
            </span>
            <span className="block truncate text-sm font-bold">{resume.name[locale]}</span>
          </span>
          <span className="pill bg-card/85 text-saffron-deep">
            {store.lastCooked?.step === 0 ? 1 : (store.lastCooked?.step ?? 0) + 1}/{resume.steps.length}
          </span>
        </Link>
      )}

      {todayPlan.length > 0 && (
        <section className="mt-6">
          <h2 className="text-[15px] font-bold text-ink">{t("todayPlan")}</h2>
          <div className="mt-2 space-y-2">
            {todayPlan.map(({ slot, recipe }) => (
              <Link
                key={slot}
                href={`/${locale}/recipe/${recipe!.slug}`}
                className="flex items-center gap-3 rounded-xl border border-line bg-card/85 p-2"
              >
                <span className="h-11 w-11 overflow-hidden rounded-lg">
                  <RecipeImage slug={recipe!.slug} art={recipe!.art} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10.5px] font-bold uppercase tracking-wide text-ink-faint">
                    {t(slot)}
                  </span>
                  <span className="block truncate text-sm font-bold">{recipe!.name[locale]}</span>
                </span>
                <span className="text-ink-faint">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="rtl:-scale-x-100">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <StarDivider className="mt-8 text-clay/35" />

      <section className="mt-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-[15px] font-bold">{t("recipeOfDay")}</h2>
          <span className="text-[11px] font-semibold text-ink-faint">
            {t("delicious")}
          </span>
        </div>
        <article className="relative mt-2 overflow-hidden rounded-2xl border border-line bg-card shadow-[var(--shadow-e2)]">
          <Link href={`/${locale}/recipe/${rotd.slug}`}>
            <div className="relative aspect-[16/10]">
              <RecipeImage
                slug={rotd.slug}
                art={rotd.art}
                alt={rotd.name[locale]}
                eager
              />
            </div>
            <div className="p-4">
              <h3 className="text-[19px] font-bold leading-snug">{rotd.name[locale]}</h3>
              <p className="mt-1 line-clamp-2 text-[13px] text-ink-soft">
                {rotd.description[locale]}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="pill">
                  {totalTime(rotd)} {t("min")}
                </span>
                <span className="pill pill-mint">
                  {rotd.cost} {t("mad")}
                </span>
                <span className="pill pill-saffron">
                  {rotd.servings} {t("persons")}
                </span>
              </div>
            </div>
          </Link>
          <div className="absolute end-3 top-3">
            <FavoriteButton
              slug={rotd.slug}
              label={t("favorite")}
              savedLabel={t("saved")}
              removedLabel={t("removed")}
            />
          </div>
        </article>
      </section>

      <Shelf title={t("quickShelf")} locale={locale} recipes={quick} />
      <Shelf title={t("budgetShelf")} locale={locale} recipes={budget} />
      {friday.length > 0 && <Shelf title={t("fridayShelf")} locale={locale} recipes={friday} />}

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          const pick = surpriseRecipe(store.seen.slice(0, 3));
          router.push(`/${locale}/recipe/${pick.slug}`);
        }}
        className="zellige-cream mt-8 flex w-full items-center justify-between rounded-2xl border border-clay-deep bg-clay px-5 py-4 text-cream shadow-[0_18px_34px_-20px_rgba(124,24,16,0.95)]"
      >
        <span className="text-start">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-saffron">
            {t("surpriseHint")}
          </span>
          <span className="text-[17px] font-bold">{t("surprise")}</span>
        </span>
        <span className="grid h-10 w-10 place-items-center rounded-full bg-cream/10">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="8.5" cy="8.5" r="1.4" fill="currentColor" />
            <circle cx="15.5" cy="15.5" r="1.4" fill="currentColor" />
            <circle cx="15.5" cy="8.5" r="1.4" fill="currentColor" />
            <circle cx="8.5" cy="15.5" r="1.4" fill="currentColor" />
          </svg>
        </span>
      </motion.button>

      <p className="mt-6 text-center text-[11px] font-medium text-ink-faint">
        {t("madeIn")} · {RECIPES.length} {t("navRecipes")}
      </p>
    </div>
  );
}

function Shelf({
  title,
  recipes,
  locale,
}: {
  title: string;
  recipes: ReturnType<typeof byCollection>;
  locale: Locale;
}) {
  const t = makeT(locale);
  if (!recipes.length) return null;

  return (
    <section className="mt-7">
      <div className="flex items-baseline justify-between">
        <h2 className="text-[15px] font-bold">{title}</h2>
        <Link
          href={`/${locale}/recipes`}
          className="text-[12px] font-bold text-clay hover:underline"
        >
          {t("seeAll")}
        </Link>
      </div>
      <div className="no-scrollbar -mx-4 mt-2 flex snap-x gap-3 overflow-x-auto px-4 pb-1">
        {recipes.map((recipe) => (
          <div key={recipe.slug} className="w-[178px] shrink-0 snap-start">
            <RecipeCard recipe={recipe} locale={locale} />
          </div>
        ))}
      </div>
    </section>
  );
}
