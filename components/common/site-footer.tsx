import Link from "next/link";
import * as React from "react";

import { Icons } from "@/components/common/icons";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { SocialLinks } from "@/config/socials";
import { cn } from "@/lib/utils";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "border-t border-border/50 bg-background/50 backdrop-blur-sm",
        className
      )}
    >
      {/* CTA Band */}
      <div className="border-b border-border/40 bg-gradient-to-r from-blue-500/5 via-violet-500/5 to-emerald-500/5">
        <div className="container py-10 md:py-14 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Let&apos;s Work Together
            </h3>
            <p className="text-muted-foreground text-sm md:text-base max-w-md">
              Have a project in mind? I&apos;m currently available for freelance
              projects and full-time roles.
            </p>
          </div>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-full px-8 bg-gradient-to-r from-blue-600 to-violet-600 border-0 hover:from-blue-500 hover:to-violet-500 text-white shadow-lg shadow-blue-500/20 flex-shrink-0"
            )}
          >
            <Icons.contact className="w-4 h-4 mr-2" />
            Start a Project
          </Link>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="font-heading text-lg font-bold text-foreground">
            {siteConfig.authorName}
          </span>
          <span className="text-muted-foreground text-sm hidden sm:inline">
            — Full Stack Developer
          </span>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-2">
          {SocialLinks.map((item, ind) => (
            <Link
              key={ind}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              aria-label={item.username}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "h-9 w-9 p-0 rounded-lg hover:bg-accent hover:text-accent-foreground transition-all hover:scale-110"
              )}
            >
              <item.icon className="h-4 w-4" />
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground text-center sm:text-right">
          © {currentYear} {siteConfig.authorName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
