import type { Metadata } from "next";
import { RecipesBrowser } from "@/components/RecipesBrowser";
import type { Locale } from "@/i18n/dictionaries";

export const metadata: Metadata = { title: "وصفات · Recettes · Recipes" };

export default async function RecipesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <RecipesBrowser locale={locale as Locale} />;
}
