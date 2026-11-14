import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RecipeDetail } from "@/components/RecipeDetail";
import { RECIPES, getRecipe } from "@/data";
import type { Locale } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return RECIPES.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const recipe = getRecipe(slug);
  if (!recipe) return { title: "KOUZINA" };
  const key = (locale === "fr" || locale === "en" ? locale : "ar") as Locale;
  return {
    title: `${recipe.name[key]} · KOUZINA`,
    description: recipe.description[key],
  };
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!getRecipe(slug)) notFound();
  return <RecipeDetail locale={locale as Locale} slug={slug} />;
}
