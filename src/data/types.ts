import type { Locale } from "@/i18n/dictionaries";

export type Localized = Record<Locale, string>;

export const L = (ar: string, fr: string, en: string): Localized => ({
  ar,
  fr,
  en,
});

export type Unit =
  | "g"
  | "kg"
  | "ml"
  | "l"
  | "piece"
  | "tbsp"
  | "tsp"
  | "bunch"
  | "glass"
  | "pinch";

export type MealSlot = "ftour" | "ghda" | "cha" | "lunchbox";

export type CategoryId =
  | "breakfast"
  | "legumes"
  | "tagine"
  | "couscous"
  | "salads"
  | "meat"
  | "chicken"
  | "fish"
  | "vegetables"
  | "pasta_rice"
  | "lunchbox"
  | "desserts";

export type Tag =
  | "quick"
  | "budget"
  | "traditional"
  | "tangier"
  | "ramadan"
  | "friday"
  | "kid"
  | "vegetarian"
  | "fish"
  | "guests";

export type IngredientCategory = "veg" | "protein" | "dairy" | "pantry" | "spice";

export interface Ingredient {
  id: string;
  name: Localized;
  category: IngredientCategory;
  icon: string;
  staple?: boolean;
  common?: boolean;
  /** approximate weight of one piece in grams, used for shopping aggregation */
  pieceGrams?: number;
}

export interface RecipeIngredient {
  id: string;
  qty: number;
  unit: Unit;
  optional?: boolean;
}

export interface Recipe {
  slug: string;
  name: Localized;
  description: Localized;
  category: CategoryId;
  tags: Tag[];
  slots: MealSlot[];
  art: ArtKey;
  prep: number;
  cook: number;
  servings: number;
  cost: number;
  difficulty: 1 | 2 | 3;
  spice: 0 | 1 | 2 | 3;
  ingredients: RecipeIngredient[];
  steps: Localized[];
  equipment: Localized[];
  tips: Localized[];
  lunchbox?: boolean;
  rotd?: boolean;
  isNew?: boolean;
  region?: "tangier" | "north" | "national";
}

export type ArtKey =
  | "msemen"
  | "harcha"
  | "baghrir"
  | "sfenj"
  | "eggs"
  | "tea"
  | "legumes"
  | "soup"
  | "tagine"
  | "couscous"
  | "salad"
  | "chicken"
  | "fish"
  | "veg"
  | "pasta"
  | "rice"
  | "lunchbox"
  | "cake"
  | "cookie"
  | "shrimp"
  | "sandwich";

export const unitLabels: Record<Unit, Localized> = {
  g: L("غ", "g", "g"),
  kg: L("كغ", "kg", "kg"),
  ml: L("مل", "ml", "ml"),
  l: L("ل", "L", "L"),
  piece: L("حبة", "pièce", "pc"),
  tbsp: L("م.ك", "c.à.s", "tbsp"),
  tsp: L("م.ص", "c.à.c", "tsp"),
  bunch: L("حزمة", "botte", "bunch"),
  glass: L("كأس", "verre", "glass"),
  pinch: L("قرصة", "pincée", "pinch"),
};

export function formatQty(qty: number, unit: Unit, locale: Locale): string {
  const rounded = Math.round(qty * 10) / 10;
  const label = unitLabels[unit][locale];
  if (unit === "piece") return `${rounded} ${label}`;
  return `${rounded}${unit === "g" || unit === "ml" ? " " : " "}${label}`;
}

export function totalTime(r: Recipe): number {
  return r.prep + r.cook;
}

export function costPerServing(r: Recipe): number {
  return Math.round((r.cost / r.servings) * 10) / 10;
}
