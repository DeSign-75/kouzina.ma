import type { Locale } from "@/i18n/dictionaries";
import { breakfastAndLegumes } from "./recipes-breakfast";
import { taginesAndCouscous } from "./recipes-tagines";
import { mainsAndQuick } from "./recipes-mains";
import { lunchboxAndSweets } from "./recipes-lunchbox";
import { familyClassics } from "./recipes-family";
import { INGREDIENT_MAP, STAPLES } from "./ingredients";
import type { CategoryId, MealSlot, Recipe, Tag } from "./types";
import { L, totalTime } from "./types";

export const RECIPES: Recipe[] = [
  ...breakfastAndLegumes,
  ...taginesAndCouscous,
  ...mainsAndQuick,
  ...lunchboxAndSweets,
  ...familyClassics,
];

export const RECIPE_MAP: Record<string, Recipe> = Object.fromEntries(
  RECIPES.map((r) => [r.slug, r])
);

export function getRecipe(slug: string): Recipe | undefined {
  return RECIPE_MAP[slug];
}

export interface Category {
  id: CategoryId;
  name: ReturnType<typeof L>;
  art: string;
}

export const CATEGORIES: Category[] = [
  { id: "breakfast", name: L("الفطور", "Petit-déj", "Breakfast"), art: "🥖" },
  { id: "legumes", name: L("بقوليات وحريرة", "Légumineuses", "Legumes & soups"), art: "🥣" },
  { id: "tagine", name: L("طواجن", "Tajines", "Tagines"), art: "🍲" },
  { id: "couscous", name: L("كسكس", "Couscous", "Couscous"), art: "🌾" },
  { id: "fish", name: L("حوت", "Poisson", "Fish"), art: "🐟" },
  { id: "chicken", name: L("دجاج", "Poulet", "Chicken"), art: "🍗" },
  { id: "meat", name: L("لحوم", "Viandes", "Meat"), art: "🥩" },
  { id: "vegetables", name: L("خضرة", "Légumes", "Vegetables"), art: "🥕" },
  { id: "salads", name: L("سلطات", "Salades", "Salads"), art: "🥗" },
  { id: "pasta_rice", name: L("مكرونة وريز", "Pâtes & riz", "Pasta & rice"), art: "🍝" },
  { id: "lunchbox", name: L("علب الغدا", "Lunchbox", "Lunchbox"), art: "🥡" },
  { id: "desserts", name: L("حلويات", "Pâtisseries", "Desserts"), art: "🍪" },
];

export const CATEGORY_MAP: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c])
);

export interface Collection {
  slug: string;
  name: ReturnType<typeof L>;
  description: ReturnType<typeof L>;
  tone: "clay" | "saffron" | "mint";
}

export const COLLECTIONS: Collection[] = [
  {
    slug: "friday",
    name: L("كسكس الجمعة", "Couscous du vendredi", "Friday couscous"),
    description: L("الطبق اللي كيجمع الدار", "Le plat qui rassemble", "The dish that gathers everyone"),
    tone: "saffron",
  },
  {
    slug: "budget",
    name: L("آخر الشهر", "Fin du mois", "End of month"),
    description: L("وصفات بـ30 درهم ولا أقل", "30 MAD ou moins", "30 MAD or less"),
    tone: "mint",
  },
  {
    slug: "ramadan",
    name: L("رمضان", "Ramadan", "Ramadan"),
    description: L("حريرة، شباكية، وسحور", "Harira, chebakia, suhoor", "Harira, chebakia, suhoor"),
    tone: "clay",
  },
  {
    slug: "lunchbox",
    name: L("علب المدرسة", "Lunchbox", "School lunchbox"),
    description: L("للدراري، كيدوز بلا سخانة", "Pour les enfants, sans réchauffer", "For kids, no reheating"),
    tone: "saffron",
  },
  {
    slug: "tangier",
    name: L("طنجة", "Tanger", "Tangier"),
    description: L("الحوت والشرموالة", "Poisson et chermoula", "Fish and chermoula"),
    tone: "mint",
  },
  {
    slug: "guests",
    name: L("للضياف", "Pour les invités", "For guests"),
    description: L("وصفات كتشرّف", "Des plats qui font honneur", "Dishes that impress"),
    tone: "clay",
  },
  {
    slug: "quick",
    name: L("20 دقيقة", "20 minutes", "20 minutes"),
    description: L("سريع بلا ما تخسر الطعم", "Rapide sans perdre le goût", "Fast without losing flavour"),
    tone: "mint",
  },
];

