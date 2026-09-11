"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { ProjectInterface } from "@/config/projects";

interface ProjectCardProps {
  project: ProjectInterface;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const categoryColors: Record<string, string> = {
    "Full Stack": "bg-violet-500/15 text-violet-400 border-violet-500/30",
    Backend: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    Frontend: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-background h-full cursor-pointer"
    >
      {/* Moving gradient highlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{
          background: `radial-gradient(300px circle at ${glowX}% ${glowY}%, hsl(var(--primary)/0.12), transparent 70%)`,
        }}
      />

      {/* Top shimmer */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden flex-shrink-0">
        <Image
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          src={project.companyLogoImg}
          alt={project.companyName}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

        {/* Type badge */}
        <motion.div
          className="absolute top-3 right-3 z-10"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/90 backdrop-blur-sm px-2.5 py-1 text-xs font-medium shadow-sm">
            {project.type === "Personal" ? (
              <Icons.userFill className="h-3 w-3 text-blue-400" />
            ) : (
              <Icons.work className="h-3 w-3 text-emerald-400" />
            )}
            {project.type}
          </span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5 space-y-3" style={{ transform: "translateZ(20px)" }}>
        {/* Category chips */}
        <div className="flex flex-wrap gap-1.5">
          {project.category.map((cat, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${categoryColors[cat] ?? "bg-muted text-muted-foreground border-border"}`}
            >
              {cat}
            </motion.span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold tracking-tight text-foreground leading-snug group-hover:text-primary transition-colors duration-300">
          {project.companyName}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-grow">
          {project.shortDescription}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.techStack.slice(0, 4).map((tech, i) => (
            <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-muted/80 text-muted-foreground border border-border/40">
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-muted/80 text-muted-foreground border border-border/40">
              +{project.techStack.length - 4} more
            </span>
          )}
        </div>

        {/* CTA */}
        <Link href={`/projects/${project.id}`} className="mt-auto pt-2 block">
          <Button variant="outline" className="w-full rounded-xl group-hover:border-primary/50 group-hover:bg-primary/5 group-hover:text-primary transition-all duration-300">
            View Details
            <motion.span
              className="ml-2"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
            >
              <Icons.chevronRight className="w-4 h-4" />
            </motion.span>
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
