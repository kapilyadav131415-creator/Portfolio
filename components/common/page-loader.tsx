"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { siteConfig } from "@/config/site";

export function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar
    const steps = [20, 45, 70, 90, 100];
    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 250);

    // Hide loader after progress finishes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1600);

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
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background"
          aria-label="Loading"
        >
          {/* Background blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-violet-500/10 blur-[100px] animate-pulse" />
          </div>

          <div className="relative flex flex-col items-center gap-8 px-8">
            {/* Spinning ring + initials */}
            <div className="relative flex items-center justify-center">
              {/* Outer spinning gradient ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute w-24 h-24 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #10b981, #3b82f6)",
                  padding: "2px",
                }}
              >
                <div className="w-full h-full rounded-full bg-background" />
              </motion.div>

              {/* Inner pulse ring */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.15, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/30 to-violet-500/30"
              />

              {/* Center initials */}
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative z-10 font-heading text-2xl font-bold bg-gradient-to-br from-blue-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent"
              >
                {siteConfig.authorName.charAt(0)}
              </motion.span>
            </div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center space-y-1"
            >
              <p className="font-heading text-2xl font-bold text-foreground">
                {siteConfig.authorName}
              </p>
              <p className="text-sm text-muted-foreground">
                Full Stack Developer &amp; Freelancer
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-56 space-y-2"
            >
              <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" as const }}
                />
              </div>
              <motion.p
                key={progress}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-muted-foreground text-right tabular-nums"
              >
                {progress}%
              </motion.p>
            </motion.div>

            {/* Dot bouncer */}
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut" as const,
                  }}
                  className="block w-2 h-2 rounded-full bg-gradient-to-br from-blue-400 to-violet-500"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