export const SLOT_CATEGORIES: Record<MealSlot, CategoryId[]> = {
  ftour: ["breakfast", "legumes", "desserts", "salads"],
  ghda: ["tagine", "couscous", "fish", "chicken", "meat", "vegetables", "pasta_rice", "legumes"],
  cha: ["legumes", "salads", "vegetables", "pasta_rice", "fish", "breakfast"],
  lunchbox: ["lunchbox", "desserts"],
};

export const SLOTS: MealSlot[] = ["ftour", "ghda", "cha", "lunchbox"];

export function recipesBySlot(slot: MealSlot): Recipe[] {
  return RECIPES.filter((r) => r.slots.includes(slot));
}

export function byCategory(category: CategoryId): Recipe[] {
  return RECIPES.filter((r) => r.category === category);
}

export function byTag(tag: Tag): Recipe[] {
  return RECIPES.filter((r) => r.tags.includes(tag));
}

export function byCollection(slug: string): Recipe[] {
  switch (slug) {
    case "friday":
      return byTag("friday");
    case "budget":
      return RECIPES.filter((r) => r.cost <= 30);
    case "ramadan":
      return byTag("ramadan");
    case "lunchbox":
      return RECIPES.filter((r) => r.lunchbox);
    case "tangier":
      return byTag("tangier");
    case "guests":
      return byTag("guests");
    case "quick":
      return RECIPES.filter((r) => totalTime(r) <= 20);
    default:
      return RECIPES;
  }
}

export interface Filters {
  slot?: MealSlot;
  category?: CategoryId;
  maxTime?: number;
  maxCost?: number;
  servings?: number;
  tags?: Tag[];
  query?: string;
}

export function filterRecipes(list: Recipe[], filters: Filters): Recipe[] {
  const q = filters.query?.trim().toLowerCase();
  return list.filter((r) => {
    if (filters.slot && !r.slots.includes(filters.slot)) return false;
    if (filters.category && r.category !== filters.category) return false;
    if (filters.maxTime && totalTime(r) > filters.maxTime) return false;
    if (filters.maxCost && r.cost > filters.maxCost) return false;
    if (filters.servings && r.servings + 2 < filters.servings) return false;
    if (filters.tags?.length && !filters.tags.every((t) => r.tags.includes(t))) return false;
    if (q) {
      const haystack = [r.name.ar, r.name.fr, r.name.en, r.description.ar, r.description.fr, r.description.en]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export function sortRecipes(list: Recipe[], sort: "match" | "fast" | "cheap"): Recipe[] {
  const copy = [...list];
  if (sort === "fast") return copy.sort((a, b) => totalTime(a) - totalTime(b));
  if (sort === "cheap") return copy.sort((a, b) => a.cost - b.cost);
  return copy.sort((a, b) => (b.rotd ? 1 : 0) - (a.rotd ? 1 : 0) || totalTime(a) - totalTime(b));
}

export function recipeOfDay(date = new Date()): Recipe {
  const pool = RECIPES.filter((r) => r.rotd);
  const day = Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000
  );
  return pool[day % pool.length] ?? RECIPES[0];
}

export function surpriseRecipe(exclude: string[] = []): Recipe {
  const pool = RECIPES.filter((r) => !exclude.includes(r.slug));
  return pool[Math.floor(Math.random() * pool.length)] ?? RECIPES[0];
}

/* ---------- fridge matching ---------- */

export interface MatchResult {
  recipe: Recipe;
  score: number;
  have: string[];
  missing: string[];
}

export function matchRecipes(selected: string[]): MatchResult[] {
  const have = new Set([...selected, ...STAPLES]);
  const results: MatchResult[] = [];

  for (const recipe of RECIPES) {
    const required = recipe.ingredients.filter(
      (i) => !i.optional && INGREDIENT_MAP[i.id]
    );
    if (!required.length) continue;

    const haveList: string[] = [];
    const missing: string[] = [];
    for (const i of required) {
      if (have.has(i.id)) haveList.push(i.id);
      else missing.push(i.id);
    }
    const score = haveList.length / required.length;
    if (score >= 0.6) results.push({ recipe, score, have: haveList, missing });
  }

  return results.sort((a, b) => b.score - a.score || a.missing.length - b.missing.length);
}

export function ingredientLabel(id: string, locale: Locale): string {
  return INGREDIENT_MAP[id]?.name[locale] ?? id;
}

export function localeFromParam(value: string): Locale {
  return value === "fr" || value === "en" ? value : "ar";
}
