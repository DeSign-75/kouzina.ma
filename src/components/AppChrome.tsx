"use client";

import { usePathname } from "next/navigation";
import { BottomNav } from "./BottomNav";
import type { Locale } from "@/i18n/dictionaries";

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const locale = (segments[0] ?? "ar") as Locale;
  const hideNav =
    pathname.includes("/onboarding") || pathname.endsWith("/cook");

  return (
    <>
      <main className={hideNav ? "" : "pb-20"}>{children}</main>
      {!hideNav && <BottomNav locale={locale} />}
    </>
  );
}
