"use client";

import { motion } from "motion/react";
import { useStore } from "@/lib/store";

export function FavoriteButton({
  slug,
  size = 20,
  variant = "overlay",
  label,
  savedLabel,
  removedLabel,
}: {
  slug: string;
  size?: number;
  variant?: "overlay" | "plain";
  label: string;
  savedLabel?: string;
  removedLabel?: string;
}) {
  const { isFavorite, toggleFavorite, toast } = useStore();
  const active = isFavorite(slug);

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.86 }}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        const added = toggleFavorite(slug);
        const message = added ? savedLabel : removedLabel;
        if (message) toast(message);
      }}
      aria-pressed={active}
      aria-label={label}
      className={
        variant === "overlay"
          ? `grid h-10 w-10 place-items-center rounded-full border backdrop-blur-md transition-colors ${
              active
                ? "border-clay/30 bg-card text-clay"
                : "border-white/60 bg-card/90 text-ink-soft hover:text-clay"
            }`
          : `icon-btn ${active ? "text-clay" : "text-ink-soft"}`
      }
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={active ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.8 8.6c0 5.1-8.8 10.4-8.8 10.4S3.2 13.7 3.2 8.6a4.7 4.7 0 0 1 8.8-2.3 4.7 4.7 0 0 1 8.8 2.3Z" />
      </svg>
    </motion.button>
  );
}
