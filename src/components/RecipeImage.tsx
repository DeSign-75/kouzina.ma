import { DishArt } from "./DishArt";
import { PHOTOS } from "@/data/photos";
import type { ArtKey } from "@/data/types";

/**
 * Shows a real dish photograph when one exists in /public/photos,
 * and the hand-drawn illustration otherwise. Both fill their container.
 */
export function RecipeImage({
  slug,
  art,
  alt = "",
  className = "",
  eager = false,
}: {
  slug: string;
  art: ArtKey;
  alt?: string;
  className?: string;
  eager?: boolean;
}) {
  const src = PHOTOS[slug];

  if (!src) {
    return <DishArt art={art} className="h-full w-full" />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={`h-full w-full select-none object-cover ${className}`}
    />
  );
}
