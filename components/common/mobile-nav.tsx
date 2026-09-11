"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import * as React from "react";

import { Icons } from "@/components/common/icons";
import { siteConfig } from "@/config/site";
import { useLockBody } from "@/hooks/use-lock-body";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  items: any[];
  children?: React.ReactNode;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export function MobileNav({ items, children }: MobileNavProps) {
  useLockBody();

  return (
    <div className="fixed inset-0 top-16 z-50 md:hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-background/95 backdrop-blur-xl"
      />

      <motion.div
        className="relative z-10 flex flex-col h-full p-6 overflow-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-8">
          <span className="font-heading text-2xl font-bold">
            {siteConfig.authorName}
          </span>
          <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-500 border border-emerald-500/30">
            Available
          </span>
        </Link>

        {/* Nav Items */}
        <motion.nav
          className="flex flex-col gap-1 flex-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {items.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link
                href={item.disabled ? "#" : item.href}
                className={cn(
                  "flex w-full items-center rounded-xl px-4 py-3 text-base font-medium transition-all",
                  "hover:bg-accent hover:text-accent-foreground",
                  item.disabled && "cursor-not-allowed opacity-60"
                )}
              >
                {item.title}
                <Icons.chevronRight className="ml-auto h-4 w-4 opacity-40" />
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 pt-6 border-t border-border"
        >
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/20"
          >
            <Icons.contact className="w-4 h-4" />
            Hire Me — Let&apos;s Talk
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
