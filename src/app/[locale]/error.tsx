"use client";

import { useEffect } from "react";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="page flex min-h-[70dvh] flex-col items-center justify-center text-center">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-clay-tint text-[24px]">
        🍲
      </span>
      <h1 className="mt-4 text-[22px]">كاين مشكل صغير</h1>
      <p className="mt-1.5 max-w-[300px] text-[13.5px] text-ink-soft">
        Something went wrong · Une erreur est survenue
      </p>
      <button type="button" onClick={reset} className="btn btn-primary btn-sm mt-5 px-5">
        عاود جرّب
      </button>
    </div>
  );
}
