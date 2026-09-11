"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedTextProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  type?: "fade-up" | "fade" | "scale";
}

export const AnimatedText = ({
  children,
  delay = 0,
  className = "",
  as = "div",
  type = "fade-up",
}: AnimatedTextProps) => {
  const Component = motion[as];

  const variants: Record<string, object> = {
    "fade-up": {
      hidden: { opacity: 0, y: 24 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          delay,
          duration: 0.65,
          ease: "easeOut" as const,
        },
      },
    },
    fade: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { delay, duration: 0.7, ease: "easeOut" as const },
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { delay, duration: 0.5, type: "spring" as const, stiffness: 120 },
      },
    },
  };

  return (
    <Component
      initial="hidden"
      animate="visible"
      variants={variants[type] as any}
      className={className}
    >
      {children}
    </Component>
  );
};
