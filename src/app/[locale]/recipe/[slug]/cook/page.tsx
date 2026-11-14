import { notFound } from "next/navigation";
import { CookMode } from "@/components/CookMode";
import { RECIPES, getRecipe } from "@/data";
import type { Locale } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return RECIPES.map((recipe) => ({ slug: recipe.slug }));
}

export default async function CookPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!getRecipe(slug)) notFound();
  return <CookMode locale={locale as Locale} slug={slug} />;
}
