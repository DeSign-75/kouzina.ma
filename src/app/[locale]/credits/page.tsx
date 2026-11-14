import type { Metadata } from "next";
import { CreditsScreen } from "@/components/CreditsScreen";
import type { Locale } from "@/i18n/dictionaries";
import { locales } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "حقوق الصور · Crédits photo · Photo credits",
};

export default async function CreditsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <CreditsScreen locale={locale as Locale} />;
}
