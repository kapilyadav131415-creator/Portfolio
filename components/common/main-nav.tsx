"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { createPortal } from "react-dom";

import { Icons } from "@/components/common/icons";
import { ModeToggle } from "@/components/common/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { SocialLinks } from "@/config/socials";
import { cn } from "@/lib/utils";

interface MainNavProps {
  items?: any[];
  children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  // Close on route change
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape key
  React.useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [open]);

  // Lock body scroll
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ─── Nav Bar ─────────────────────────────────────────────── */}
      <div className="flex items-center w-full gap-4">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-shrink-0"
        >
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {siteConfig.authorName}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              Available
            </span>
          </Link>
        </motion.div>

        {/* Desktop Nav Links */}
        {items?.length ? (
          <nav className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.4 }}
              >
                <Link
                  href={item.disabled ? "#" : item.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                    isActive(item.href)
                      ? "text-foreground"
                      : "text-foreground/55 hover:text-foreground hover:bg-accent/60",
                    item.disabled && "cursor-not-allowed opacity-40"
                  )}
                >
                  {item.title}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-lg bg-accent -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>
        ) : null}

        {/* Right controls */}
        <div className="flex items-center gap-2 ml-auto">

          {/* Hire Me — desktop only */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "sm" }),
                "rounded-full px-5 bg-gradient-to-r from-blue-600 to-violet-600 border-0 hover:opacity-90 text-white shadow-md shadow-blue-500/20 transition-all hover:scale-105"
              )}
            >
              <Icons.contact className="w-3.5 h-3.5 mr-1.5" />
              Hire Me
            </Link>
          </motion.div>

          {/* Theme toggle */}
          <ModeToggle />

          {/* Hamburger button */}
          <motion.button
            onClick={() => setOpen((v) => !v)}
            className="relative flex md:hidden items-center justify-center w-9 h-9 rounded-xl border border-border/60 bg-background/80 backdrop-blur-sm"
            aria-label={open ? "Close menu" : "Open menu"}
            whileTap={{ scale: 0.9 }}
          >
            <div className="flex flex-col gap-[5px] items-center justify-center w-4">
              <motion.span
                animate={open ? { rotate: 45, y: 7, width: "16px" } : { rotate: 0, y: 0, width: "16px" }}
                transition={{ duration: 0.25 }}
                className="block h-[2px] rounded-full bg-foreground origin-center"
              />
              <motion.span
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block h-[2px] w-[11px] rounded-full bg-foreground self-start"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -7, width: "16px" } : { rotate: 0, y: 0, width: "16px" }}
                transition={{ duration: 0.25 }}
                className="block h-[2px] rounded-full bg-foreground origin-center"
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* ─── Mobile Drawer — Rendered via Portal to escape header's filter context ── */}
      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                {/* Full-screen backdrop */}
                <motion.div
                  key="mob-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setOpen(false)}
                  className="fixed inset-0 bg-black/70 backdrop-blur-sm md:hidden"
                  style={{ zIndex: 99998 }}
                />

                {/* Drawer panel */}
                <motion.aside
                  key="mob-drawer"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="fixed top-0 right-0 bottom-0 w-[min(320px,85vw)] bg-background border-l border-border/60 shadow-2xl flex flex-col md:hidden overflow-hidden"
                  style={{ zIndex: 99999 }}
                >
                  {/* Drawer header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 bg-background/95 backdrop-blur-xl">
                    <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
                      <span className="font-heading text-xl font-bold">{siteConfig.authorName}</span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <span className="relative flex h-1.5 w-1.5 flex-shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                        </span>
                        Available
                      </span>
                    </Link>
                    <button
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center w-8 h-8 rounded-lg border border-border/60 hover:bg-accent transition-colors"
                      aria-label="Close menu"
                    >
                      <Icons.close className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Nav links */}
                  <nav className="flex-1 overflow-auto px-3 py-4 space-y-1">
                    {items?.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 * index, duration: 0.25 }}
                      >
                        <Link
                          href={item.disabled ? "#" : item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                            isActive(item.href)
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "hover:bg-accent hover:text-accent-foreground text-foreground/75",
                            item.disabled && "opacity-40 pointer-events-none"
                          )}
                        >
                          {item.title}
                          <Icons.chevronRight
                            className={cn("h-4 w-4 flex-shrink-0", isActive(item.href) ? "opacity-100" : "opacity-30")}
                          />
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Social links */}
                  <div className="px-5 pb-3 flex items-center gap-2">
                    {SocialLinks.map((item, ind) => (
                      <motion.a
                        key={ind}
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={item.username}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + ind * 0.06 }}
                        className="flex items-center justify-center w-9 h-9 rounded-xl border border-border/60 hover:bg-accent hover:border-border transition-all"
                      >
                        <item.icon className="h-4 w-4" />
                      </motion.a>
                    ))}
                  </div>

                  {/* Hire Me CTA */}
                  <div className="px-4 pb-6 pt-2">
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <Link
                        href="/contact"
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/20 hover:opacity-90 transition-all active:scale-95"
                      >
                        <Icons.contact className="w-4 h-4" />
                        Hire Me — Let&apos;s Talk
                      </Link>
                    </motion.div>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
