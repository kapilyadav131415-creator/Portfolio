"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import React, { useRef } from "react";

import { Icons } from "@/components/common/icons";
import { contributionsInterface } from "@/config/contributions";

interface ContributionCardProps {
  contributions: contributionsInterface[];
}

function ContributionTile({
  contribution,
  index,
}: {
  contribution: contributionsInterface;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSp = useSpring(x, { stiffness: 200, damping: 20 });
  const ySp = useSpring(y, { stiffness: 200, damping: 20 });
  const rotX = useTransform(ySp, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotY = useTransform(xSp, [-0.5, 0.5], ["-5deg", "5deg"]);
  const gX = useTransform(xSp, [-0.5, 0.5], ["0%", "100%"]);
  const gY = useTransform(ySp, [-0.5, 0.5], ["0%", "100%"]);

  const handleMM = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleML = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
    >
      <Link href={contribution.link} target="_blank" className="block h-full group">
        <motion.div
          ref={ref}
          onMouseMove={handleMM}
          onMouseLeave={handleML}
          style={{ rotateX: rotX, rotateY: rotY, perspective: 1000, transformStyle: "preserve-3d" }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative overflow-hidden rounded-2xl border border-border/60 bg-background h-full min-h-[180px] flex flex-col"
        >
          {/* Moving gradient */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(250px circle at ${gX}% ${gY}%, hsl(var(--primary)/0.12), transparent 70%)`,
            }}
          />
          {/* Top shimmer */}
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Content */}
          <div className="relative flex flex-col flex-grow p-5 space-y-3" style={{ transform: "translateZ(15px)" }}>
            {/* Header */}
            <div className="flex items-start gap-2.5 pr-8">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="p-2 rounded-xl bg-primary/10 border border-primary/20 flex-shrink-0"
              >
                <Icons.gitRepoIcon className="w-4 h-4 text-primary" />
              </motion.div>
              <h3 className="font-bold text-sm text-foreground leading-snug group-hover:text-primary transition-colors duration-300 line-clamp-2">
                {contribution.repo}
              </h3>
            </div>

            {/* External link icon — slides in */}
            <motion.div
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-muted/80 border border-border/60"
              initial={{ opacity: 0, x: 8 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Icons.externalLink className="w-3.5 h-3.5 text-muted-foreground" />
            </motion.div>

            {/* Description */}
            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-grow">
              {contribution.contibutionDescription}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-border/40">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Icons.gitOrgBuilding className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{contribution.repoOwner}</span>
              </div>
              <motion.div
                className="flex items-center gap-1 text-xs font-semibold text-primary"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 0 }}
                viewport={{ once: false }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                View
                <Icons.chevronRight className="w-3 h-3" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function ContributionCard({ contributions }: ContributionCardProps) {
  return (
    <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
      {contributions.map((contribution, id) => (
        <ContributionTile key={id} contribution={contribution} index={id} />
      ))}
    </div>
  );
}
