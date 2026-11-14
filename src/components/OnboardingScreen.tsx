"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LallaZohra } from "./Mascot";
import { BrandLockup, WordmarkLockup } from "./Logo";
import { ArchFrame, StarDivider, StarOrnament } from "./Moroccan";
import { makeT, localeNames, locales, type Locale } from "@/i18n/dictionaries";

const SLOT_ORDER = ["ftour", "ghda", "cha", "lunchbox"] as const;

const SLOT_ICONS: Record<(typeof SLOT_ORDER)[number], React.ReactNode> = {
  ftour: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </>
  ),
  ghda: (
    <>
      <path d="M4 12h16a8 8 0 0 1-16 0Z" />
      <path d="M2 12h20M9 7c0-1.5 1-2 1-3M14 7c0-1.5 1-2 1-3" />
    </>
  ),
  cha: <path d="M20 14.5A8 8 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />,
  lunchbox: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="3" />
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3 12h18" />
    </>
  ),
};

export function OnboardingScreen({ locale }: { locale: Locale }) {
  const t = makeT(locale);
  const router = useRouter();
  const [step, setStep] = useState(0);

  const chooseLocale = (next: Locale) => {
    if (next === locale) {
      setStep(1);
      return;
    }
    router.replace(`/${next}/onboarding`);
  };

  const finish = (slot?: string) => {
    window.localStorage.setItem("kouzina:onboarded", "1");
    router.replace(slot ? `/${locale}/meal/${slot}` : `/${locale}`);
  };

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-cream">
      <div className="zellige pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-cream via-cream/75 to-transparent"
        aria-hidden="true"
      />

      <div className="relative flex flex-1 flex-col">
        <div className="zellige-edge h-2.5" aria-hidden="true" />

        <div className="mx-auto flex w-full max-w-[560px] flex-1 flex-col px-6 pb-9 pt-5">
          <div className="flex items-start justify-between gap-3">
            <BrandLockup locale={locale} />
            <button
              type="button"
              onClick={() => finish()}
              className="mt-1 rounded-full border border-line/80 bg-card/70 px-3 py-1.5 text-[11.5px] font-bold text-ink-faint transition-colors hover:text-clay"
            >
              {t("skip")}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {step === 0 ? (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.32 }}
                className="flex flex-1 flex-col pt-4"
              >
                <div className="relative mx-auto">
                  <div className="glow-saffron absolute -inset-10 rounded-full" aria-hidden="true" />
                  <ArchFrame
                    className="relative h-[212px] w-[176px]"
                    patternId="welcome-arch"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/brand/lalla-zohra.webp"
                      alt={t("mascotName")}
                      draggable={false}
                      className="float-slow relative h-[180px] w-auto select-none"
                    />
                  </ArchFrame>
                  <StarOrnament className="absolute -end-3.5 top-10 h-5 w-5 text-mint/60" />
                  <StarOrnament className="absolute -start-3 bottom-14 h-4 w-4 text-clay/40" />
                </div>

                <div className="mt-2.5 flex justify-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron/50 bg-saffron-tint/85 px-3 py-1 text-[11.5px] font-bold text-saffron-deep">
                    {t("mascotName")}
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-ink-soft">{t("mascotRole")}</span>
                  </span>
                </div>

                <WordmarkLockup
                  locale={locale}
                  kicker={t("welcomeKicker")}
                  className="mt-3"
                />

                <h1 className="mt-3.5 text-center text-[21px] leading-tight text-ink">
                  {t("tagline")}
                </h1>
                <p className="mx-auto mt-2 max-w-[330px] text-center text-[13.5px] leading-relaxed text-ink-soft">
                  {t("welcome")}
                </p>

                <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                  {[t("featureRecipes"), t("featurePrices"), t("featureSteps")].map(
                    (label) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-1.5 rounded-full border border-mint/25 bg-mint-tint/70 px-3 py-1.5 text-[11.5px] font-semibold text-mint-deep"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-mint/70" aria-hidden="true" />
                        {label}
                      </span>
                    )
                  )}
                </div>

                <div className="mt-auto pt-6">
                  <p className="text-center text-[10.5px] font-bold uppercase tracking-[0.2em] text-ink-faint">
                    {t("chooseLanguage")}
                  </p>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {locales.map((entry) => {
                      const active = entry === locale;
                      return (
                        <button
                          key={entry}
                          type="button"
                          onClick={() => chooseLocale(entry)}
                          aria-pressed={active}
                          className={`rounded-xl border py-2.5 text-[12.5px] font-bold transition-colors ${
                            active
                              ? "border-clay-deep bg-clay text-cream shadow-[0_10px_18px_-14px_rgba(124,24,16,0.9)]"
                              : "border-line bg-card/85 text-ink-soft hover:border-clay/40"
                          }`}
                        >
                          {localeNames[entry]}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn btn-primary mt-3.5 w-full"
                  >
                    {t("start")}
                  </button>

                  <StarDivider className="mt-5 text-clay/35" />
                  <p className="mt-3 text-center text-[11px] font-medium text-ink-faint">
                    {t("madeIn")}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="slots"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-1 flex-col pt-3"
              >
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="mb-4 inline-flex items-center gap-1 self-start text-[12px] font-bold text-ink-faint transition-colors hover:text-clay"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    className="rtl:-scale-x-100"
                    aria-hidden="true"
                  >
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                  {t("prev")}
                </button>

                <div className="flex items-center gap-3">
                  <LallaZohra
                    mood="thinking"
                    className="h-16 w-16 shrink-0"
                    showBackground={false}
                  />
                  <div>
                    <h2 className="text-[21px] leading-tight">{t("homeQuestion")}</h2>
                    <p className="mt-1 text-[12.5px] font-medium text-ink-soft">
                      {t("choosePreset")}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {SLOT_ORDER.map((slot, index) => (
                    <motion.button
                      key={slot}
                      type="button"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * index }}
                      onClick={() => finish(slot)}
                      className="group relative flex min-h-[112px] flex-col justify-between overflow-hidden rounded-2xl border border-line bg-card p-3.5 text-start shadow-[var(--shadow-e1)] transition-transform active:scale-[0.98]"
                    >
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-clay-tint text-clay">
                        <svg
                          width="19"
                          height="19"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          {SLOT_ICONS[slot]}
                        </svg>
                      </span>
                      <span>
                        <span className="block text-[16px] font-bold leading-tight">
                          {t(slot)}
                        </span>
                        <span className="mt-0.5 block text-[11px] font-medium text-ink-faint">
                          {t(`${slot}Hint`)}
                        </span>
                      </span>
                      <StarOrnament className="pointer-events-none absolute -end-3 -top-3 h-12 w-12 text-clay/12 transition-colors group-hover:text-clay/20" />
                    </motion.button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => finish()}
                  className="btn btn-ghost mt-3 w-full"
                >
                  {t("skip")}
                </button>

                <StarDivider className="mt-auto mb-3 mt-6 text-clay/35" />
                <p className="text-center text-[11px] font-medium text-ink-faint">
                  {t("madeIn")}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
