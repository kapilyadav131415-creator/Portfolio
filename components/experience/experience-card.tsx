"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { ExperienceInterface } from "@/config/experience";

const getYear = (d: Date) => new Date(d).getFullYear().toString();
const getDuration = (s: Date, e: Date | "Present") =>
  `${getYear(s)} – ${typeof e === "string" ? "Present" : getYear(e)}`;

interface ExperienceCardProps {
  experience: ExperienceInterface;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  const isActive = experience.endDate === "Present";
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const ySpring = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-5deg", "5deg"]);
  const gX = useTransform(xSpring, [-0.5, 0.5], ["0%", "100%"]);
  const gY = useTransform(ySpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMM = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleML = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMM}
      onMouseLeave={handleML}
      style={{ rotateX, rotateY, perspective: 1000, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background h-full flex flex-col"
    >
      {/* Moving glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(250px circle at ${gX}% ${gY}%, hsl(var(--primary)/0.1), transparent 70%)`,
        }}
      />
      {/* Shimmer top */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {/* Left accent */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-violet-500 to-emerald-500"
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" as const }}
        style={{ originY: 0 }}
      />

      <div className="relative p-5 sm:p-6 space-y-4 flex-1 flex flex-col" style={{ transform: "translateZ(15px)" }}>
        {/* Header */}
        <div className="flex items-start gap-3">
          {experience.logo && (
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="w-12 h-12 rounded-xl border border-border/60 bg-white overflow-hidden flex-shrink-0 shadow-sm"
            >
              <Image
                src={experience.logo}
                alt={experience.company}
                width={48}
                height={48}
                className="w-full h-full object-contain p-2"
              />
            </motion.div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300 line-clamp-1">
                {experience.position}
              </h3>
              {experience.companyUrl && (
                <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0">
                  <Icons.externalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
            <p className="text-sm font-semibold text-muted-foreground mt-0.5">{experience.company}</p>
            <p className="text-xs text-muted-foreground/70 mt-0.5">{experience.location}</p>
          </div>
        </div>

        {/* Duration badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
            isActive
              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
              : "bg-muted text-muted-foreground border-border/60"
          }`}>
            {isActive && (
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
            )}
            {getDuration(experience.startDate, experience.endDate)}
          </span>
        </motion.div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
          {experience.description[0]}
        </p>

        {/* Skill chips */}
        <div className="flex flex-wrap gap-1.5">
          {experience.skills.slice(0, 4).map((skill, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 + 0.1 }}
              className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-muted/80 text-muted-foreground border border-border/40"
            >
              {skill}
            </motion.span>
          ))}
          {experience.skills.length > 4 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-muted/80 text-muted-foreground border border-border/40">
              +{experience.skills.length - 4}
            </span>
          )}
        </div>

        {/* CTA */}
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl w-full sm:w-auto mt-auto group-hover:border-primary/50 group-hover:bg-primary/5 group-hover:text-primary transition-all duration-300"
          asChild
        >
          <Link href={`/experience/${experience.id}`}>
            View Details
            <Icons.chevronRight className="ml-2 h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
