import type { Metadata } from "next";
import { HomeScreen } from "@/components/HomeScreen";
import { locales, type Locale } from "@/i18n/dictionaries";

export const metadata: Metadata = {
  title: "كوزينة — شنو نطيب اليوم؟",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <HomeScreen locale={locale as Locale} />;
}
