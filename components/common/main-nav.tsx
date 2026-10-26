"use client";

import { AnimatePresence, motion } from "framer-motion";
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

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [open]);

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
      <div className="flex items-center w-full gap-6">
        {/* Logo */}
        <Link href="/" className="flex flex-shrink-0 items-center gap-2.5">
          <span className="font-heading text-lg font-semibold tracking-tight text-foreground">
            {siteConfig.authorName}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
            <span className="status-dot" />
            Open to work
          </span>
        </Link>

        {/* Desktop Nav Links */}
        {items?.length ? (
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {items.map((item, index) => (
              <Link
                key={index}
                href={item.disabled ? "#" : item.href}
                className={cn(
                  "relative px-3 py-2 font-mono text-[12.5px] transition-colors duration-150",
                  isActive(item.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                  item.disabled && "cursor-not-allowed opacity-40"
                )}
              >
                {item.title}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-active-rule"
                    className="absolute left-3 right-3 -bottom-[1px] h-[2px] bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
            ))}
          </nav>
        ) : null}

        {/* Right controls */}
        <div className="flex items-center gap-2 ml-auto">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden md:inline-flex rounded-sm px-4"
            )}
          >
            Start a project
          </Link>

          <ModeToggle />

          <button
            onClick={() => setOpen((v) => !v)}
            className="relative flex md:hidden items-center justify-center w-9 h-9 border border-border bg-background"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <div className="flex flex-col gap-[5px] items-center justify-center w-4">
              <motion.span
                animate={open ? { rotate: 45, y: 7, width: "16px" } : { rotate: 0, y: 0, width: "16px" }}
                transition={{ duration: 0.25 }}
                className="block h-[1.5px] bg-foreground origin-center"
              />
              <motion.span
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block h-[1.5px] w-[11px] bg-foreground self-start"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -7, width: "16px" } : { rotate: 0, y: 0, width: "16px" }}
                transition={{ duration: 0.25 }}
                className="block h-[1.5px] bg-foreground origin-center"
              />
            </div>
          </button>
        </div>
      </div>

      {/* ─── Mobile Drawer ──────────────────────────────────────── */}
      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                <motion.div
                  key="mob-backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setOpen(false)}
                  className="fixed inset-0 bg-background/80 backdrop-blur-sm md:hidden"
                  style={{ zIndex: 99998 }}
                />

                <motion.aside
                  key="mob-drawer"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 320, damping: 32 }}
                  className="fixed top-0 right-0 bottom-0 w-[min(320px,85vw)] bg-background border-l border-border flex flex-col md:hidden overflow-hidden"
                  style={{ zIndex: 99999 }}
                >
                  <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                    <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
                      <span className="font-heading text-lg font-semibold">{siteConfig.authorName}</span>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                        <span className="status-dot" />
                        Open to work
                      </span>
                    </Link>
                    <button
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center w-8 h-8 border border-border hover:bg-accent transition-colors"
                      aria-label="Close menu"
                    >
                      <Icons.close className="h-4 w-4" />
                    </button>
                  </div>

                  <nav className="flex-1 overflow-auto py-2">
                    {items?.map((item, index) => (
                      <Link
                        key={index}
                        href={item.disabled ? "#" : item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center justify-between w-full px-5 py-3 border-l-2 font-mono text-sm transition-colors duration-150",
                          isActive(item.href)
                            ? "border-primary text-foreground bg-accent/40"
                            : "border-transparent text-muted-foreground hover:text-foreground hover:bg-accent/20",
                          item.disabled && "opacity-40 pointer-events-none"
                        )}
                      >
                        {item.title}
                        <Icons.chevronRight
                          className={cn("h-4 w-4 flex-shrink-0", isActive(item.href) ? "opacity-100 text-primary" : "opacity-30")}
                        />
                      </Link>
                    ))}
                  </nav>

                  <div className="px-5 pb-3 flex items-center gap-2 border-t border-border pt-4">
                    {SocialLinks.map((item, ind) => (
                      <a
                        key={ind}
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={item.username}
                        className="flex items-center justify-center w-9 h-9 border border-border hover:border-primary hover:text-primary transition-colors"
                      >
                        <item.icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>

                  <div className="px-5 pb-6 pt-2">
                    <Link
                      href="/contact"
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-primary text-primary-foreground text-sm font-medium"
                    >
                      Start a project
                    </Link>
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
