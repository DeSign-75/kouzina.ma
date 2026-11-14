import { notFound } from "next/navigation";
import { MealExplorer } from "@/components/MealExplorer";
import { SLOTS } from "@/data";
import type { MealSlot } from "@/data/types";
import type { Locale } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return SLOTS.map((slot) => ({ slot }));
}

export default async function MealPage({
  params,
}: {
  params: Promise<{ locale: string; slot: string }>;
}) {
  const { locale, slot } = await params;
  if (!SLOTS.includes(slot as MealSlot)) notFound();
  return <MealExplorer locale={locale as Locale} slot={slot as MealSlot} />;
}
