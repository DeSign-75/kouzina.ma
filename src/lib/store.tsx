"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { RECIPE_MAP, getRecipe } from "@/data";
import { INGREDIENT_MAP, STAPLES } from "@/data/ingredients";
import type { Unit } from "@/data/types";
import { dateKey, planKey, startOfWeek, weekDays } from "@/lib/date";

export interface ShoppingItem {
  key: string;
  id: string;
  qty: number;
  unit: Unit;
  checked: boolean;
}

interface Stored {
  favorites: string[];
  seen: string[];
  plan: Record<string, string>;
  shopping: ShoppingItem[];
  textScale: number;
  household: number;
  cooked: Record<string, number>;
  lastCooked: { slug: string; step: number } | null;
}

const EMPTY: Stored = {
  favorites: [],
  seen: [],
  plan: {},
  shopping: [],
  textScale: 1,
  household: 4,
  cooked: {},
  lastCooked: null,
};

const STORAGE_KEY = "kouzina:v1";

interface ToastState {
  id: number;
  message: string;
  actionLabel?: string;
  action?: () => void;
}

interface StoreValue extends Stored {
  hydrated: boolean;
  isFavorite: (slug: string) => boolean;
  toggleFavorite: (slug: string) => boolean;
  markSeen: (slug: string) => void;
  setPlanSlot: (day: string, slot: string, slug: string | null) => void;
  removePlanEntry: (day: string, slot: string) => void;
  planFor: (day: string, slot: string) => string | undefined;
  autofillWeek: () => void;
  addRecipeToShopping: (slug: string, scale?: number) => number;
  addPlanToShopping: () => number;
  toggleShoppingItem: (key: string) => void;
  removeShoppingItem: (key: string) => void;
  clearChecked: () => void;
  clearShopping: () => void;
  addShoppingItem: (id: string, qty?: number, unit?: Unit) => void;
  setTextScale: (value: number) => void;
  setHousehold: (value: number) => void;
  setCookProgress: (slug: string, step: number) => void;
  clearCookProgress: (slug?: string) => void;
  clearAll: () => void;
  toast: (message: string, actionLabel?: string, action?: () => void) => void;
  toastState: ToastState | null;
  dismissToast: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

function load(): Stored {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<Stored>;
    return { ...EMPTY, ...parsed };
  } catch {
    return EMPTY;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<Stored>(EMPTY);
  const [hydrated, setHydrated] = useState(false);
  const [toastState, setToastState] = useState<ToastState | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const loaded = load();
    setState(loaded);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage full or unavailable */
    }
  }, [state, hydrated]);

  useEffect(() => {
    document.documentElement.style.setProperty("--text-scale", String(state.textScale));
  }, [state.textScale]);

  const toast = useCallback(
    (message: string, actionLabel?: string, action?: () => void) => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
      const id = Date.now();
      setToastState({ id, message, actionLabel, action });
      toastTimer.current = setTimeout(() => setToastState(null), 3200);
    },
    []
  );

  const dismissToast = useCallback(() => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastState(null);
  }, []);

  const isFavorite = useCallback(
    (slug: string) => state.favorites.includes(slug),
    [state.favorites]
  );

  const toggleFavorite = useCallback((slug: string) => {
    let added = false;
    setState((prev) => {
      const exists = prev.favorites.includes(slug);
      added = !exists;
      return {
        ...prev,
        favorites: exists
          ? prev.favorites.filter((s) => s !== slug)
          : [slug, ...prev.favorites],
      };
    });
    return added;
  }, []);

  const markSeen = useCallback((slug: string) => {
    setState((prev) =>
      prev.seen[0] === slug
        ? prev
        : {
            ...prev,
            seen: [slug, ...prev.seen.filter((s) => s !== slug)].slice(0, 30),
          }
    );
  }, []);

  const setPlanSlot = useCallback((day: string, slot: string, slug: string | null) => {
    setState((prev) => {
      const key = planKey(day, slot);
      const next = { ...prev.plan };
      if (!slug) delete next[key];
      else next[key] = slug;
      return { ...prev, plan: next };
    });
  }, []);

  const removePlanEntry = useCallback((day: string, slot: string) => {
    setState((prev) => {
      const next = { ...prev.plan };
      delete next[planKey(day, slot)];
      return { ...prev, plan: next };
    });
  }, []);

  const planFor = useCallback(
    (day: string, slot: string) => state.plan[planKey(day, slot)],
    [state.plan]
  );

  const autofillWeek = useCallback(() => {
    const start = startOfWeek(new Date());
    const days = weekDays(start);
    const pool = Object.values(RECIPE_MAP);
    const used = new Set<string>();
    const next: Record<string, string> = { ...state.plan };

    const pick = (predicate: (r: (typeof pool)[number]) => boolean, fallbackIndex = 0) => {
      const candidates = pool.filter((r) => predicate(r) && !used.has(r.slug));
      const chosen =
        candidates[(Math.floor(Math.random() * candidates.length) + fallbackIndex) %
          Math.max(candidates.length, 1)] ?? pool[0];
      used.add(chosen.slug);
      return chosen.slug;
    };

    const slots = ["ftour", "ghda", "cha"] as const;

    days.forEach((day, index) => {
      const key = dateKey(day);
      slots.forEach((slot) => {
        if (next[planKey(key, slot)]) return;
        let slug: string;
        if (slot === "ftour") {
          slug = pick((r) => r.slots.includes("ftour") && r.category === "breakfast", index);
        } else if (slot === "ghda") {
          slug =
            index === 4
              ? pick((r) => r.tags.includes("friday"), index)
              : pick((r) => r.slots.includes("ghda"), index);
        } else {
          slug = pick((r) => r.slots.includes("cha") && r.prep + r.cook <= 45, index);
        }
        next[planKey(key, slot)] = slug;
      });
      if (day.getDay() >= 1 && day.getDay() <= 5) {
        next[planKey(key, "lunchbox")] = pick((r) => r.lunchbox === true, index);
      }
    });

    setState((prev) => ({ ...prev, plan: next }));
  }, [state.plan]);

  const addRecipeToShopping = useCallback((slug: string, scale = 1) => {
    const recipe = getRecipe(slug);
    if (!recipe) return 0;
    const items = recipe.ingredients.filter((i) => !i.optional && !STAPLES.includes(i.id));
    const round = (value: number) => Math.round(value * 10) / 10;
    setState((prev) => {
      const next = [...prev.shopping];
      for (const item of items) {
        const qty = round(item.qty * scale);
        const existing = next.find((s) => s.id === item.id && s.unit === item.unit);
        if (existing) existing.qty = round(existing.qty + qty);
        else
          next.push({
            key: `${item.id}:${item.unit}`,
            id: item.id,
            qty,
            unit: item.unit,
            checked: false,
          });
      }
      return { ...prev, shopping: next };
    });
    return items.length;
  }, []);

  const addPlanToShopping = useCallback(() => {
    const start = startOfWeek(new Date());
    const days = weekDays(start).map(dateKey);
    const slugs = Object.entries(state.plan)
      .filter(([key]) => days.includes(key.split(":")[0]))
      .map(([, slug]) => slug);
    const unique = Array.from(new Set(slugs));

    const round = (value: number) => Math.round(value * 10) / 10;

    setState((prev) => {
      const next = [...prev.shopping];
      for (const slug of unique) {
        const recipe = getRecipe(slug);
        if (!recipe) continue;
        const scale = Math.max(0.5, Math.min(3, prev.household / recipe.servings));
        for (const item of recipe.ingredients.filter(
          (i) => !i.optional && !STAPLES.includes(i.id)
        )) {
          const qty = round(item.qty * scale);
          const existing = next.find((s) => s.id === item.id && s.unit === item.unit);
          if (existing) existing.qty = round(existing.qty + qty);
          else
            next.push({
              key: `${item.id}:${item.unit}`,
              id: item.id,
              qty,
              unit: item.unit,
              checked: false,
            });
        }
      }
      return { ...prev, shopping: next };
    });
    return unique.length;
  }, [state.plan]);

  const toggleShoppingItem = useCallback((key: string) => {
    setState((prev) => ({
      ...prev,
      shopping: prev.shopping.map((s) =>
        s.key === key ? { ...s, checked: !s.checked } : s
      ),
    }));
  }, []);

  const removeShoppingItem = useCallback((key: string) => {
    setState((prev) => ({ ...prev, shopping: prev.shopping.filter((s) => s.key !== key) }));
  }, []);

  const clearChecked = useCallback(() => {
    setState((prev) => ({ ...prev, shopping: prev.shopping.filter((s) => !s.checked) }));
  }, []);

  const clearShopping = useCallback(() => {
    setState((prev) => ({ ...prev, shopping: [] }));
  }, []);

  const addShoppingItem = useCallback((id: string, qty = 1, unit: Unit = "piece") => {
    setState((prev) => {
      const next = [...prev.shopping];
      const existing = next.find((s) => s.id === id && s.unit === unit);
      if (existing) existing.qty += qty;
      else next.push({ key: `${id}:${unit}`, id, qty, unit, checked: false });
      return { ...prev, shopping: next };
    });
  }, []);

  const setTextScale = useCallback((value: number) => {
    setState((prev) => ({ ...prev, textScale: value }));
  }, []);

  const setHousehold = useCallback((value: number) => {
    setState((prev) => ({ ...prev, household: value }));
  }, []);

  const setCookProgress = useCallback((slug: string, step: number) => {
    setState((prev) => ({
      ...prev,
      lastCooked: { slug, step },
      cooked: { ...prev.cooked, [slug]: step },
    }));
  }, []);

  const clearCookProgress = useCallback((slug?: string) => {
    setState((prev) => {
      if (!slug) return { ...prev, lastCooked: null };
      const cooked = { ...prev.cooked };
      delete cooked[slug];
      return {
        ...prev,
        cooked,
        lastCooked: prev.lastCooked?.slug === slug ? null : prev.lastCooked,
      };
    });
  }, []);

  const clearAll = useCallback(() => {
    setState((prev) => ({
      ...EMPTY,
      textScale: prev.textScale,
      household: prev.household,
    }));
  }, []);

  const value = useMemo<StoreValue>(
    () => ({
      ...state,
      hydrated,
      isFavorite,
      toggleFavorite,
      markSeen,
      setPlanSlot,
      removePlanEntry,
      planFor,
      autofillWeek,
      addRecipeToShopping,
      addPlanToShopping,
      toggleShoppingItem,
      removeShoppingItem,
      clearChecked,
      clearShopping,
      addShoppingItem,
      setTextScale,
      setHousehold,
      setCookProgress,
      clearCookProgress,
      clearAll,
      toast,
      toastState,
      dismissToast,
    }),
    [
      state,
      hydrated,
      isFavorite,
      toggleFavorite,
      markSeen,
      setPlanSlot,
      removePlanEntry,
      planFor,
      autofillWeek,
      addRecipeToShopping,
      addPlanToShopping,
      toggleShoppingItem,
      removeShoppingItem,
      clearChecked,
      clearShopping,
      addShoppingItem,
      setTextScale,
      setHousehold,
      setCookProgress,
      clearCookProgress,
      clearAll,
      toast,
      toastState,
      dismissToast,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export function shoppingCount(items: ShoppingItem[]): number {
  return items.filter((i) => !i.checked).length;
}

export function shoppingTotal(items: ShoppingItem[]): number {
  return items.reduce((sum, item) => {
    const price = priceFor(item.id);
    return sum + price * item.qty;
  }, 0);
}

const PRICE_HINTS: Record<string, number> = {
  tomato: 2.4,
  onion: 1.2,
  potato: 1.5,
  carrot: 1,
  zucchini: 2,
  eggplant: 2.5,
  pepper: 1.8,
  lemon: 1.5,
  coriander: 2,
  parsley: 2,
  garlic: 0.4,
  olives: 25,
  chicken: 42,
  beef: 95,
  lamb: 120,
  kefta: 90,
  sardine: 25,
  white_fish: 65,
  shrimp: 90,
  tuna: 12,
  eggs: 1.6,
  chickpeas: 18,
  lentils: 15,
  white_beans: 16,
  broad_beans: 16,
  milk: 8,
  butter: 30,
  cheese: 40,
  yogurt: 3,
  flour: 8,
  semolina: 10,
  rice: 14,
  pasta: 8,
  bread: 1.2,
  vermicelli: 8,
  tomato_paste: 6,
  honey: 60,
  sugar: 10,
  tea: 25,
  mint: 2,
  almonds: 120,
  raisins: 40,
  sesame: 30,
  orange_blossom: 15,
  preserved_lemon: 3,
  pastry: 15,
  cumin: 10,
  paprika: 12,
  turmeric: 10,
  cinnamon: 12,
  saffron: 30,
};

/** rough per-unit price used for the estimated shopping total */
export function priceFor(id: string): number {
  return PRICE_HINTS[id] ?? 5;
}

export function ingredientDisplayName(id: string, locale: "ar" | "fr" | "en"): string {
  return INGREDIENT_MAP[id]?.name[locale] ?? id;
}
