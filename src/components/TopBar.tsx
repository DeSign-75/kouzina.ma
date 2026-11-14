"use client";

import { useRouter } from "next/navigation";

export function TopBar({
  title,
  subtitle,
  fallbackHref,
  right,
}: {
  title: string;
  subtitle?: string;
  fallbackHref: string;
  right?: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[720px] items-center gap-1 px-2">
        <button
          type="button"
          onClick={() => {
            if (window.history.length > 1) router.back();
            else router.push(fallbackHref);
          }}
          className="icon-btn"
          aria-label="back"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[17px] font-bold leading-tight">{title}</h1>
          {subtitle && (
            <p className="truncate text-[12px] font-medium text-ink-faint">{subtitle}</p>
          )}
        </div>
        {right}
        <div className="w-1" />
      </div>
    </header>
  );
}
