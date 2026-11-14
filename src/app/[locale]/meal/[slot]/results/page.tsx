import { notFound } from "next/navigation";
import { ResultsScreen } from "@/components/ResultsScreen";
import { SLOTS } from "@/data";
import type { MealSlot } from "@/data/types";
import type { Locale } from "@/i18n/dictionaries";

const num = (value: string | string[] | undefined): number | undefined => {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const str = (value: string | string[] | undefined): string | undefined => {
  if (Array.isArray(value)) return value[0];
  return value || undefined;
};

export default async function ResultsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slot: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale, slot } = await params;
  const query = await searchParams;
  if (!SLOTS.includes(slot as MealSlot)) notFound();

  return (
    <ResultsScreen
      locale={locale as Locale}
      slot={slot as MealSlot}
      initial={{
        time: num(query.time),
        cost: num(query.cost),
        servings: num(query.servings),
        cat: str(query.cat),
        sort: str(query.sort),
      }}
    />
  );
}
