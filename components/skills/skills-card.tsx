"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

import { featuredSkills, skills, skillsInterface } from "@/config/skills";

interface SkillsCardProps {
  type?: "all" | "featured";
}

/* ── 3D Tilt Card ─────────────────────────────────────────────────────────── */
function SkillTile({ skill, index }: { skill: skillsInterface; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const proficiencyLabel = ["", "Beginner", "Basic", "Intermediate", "Advanced", "Expert"][skill.rating] ?? "Expert";
  const proficiencyColor = [
    "",
    "text-slate-400",
    "text-blue-400",
    "text-violet-400",
    "text-amber-400",
    "text-emerald-400",
  ][skill.rating] ?? "text-emerald-400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: index * 0.05,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      style={{ perspective: "800px" }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ z: 30 }}
        className="group relative cursor-pointer"
      >
        {/* Card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-background via-background to-muted/30 p-5 h-full transition-all duration-300 group-hover:border-white/20 group-hover:shadow-2xl">
          {/* Moving gradient highlight */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(200px circle at ${glowX}% ${glowY}%, hsl(var(--primary)/0.15), transparent 70%)`,
            }}
          />

          {/* Shimmer line */}
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Content */}
          <div style={{ transform: "translateZ(20px)" }} className="relative flex flex-col items-center gap-4 text-center">
            {/* 3D Icon container */}
            <motion.div
              whileHover={{ scale: 1.15, rotateY: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              style={{ transformStyle: "preserve-3d" }}
              className="relative"
            >
              {/* Glow blob behind icon */}
              <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 shadow-lg group-hover:shadow-primary/25 group-hover:shadow-xl transition-all duration-300">
                <skill.icon
                  size={28}
                  className="text-primary drop-shadow-sm group-hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.6)] transition-all duration-300"
                />
              </div>
            </motion.div>

            {/* Name */}
            <div className="space-y-1.5">
              <p className="text-sm font-bold text-foreground leading-tight">
                {skill.name}
              </p>
              {/* Proficiency bar */}
              <div className="w-full h-1 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(skill.rating / 5) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 + 0.3, duration: 0.8, ease: "easeOut" as const }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500"
                />
              </div>
              <p className={`text-xs font-semibold ${proficiencyColor}`}>
                {proficiencyLabel}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Component ───────────────────────────────────────────────────────── */
export default function SkillsCard({ type = "all" }: SkillsCardProps) {
  const displaySkills = type === "featured" ? featuredSkills : skills;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {displaySkills.map((skill, id) => (
        <SkillTile key={id} skill={skill} index={id} />
      ))}
    </div>
  );
}
