import Link from "next/link";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { SocialLinks } from "@/config/socials";
import { cn } from "@/lib/utils";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("border-t border-border bg-background", className)}>
      {/* CTA Band */}
      <div className="border-b border-border">
        <div className="container py-10 md:py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">
              Let&apos;s work together
            </h3>
            <p className="text-muted-foreground text-sm md:text-base max-w-md">
              Open for freelance projects and full-time roles — reach out with
              what you&apos;re building.
            </p>
          </div>
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "rounded-sm px-8 flex-shrink-0")}
          >
            Start a project
          </Link>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
          <span className="text-foreground font-heading text-base font-semibold not-italic">
            {siteConfig.authorName}
          </span>
          <span className="hidden sm:inline">Full-stack developer</span>
        </div>

        <div className="flex items-center gap-1">
          {SocialLinks.map((item, ind) => (
            <Link
              key={ind}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              aria-label={item.username}
              className="flex h-9 w-9 items-center justify-center border border-transparent text-muted-foreground hover:border-border hover:text-foreground transition-colors"
            >
              <item.icon className="h-4 w-4" />
            </Link>
          ))}
        </div>

        <p className="font-mono text-[11px] text-muted-foreground text-center sm:text-right">
          © {currentYear} {siteConfig.authorName}
        </p>
      </div>
    </footer>
  );
}
