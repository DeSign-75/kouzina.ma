"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useStore, shoppingCount } from "@/lib/store";
import { makeT, type Locale } from "@/i18n/dictionaries";

const items = [
  {
    key: "navHome",
    path: "",
    icon: (
      <path d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z" />
    ),
  },
  {
    key: "navRecipes",
    path: "/recipes",
    icon: (
      <>
        <rect x="4" y="4" width="7" height="7" rx="2" />
        <rect x="13" y="4" width="7" height="7" rx="2" />
        <rect x="4" y="13" width="7" height="7" rx="2" />
        <rect x="13" y="13" width="7" height="7" rx="2" />
      </>
    ),
  },
  {
    key: "navFridge",
    path: "/fridge",
    icon: (
      <>
        <rect x="6" y="3" width="12" height="18" rx="3" />
        <path d="M6 10h12M9 6v2M9 13v2" />
      </>
    ),
  },
  {
    key: "navPlanner",
    path: "/planner",
    icon: (
      <>
        <rect x="3.5" y="5" width="17" height="15" rx="3" />
        <path d="M8 3v4M16 3v4M3.5 10h17" />
      </>
    ),
  },
  {
    key: "navMe",
    path: "/settings",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.6" />
        <path d="M5 20c1.2-3.6 3.8-5.2 7-5.2s5.8 1.6 7 5.2" />
      </>
    ),
  },
];

export function BottomNav({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const t = makeT(locale);
  const { shopping } = useStore();
  const pending = shoppingCount(shopping);

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-cream/95 backdrop-blur-md"
      aria-label={t("navHome")}
    >
      <div className="mx-auto flex h-16 max-w-[720px] items-stretch justify-around px-1 safe-bottom">
        {items.map((item) => {
          const base = `/${locale}${item.path}`;
          const active =
            item.path === ""
              ? pathname === base || pathname === `/${locale}`
              : pathname.startsWith(base);
          return (
            <Link
              key={item.key}
              href={base}
              className={`relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-lg text-[11px] font-semibold transition-colors ${
                active ? "text-clay" : "text-ink-faint hover:text-ink-soft"
              }`}
              aria-current={active ? "page" : undefined}
            >
              {active && (
                <span className="absolute top-0 h-[2px] w-6 rounded-full bg-clay" />
              )}
              <span className="relative">
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={active ? 2 : 1.7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {item.icon}
                </svg>
                {item.path === "/planner" && pending > 0 && (
                  <span className="absolute -end-2 -top-1.5 grid h-[15px] min-w-[15px] place-items-center rounded-full bg-mint px-1 text-[9px] font-bold text-cream">
                    {pending}
                  </span>
                )}
              </span>
              <span className="truncate px-0.5">{t(item.key)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
