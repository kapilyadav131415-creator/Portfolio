"use client";

import Link from "next/link";
import React from "react";

import { Icons } from "@/components/common/icons";
import { contributionsInterface } from "@/config/contributions";

interface ContributionCardProps {
  contributions: contributionsInterface[];
}

function ContributionTile({ contribution }: { contribution: contributionsInterface }) {
  return (
    <Link href={contribution.link} target="_blank" className="block h-full group">
      <div className="panel h-full min-h-[180px] flex flex-col">
        <div className="flex flex-col flex-grow p-5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2.5">
              <Icons.gitRepoIcon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <h3 className="font-semibold text-sm text-foreground leading-snug line-clamp-2">
                {contribution.repo}
              </h3>
            </div>
            <Icons.externalLink className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 group-hover:text-primary transition-colors" />
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-grow">
            {contribution.contibutionDescription}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
              <Icons.gitOrgBuilding className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{contribution.repoOwner}</span>
            </div>
            <span className="flex items-center gap-1 font-mono text-[11px] text-primary">
              View
              <Icons.chevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ContributionCard({ contributions }: ContributionCardProps) {
  return (
    <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
      {contributions.map((contribution, id) => (
        <ContributionTile key={id} contribution={contribution} />
      ))}
    </div>
  );
}
