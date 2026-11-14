import type { Metadata } from "next";
import { FridgeScreen } from "@/components/FridgeScreen";
import type { Locale } from "@/i18n/dictionaries";

export const metadata: Metadata = { title: "الفرّيجو · Mon frigo · My fridge" };

export default async function FridgePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <FridgeScreen locale={locale as Locale} />;
}
