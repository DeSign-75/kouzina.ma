import type { Metadata } from "next";
import { FavoritesScreen } from "@/components/FavoritesScreen";
import type { Locale } from "@/i18n/dictionaries";

export const metadata: Metadata = { title: "المفضلين · Favoris · Favorites" };

export default async function FavoritesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <FavoritesScreen locale={locale as Locale} />;
}
