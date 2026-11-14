import type { Metadata } from "next";
import { OnboardingScreen } from "@/components/OnboardingScreen";
import type { Locale } from "@/i18n/dictionaries";

export const metadata: Metadata = { title: "كوزينة — Bienvenue" };

export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <OnboardingScreen locale={locale as Locale} />;
}
