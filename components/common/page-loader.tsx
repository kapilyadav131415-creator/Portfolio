"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { siteConfig } from "@/config/site";

export function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const steps = [20, 45, 70, 90, 100];
    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 220);

    const timer = setTimeout(() => setLoading(false), 1400);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background"
          aria-label="Loading"
        >
          <div className="flex flex-col items-center gap-6 px-8">
            <div className="flex items-center gap-3">
              <span className="status-dot" />
              <span className="font-heading text-lg font-semibold text-foreground">
                {siteConfig.authorName}
              </span>
            </div>

            <div className="w-64 space-y-2">
              <div className="h-[3px] w-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.25, ease: "easeOut" as const }}
                />
              </div>
              <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                <span>booting up</span>
                <span className="tabular-nums">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
