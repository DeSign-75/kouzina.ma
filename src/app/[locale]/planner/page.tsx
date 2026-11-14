import type { Metadata } from "next";
import { PlannerScreen } from "@/components/PlannerScreen";
import type { Locale } from "@/i18n/dictionaries";

export const metadata: Metadata = { title: "البرنامج · Planning · Planner" };

export default async function PlannerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <PlannerScreen locale={locale as Locale} />;
}
