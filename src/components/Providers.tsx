"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { StoreProvider, useStore } from "@/lib/store";

function ToastHost() {
  const { toastState, dismissToast } = useStore();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex justify-center px-4">
      <AnimatePresence>
        {toastState && (
          <motion.div
            key={toastState.id}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
            className="pointer-events-auto flex max-w-md items-center gap-3 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-cream shadow-[0_16px_40px_rgba(42,35,32,0.28)]"
            role="status"
          >
            <span>{toastState.message}</span>
            {toastState.actionLabel && (
              <button
                type="button"
                onClick={() => {
                  toastState.action?.();
                  dismissToast();
                }}
                className="rounded-md px-1.5 py-0.5 text-saffron underline-offset-4 hover:underline"
              >
                {toastState.actionLabel}
              </button>
            )}
            <button
              type="button"
              aria-label="close"
              onClick={dismissToast}
              className="ms-1 text-cream/60 hover:text-cream"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  useServiceWorker();

  return (
    <StoreProvider>
      {children}
      <ToastHost />
    </StoreProvider>
  );
}

function useServiceWorker() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    const timer = window.setTimeout(() => {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }, 1200);
    return () => window.clearTimeout(timer);
  }, []);
}
