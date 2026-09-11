"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  variant?: "slide" | "fade" | "scale" | "zoom";
  id?: string;
}

export const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  variant = "slide",
  id,
}: AnimatedSectionProps) => {
  const directionOffset: Record<string, object> = {
    up: { y: 60 },
    down: { y: -60 },
    left: { x: 60 },
    right: { x: -60 },
  };

  const variants: Record<string, object> = {
    slide: {
      hidden: { opacity: 0, ...directionOffset[direction] },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 0.7, delay, ease: "easeOut" as const },
      },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.8, delay, ease: "easeOut" as const },
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.92 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, delay, ease: "easeOut" as const },
      },
    },
    zoom: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, delay, type: "spring" as const, stiffness: 100 },
      },
    },
  };

  const chosen = variants[variant];

  return (
    <motion.div
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      variants={chosen as any}
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
};
