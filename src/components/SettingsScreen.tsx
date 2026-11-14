"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TopBar } from "./TopBar";
import { LallaZohra } from "./Mascot";
import { makeT, localeNames, locales, type Locale } from "@/i18n/dictionaries";
import { INGREDIENTS } from "@/data/ingredients";
import { RECIPES } from "@/data";
import { PHOTOS } from "@/data/photos";
import { useStore } from "@/lib/store";

export function SettingsScreen({ locale }: { locale: Locale }) {
  const t = makeT(locale);
  const router = useRouter();
  const pathname = usePathname();
  const store = useStore();
  const [confirmClear, setConfirmClear] = useState(false);
  const [reminders, setReminders] = useState(false);

  useEffect(() => {
    setReminders(window.localStorage.getItem("kouzina:reminders") === "1");
  }, []);

  const switchLocale = (next: Locale) => {
    const segments = pathname.split("/").filter(Boolean);
    segments[0] = next;
    router.push(`/${segments.join("/")}`);
  };

  return (
    <>
      <TopBar title={t("settingsTitle")} fallbackHref={`/${locale}`} />
      <div className="page pt-4">
        <div className="flex items-center gap-3 rounded-2xl border border-line bg-card/85 p-4">
          <LallaZohra mood="happy" className="h-16 w-16 shrink-0" showBackground={false} />
          <div className="min-w-0">
            <p className="text-[15px] font-bold">{t("appName")}</p>
            <p className="mt-0.5 text-[12px] font-medium leading-relaxed text-ink-soft">
              {t("aboutBody")}
            </p>
          </div>
        </div>

        <Section title={t("language")}>
          <div className="grid grid-cols-3 gap-2">
            {locales.map((entry) => (
              <button
                key={entry}
                type="button"
                onClick={() => switchLocale(entry)}
                className={`rounded-xl border py-3 text-[13px] font-bold transition-colors ${
                  entry === locale
                    ? "border-clay bg-clay-tint text-clay-deep"
                    : "border-line bg-card/85 text-ink-soft"
                }`}
                aria-pressed={entry === locale}
              >
                {localeNames[entry]}
              </button>
            ))}
          </div>
        </Section>

        <Section title={t("householdTitle")}>
          <div className="rounded-xl border border-line bg-card/85 p-3">
            <p className="text-[12px] font-medium leading-relaxed text-ink-soft">
              {t("householdHint")}
            </p>
            <div className="mt-2.5 grid grid-cols-6 gap-1.5">
              {[2, 3, 4, 5, 6, 8].map((count) => {
                const active = store.household === count;
                return (
                  <button
                    key={count}
                    type="button"
                    onClick={() => store.setHousehold(count)}
                    aria-pressed={active}
                    className={`rounded-xl border py-2.5 text-[15px] font-bold tabular-nums transition-colors ${
                      active
                        ? "border-clay bg-clay-tint text-clay-deep"
                        : "border-line bg-card/85 text-ink-soft"
                    }`}
                  >
                    {count}
                  </button>
                );
              })}
            </div>
            <p className="mt-1.5 text-[11px] font-semibold text-ink-faint">
              {store.household} {t("householdLabel")}
            </p>
          </div>
        </Section>

        <Section title={t("textSize")}>
          <div className="flex gap-2">
            {[
              { value: 1, label: "textNormal" },
              { value: 1.12, label: "textLarge" },
              { value: 1.25, label: "textXLarge" },
            ].map((entry) => (
              <button
                key={entry.value}
                type="button"
                onClick={() => store.setTextScale(entry.value)}
                className="flex-1 rounded-xl border py-2.5 text-[12.5px] font-bold transition-colors"
                style={{
                  borderColor: store.textScale === entry.value ? "var(--color-clay)" : "var(--color-line)",
                  background:
                    store.textScale === entry.value ? "var(--color-clay-tint)" : "rgba(255,255,255,0.7)",
                  color:
                    store.textScale === entry.value ? "var(--color-clay-deep)" : "var(--color-ink-soft)",
                  fontSize: `${13 * entry.value}px`,
                }}
                aria-pressed={store.textScale === entry.value}
              >
                {t(entry.label)}
              </button>
            ))}
          </div>
        </Section>

        <Section title={t("notifications")}>
          <button
            type="button"
            onClick={() => {
              const next = !reminders;
              setReminders(next);
              window.localStorage.setItem("kouzina:reminders", next ? "1" : "0");
            }}
            className="flex w-full items-center justify-between rounded-xl border border-line bg-card/85 px-3.5 py-3"
            aria-pressed={reminders}
          >
            <span className="text-start">
              <span className="block text-[13.5px] font-bold">{t("notifications")}</span>
              <span className="block text-[11.5px] font-medium text-ink-faint">
                {t("notificationsHint")}
              </span>
            </span>
            <span
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                reminders ? "bg-mint" : "bg-sand-deep"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition-all ${
                  reminders ? "start-[22px]" : "start-0.5"
                }`}
              />
            </span>
          </button>
        </Section>

        <Section title={t("favoritesTitle")}>
          <div className="divide-y divide-line/60 overflow-hidden rounded-xl border border-line bg-card/85">
            <RowLink
              href={`/${locale}/favorites`}
              label={t("favoritesTitle")}
              value={`${store.favorites.length}`}
            />
            <RowLink
              href={`/${locale}/shopping`}
              label={t("shoppingTitle")}
              value={`${store.shopping.filter((item) => !item.checked).length}`}
            />
            <RowLink
              href={`/${locale}/planner`}
              label={t("plannerTitle")}
              value={`${Object.keys(store.plan).length}`}
            />
            <RowLink
              href={`/${locale}/recipes`}
              label={t("navRecipes")}
              value={`${RECIPES.length}`}
            />
            <RowLink
              href={`/${locale}/credits`}
              label={t("creditsView")}
              value={`${Object.keys(PHOTOS).length}`}
            />
          </div>
        </Section>

        <Section title={t("about")}>
          <div className="rounded-xl border border-line bg-card/85 p-3.5">
            <p className="text-[12.5px] font-medium leading-relaxed text-ink-soft">
              {t("aboutBody")}
            </p>
            <p className="mt-2 text-[11.5px] font-semibold text-ink-faint">
              {INGREDIENTS.length} {t("ingredientsCount")} · {RECIPES.length} {t("results")}
            </p>
            <p className="mt-1 text-[11.5px] font-semibold text-clay">{t("madeIn")}</p>
            <p className="mt-0.5 text-[11px] font-medium text-ink-faint">
              {t("version")} 0.1.0
            </p>
          </div>
        </Section>

        <Section title={t("clearData")}>
          <div className="rounded-xl border border-line bg-card/85 p-3.5">
            <p className="text-[12px] font-medium leading-relaxed text-ink-soft">
              {t("clearDataHint")}
            </p>
            {confirmClear ? (
              <div className="mt-2.5 flex gap-2">
                <button
                  type="button"
                  className="btn btn-ghost btn-sm flex-1"
                  onClick={() => setConfirmClear(false)}
                >
                  {t("cancel")}
                </button>
                <button
                  type="button"
                  className="btn btn-sm flex-1 bg-danger text-white"
                  onClick={() => {
                    store.clearAll();
                    setConfirmClear(false);
                    store.toast(t("clearData"));
                  }}
                >
                  {t("confirm")}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmClear(true)}
                className="btn btn-secondary btn-sm mt-2.5 w-full border-danger text-danger hover:bg-danger/5"
              >
                {confirmClear ? t("clearDataConfirm") : t("clearData")}
              </button>
            )}
          </div>
        </Section>

        <p className="mt-8 text-center text-[11px] font-medium text-ink-faint">
          {t("madeIn")}
        </p>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5">
      <h2 className="mb-2 text-[12px] font-bold uppercase tracking-wide text-ink-faint">{title}</h2>
      {children}
    </section>
  );
}

function RowLink({ href, label, value }: { href: string; label: string; value: string }) {
  return (
    <Link href={href} className="flex items-center justify-between px-3.5 py-2.5">
      <span className="text-[13.5px] font-semibold">{label}</span>
      <span className="flex items-center gap-1.5 text-[12px] font-semibold text-ink-faint">
        {value}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="rtl:-scale-x-100">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}
