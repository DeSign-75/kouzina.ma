"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { TopBar } from "./TopBar";
import { makeT, type Locale } from "@/i18n/dictionaries";
import { CATEGORY_MAP, SLOT_CATEGORIES, filterRecipes, recipesBySlot } from "@/data";
import type { CategoryId, MealSlot } from "@/data/types";
import { totalTime } from "@/data/types";

export function MealExplorer({ locale, slot }: { locale: Locale; slot: MealSlot }) {
  const t = makeT(locale);
  const [maxTime, setMaxTime] = useState<number | undefined>();
  const [maxCost, setMaxCost] = useState<number | undefined>();
  const [servings, setServings] = useState<number | undefined>();
  const [category, setCategory] = useState<CategoryId | undefined>();

  const pool = useMemo(() => recipesBySlot(slot), [slot]);
  const filtered = useMemo(
    () => filterRecipes(pool, { maxTime, maxCost, servings, category }),
    [pool, maxTime, maxCost, servings, category]
  );

  const categories = SLOT_CATEGORIES[slot].map((id) => CATEGORY_MAP[id]).filter(Boolean);

  const query = new URLSearchParams();
  if (maxTime) query.set("time", String(maxTime));
  if (maxCost) query.set("cost", String(maxCost));
  if (servings) query.set("servings", String(servings));
  if (category) query.set("cat", category);

  return (
    <>
      <TopBar title={t(slot)} subtitle={t(`${slot}Hint`)} fallbackHref={`/${locale}`} />
      <div className="page pt-5">
        <div className="flex items-center gap-3 rounded-2xl bg-clay-tint/70 p-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-card text-clay">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          </span>
          <p className="text-[13.5px] font-semibold leading-snug text-clay-deep">
            {t("choosePreset")}
          </p>
        </div>

        <Field label={t("time")}>
          <Chip active={!maxTime} onClick={() => setMaxTime(undefined)}>
            {t("anyTime")}
          </Chip>
          <Chip active={maxTime === 20} onClick={() => setMaxTime(20)}>
            {t("under20")}
          </Chip>
          <Chip active={maxTime === 45} onClick={() => setMaxTime(45)}>
            {t("under45")}
          </Chip>
          <Chip active={maxTime === 90} onClick={() => setMaxTime(90)}>
            {t("longCook")}
          </Chip>
        </Field>

        <Field label={t("money")}>
          <Chip active={!maxCost} onClick={() => setMaxCost(undefined)}>
            {t("anyBudget")}
          </Chip>
          <Chip active={maxCost === 30} onClick={() => setMaxCost(30)}>
            ≤ 30 {t("mad")}
          </Chip>
          <Chip active={maxCost === 60} onClick={() => setMaxCost(60)}>
            ≤ 60 {t("mad")}
          </Chip>
          <Chip active={maxCost === 100} onClick={() => setMaxCost(100)}>
            ≤ 100 {t("mad")}
          </Chip>
        </Field>

        <Field label={t("people")}>
          {[2, 4, 6].map((n) => (
            <Chip key={n} active={servings === n} onClick={() => setServings(servings === n ? undefined : n)}>
              {n}
            </Chip>
          ))}
        </Field>

        <h2 className="mt-6 text-[15px] font-bold">{t("categories")}</h2>
        <div className="mt-2 grid grid-cols-3 gap-2.5">
          {categories.map((cat) => {
            const count = filterRecipes(pool, { maxTime, maxCost, servings }).filter(
              (r) => r.category === cat.id
            ).length;
            const active = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(active ? undefined : cat.id)}
                className={`flex flex-col items-center gap-1.5 rounded-2xl border p-3 transition-all active:scale-[0.98] ${
                  active
                    ? "border-clay bg-clay-tint"
                    : "border-line bg-card/85 hover:border-sand-deep"
                }`}
                aria-pressed={active}
              >
                <span className="text-[26px] leading-none">{cat.art}</span>
                <span className="text-center text-[12px] font-bold leading-tight">
                  {cat.name[locale]}
                </span>
                <span className="text-[10.5px] font-semibold text-ink-faint">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="sticky bottom-20 mt-6">
          <Link
            href={`/${locale}/meal/${slot}/results?${query.toString()}`}
            className={`btn btn-primary w-full ${filtered.length === 0 ? "pointer-events-none opacity-50" : ""}`}
          >
            {t("showRecipes")}
            <span className="rounded-full bg-card/20 px-2 py-0.5 text-[13px]">
              {filtered.length}
            </span>
          </Link>
          {filtered.length === 0 && (
            <p className="mt-2 text-center text-[12px] font-semibold text-clay">
              {t("noResultsBody")}
            </p>
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-line bg-card/75 p-4">
          <p className="text-[12px] font-semibold text-ink-soft">
            {t("estimatedCost")} · {t("staplesNote")}
          </p>
        </div>
      </div>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h2 className="mb-2 text-[13px] font-bold text-ink-soft">{label}</h2>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
        {children}
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button type="button" className="chip" data-active={active} onClick={onClick}>
      {children}
    </button>
  );
}

export function slotTitleKey(slot: MealSlot): string {
  return slot === "ftour" ? "breakfastTitle" : slot === "ghda" ? "lunchTitle" : slot === "cha" ? "dinnerTitle" : "lunchboxTitle";
}

export function slotSubtitleKey(slot: MealSlot): string {
  return slot === "ftour" ? "breakfastSub" : slot === "ghda" ? "lunchSub" : slot === "cha" ? "dinnerSub" : "lunchboxSub";
}

export function maxTimeOf(list: ReturnType<typeof recipesBySlot>): number {
  return Math.max(...list.map(totalTime), 0);
}
