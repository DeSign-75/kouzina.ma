import { StarOrnament } from "./Moroccan";

export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none">
      <path
        d="M24 7c-2 2.4-2 4.6 0 6.6M29 9c-1.6 1.9-1.6 3.7 0 5.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="24" cy="6.4" r="2.2" fill="currentColor" />
      <path
        d="M24 13.5c9.4 0 17 7.2 17 16.1H7c0-8.9 7.6-16.1 17-16.1Z"
        fill="currentColor"
      />
      <path d="M5 33.6h38" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path
        d="M10.5 38.6h27"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}

export function BrandLockup({
  locale,
  compact = false,
}: {
  locale: string;
  compact?: boolean;
}) {
  const primary = locale === "ar" ? "كوزينة" : "KOUZINA";
  const secondary = locale === "ar" ? "KOUZINA" : "كوزينة";

  return (
    <span className="flex items-center gap-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/kouzina-mark.webp"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="h-11 w-11 shrink-0 select-none rounded-full shadow-[0_8px_16px_-10px_rgba(124,24,16,0.85)]"
      />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-[17px] font-bold text-ink">{primary}</span>
          <span
            className={`mt-1 text-[9.5px] font-bold text-clay ${
              locale === "ar" ? "uppercase tracking-[0.24em]" : "tracking-normal"
            }`}
          >
            {secondary}
          </span>
        </span>
      )}
    </span>
  );
}

export function WordmarkLockup({
  locale,
  kicker,
  className = "",
}: {
  locale: string;
  kicker?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/kouzina-wordmark.webp"
        alt={locale === "ar" ? "كوزينة" : "KOUZINA"}
        draggable={false}
        className="h-auto w-[214px] select-none"
      />
      {kicker && (
        <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-clay/20 bg-card/85 px-3 py-1 text-[11px] font-semibold text-clay-deep">
          <StarOrnament className="h-2.5 w-2.5 text-clay/55" />
          {kicker}
          <StarOrnament className="h-2.5 w-2.5 text-clay/55" />
        </span>
      )}
    </div>
  );
}
