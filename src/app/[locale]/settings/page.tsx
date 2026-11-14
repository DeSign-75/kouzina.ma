import type { Metadata } from "next";
import { SettingsScreen } from "@/components/SettingsScreen";
import type { Locale } from "@/i18n/dictionaries";

export const metadata: Metadata = { title: "الإعدادات · Réglages · Settings" };

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <SettingsScreen locale={locale as Locale} />;
}
