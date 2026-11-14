import type { Locale } from "@/i18n/dictionaries";
import type { Ingredient } from "./types";
import { L } from "./types";

export const INGREDIENTS: Ingredient[] = [
  // vegetables
  { id: "tomato", name: L("طماطم", "Tomates", "Tomatoes"), category: "veg", icon: "🍅", common: true, pieceGrams: 120 },
  { id: "onion", name: L("بصلة", "Oignons", "Onion"), category: "veg", icon: "🧅", common: true, staple: true, pieceGrams: 120 },
  { id: "potato", name: L("بطاطا", "Pommes de terre", "Potatoes"), category: "veg", icon: "🥔", common: true, pieceGrams: 180 },
  { id: "carrot", name: L("خيزو", "Carottes", "Carrots"), category: "veg", icon: "🥕", common: true, pieceGrams: 100 },
  { id: "zucchini", name: L("قرعة", "Courgettes", "Zucchini"), category: "veg", icon: "🥒", common: true, pieceGrams: 200 },
  { id: "eggplant", name: L("بينجان", "Aubergines", "Eggplant"), category: "veg", icon: "🍆", common: true, pieceGrams: 250 },
  { id: "pepper", name: L("فلفلة", "Poivrons", "Bell pepper"), category: "veg", icon: "🫑", common: true, pieceGrams: 150 },
  { id: "green_beans", name: L("لوبيا خضراء", "Haricots verts", "Green beans"), category: "veg", icon: "🫛" },
  { id: "cauliflower", name: L("شوافة", "Chou-fleur", "Cauliflower"), category: "veg", icon: "🥦" },
  { id: "lemon", name: L("ليمون", "Citron", "Lemon"), category: "veg", icon: "🍋", common: true, pieceGrams: 100 },
  { id: "coriander", name: L("قصبر", "Coriandre", "Coriander"), category: "veg", icon: "🌿", common: true },
  { id: "parsley", name: L("معدنوس", "Persil", "Parsley"), category: "veg", icon: "🌿" },
  { id: "garlic", name: L("ثوم", "Ail", "Garlic"), category: "veg", icon: "🧄", common: true, staple: true, pieceGrams: 5 },
  { id: "olives", name: L("زيتون", "Olives", "Olives"), category: "veg", icon: "🫒", common: true },
  { id: "turnip", name: L("لفت", "Navets", "Turnip"), category: "veg", icon: "🥬", pieceGrams: 150 },
  { id: "pumpkin", name: L("قرع أحمر", "Courge", "Pumpkin"), category: "veg", icon: "🎃", pieceGrams: 400 },
  { id: "cabbage", name: L("كرنب", "Chou", "Cabbage"), category: "veg", icon: "🥬", pieceGrams: 600 },
  { id: "peas", name: L("جلبانة", "Petits pois", "Green peas"), category: "veg", icon: "🫛", common: true },

  // proteins
  { id: "chicken", name: L("دجاج", "Poulet", "Chicken"), category: "protein", icon: "🍗", common: true },
  { id: "beef", name: L("لحم بقري", "Bœuf", "Beef"), category: "protein", icon: "🥩" },
  { id: "lamb", name: L("لحم غنمي", "Agneau", "Lamb"), category: "protein", icon: "🍖" },
  { id: "kefta", name: L("كفتة", "Kefta", "Minced meat"), category: "protein", icon: "🥩", common: true },
  { id: "sardine", name: L("سردين", "Sardines", "Sardines"), category: "protein", icon: "🐟", common: true },
  { id: "white_fish", name: L("حوت أبيض", "Poisson blanc", "White fish"), category: "protein", icon: "🐠" },
  { id: "shrimp", name: L("قمرون", "Crevettes", "Shrimp"), category: "protein", icon: "🍤" },
  { id: "tuna", name: L("تونة", "Thon", "Tuna"), category: "protein", icon: "🥫", common: true },
  { id: "eggs", name: L("بيض", "Œufs", "Eggs"), category: "dairy", icon: "🥚", common: true },
  { id: "chickpeas", name: L("حمص", "Pois chiches", "Chickpeas"), category: "pantry", icon: "🫘", common: true },
  { id: "lentils", name: L("عدس", "Lentilles", "Lentils"), category: "pantry", icon: "🫘", common: true },
  { id: "white_beans", name: L("لوبيا", "Haricots blancs", "White beans"), category: "pantry", icon: "🫘", common: true },
  { id: "broad_beans", name: L("فول", "Fèves", "Broad beans"), category: "pantry", icon: "🫘", common: true },

  // dairy
  { id: "milk", name: L("حليب", "Lait", "Milk"), category: "dairy", icon: "🥛", common: true },
  { id: "butter", name: L("زبدة", "Beurre", "Butter"), category: "dairy", icon: "🧈", common: true },
  { id: "cheese", name: L("جبن", "Fromage", "Cheese"), category: "dairy", icon: "🧀", common: true },
  { id: "yogurt", name: L("ياغورت", "Yaourt", "Yogurt"), category: "dairy", icon: "🥣", common: true },

  // pantry & grains
  { id: "flour", name: L("طحين", "Farine", "Flour"), category: "pantry", icon: "🌾", staple: true, common: true },
  { id: "yeast", name: L("خميرة", "Levure", "Yeast"), category: "pantry", icon: "🫙", common: true },
  { id: "semolina", name: L("سميدة", "Semoule", "Semolina"), category: "pantry", icon: "🌾", common: true },
  { id: "rice", name: L("ريز", "Riz", "Rice"), category: "pantry", icon: "🍚", common: true },
  { id: "pasta", name: L("مكرونة", "Pâtes", "Pasta"), category: "pantry", icon: "🍝", common: true },
  { id: "bread", name: L("خبز", "Pain", "Bread"), category: "pantry", icon: "🍞", common: true },
  { id: "vermicelli", name: L("شعرية", "Vermicelles", "Vermicelli"), category: "pantry", icon: "🍜" },
  { id: "tomato_paste", name: L("معجون طماطم", "Concentré de tomate", "Tomato paste"), category: "pantry", icon: "🥫", common: true },
  { id: "honey", name: L("عسل", "Miel", "Honey"), category: "pantry", icon: "🍯", common: true },
  { id: "sugar", name: L("سكر", "Sucre", "Sugar"), category: "pantry", icon: "🧂", common: true },
  { id: "tea", name: L("أتاي", "Thé vert", "Green tea"), category: "pantry", icon: "🍵", common: true },
  { id: "mint", name: L("نعنع", "Menthe", "Mint"), category: "pantry", icon: "🌱", common: true },
  { id: "almonds", name: L("لوز", "Amandes", "Almonds"), category: "pantry", icon: "🌰" },
  { id: "raisins", name: L("زبيب", "Raisins secs", "Raisins"), category: "pantry", icon: "🍇" },
  { id: "prunes", name: L("قراصيا", "Pruneaux", "Prunes"), category: "pantry", icon: "🟤" },
  { id: "sesame", name: L("جلجلان", "Sésame", "Sesame"), category: "pantry", icon: "🌰" },
  { id: "orange_blossom", name: L("ماء الزهر", "Eau de fleur d'oranger", "Orange blossom water"), category: "pantry", icon: "🌸" },
  { id: "preserved_lemon", name: L("ليمون مصيّر", "Citron confit", "Preserved lemon"), category: "pantry", icon: "🍋", common: true },
  { id: "pastry", name: L("ورقة بسطيلة", "Feuilles de brick", "Brick pastry"), category: "pantry", icon: "🥟" },

  // spices
  { id: "cumin", name: L("كمون", "Cumin", "Cumin"), category: "spice", icon: "🌿", staple: true, common: true },
  { id: "paprika", name: L("فلفلة حمراء", "Paprika", "Paprika"), category: "spice", icon: "🌶️", staple: true, common: true },
  { id: "turmeric", name: L("خرقوم", "Curcuma", "Turmeric"), category: "spice", icon: "🟡", common: true },
  { id: "cinnamon", name: L("قرفة", "Cannelle", "Cinnamon"), category: "spice", icon: "🪵", common: true },
  { id: "saffron", name: L("زعفران", "Safran", "Saffron"), category: "spice", icon: "🌾" },
  { id: "salt", name: L("ملح", "Sel", "Salt"), category: "spice", icon: "🧂", staple: true },
  { id: "pepper", name: L("فلفل أسود", "Poivre", "Black pepper"), category: "spice", icon: "⚫", staple: true },
  { id: "oil", name: L("زيت", "Huile", "Oil"), category: "spice", icon: "🫒", staple: true, common: true },
  { id: "olive_oil", name: L("زيت زيتون", "Huile d'olive", "Olive oil"), category: "spice", icon: "🫒", staple: true, common: true },
  { id: "water", name: L("ماء", "Eau", "Water"), category: "spice", icon: "💧", staple: true },
];

export const INGREDIENT_MAP: Record<string, Ingredient> = Object.fromEntries(
  INGREDIENTS.map((i) => [i.id, i])
);

export const STAPLES = INGREDIENTS.filter((i) => i.staple).map((i) => i.id);

export function ingredientName(id: string, locale: Locale): string {
  const ing = INGREDIENT_MAP[id];
  if (!ing) return id;
  return ing.name[locale];
}
