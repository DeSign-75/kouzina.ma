import Link from "next/link";
import { LallaZohra } from "./Mascot";
import { StarOrnament } from "./Moroccan";

export function EmptyState({
  title,
  body,
  actionLabel,
  actionHref,
  mood = "thinking",
}: {
  title: string;
  body: string;
  actionLabel?: string;
  actionHref?: string;
  mood?: "thinking" | "sleepy" | "sorry" | "welcome";
}) {
  return (
    <div className="flex flex-col items-center px-6 py-10 text-center">
      <LallaZohra mood={mood} className="h-36 w-36" />
      <StarOrnament className="mt-4 h-3.5 w-3.5 text-clay/45" />
      <h2 className="mt-2 text-[19px] font-bold">{title}</h2>
      <p className="mt-1.5 max-w-[300px] text-[13.5px] leading-relaxed text-ink-soft">{body}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref} className="btn btn-primary btn-sm mt-4 px-5">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export function SectionHeading({
  title,
  actionLabel,
  actionHref,
}: {
  title: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="flex items-baseline justify-between">
      <h2 className="text-[15px] font-bold">{title}</h2>
      {actionLabel && actionHref && (
        <Link href={actionHref} className="text-[12px] font-bold text-clay hover:underline">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export function StatRow({
  time,
  cost,
  servings,
  labels,
}: {
  time: number;
  cost: number;
  servings: number;
  labels: { min: string; mad: string; persons: string };
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <span className="pill">
        {time} {labels.min}
      </span>
      <span className="pill pill-mint">
        {cost} {labels.mad}
      </span>
      <span className="pill">
        {servings} {labels.persons}
      </span>
    </div>
  );
}
