"use client";

import { motion, Variants } from "framer-motion";
import Rating from "@/components/skills/rating";
import { skills, featuredSkills } from "@/config/skills";

interface SkillsCardProps {
  type?: "all" | "featured";
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function SkillsCard({ type = "all" }: SkillsCardProps) {
  const displaySkills = type === "featured" ? featuredSkills : skills;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="mx-auto grid justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {displaySkills.map((skill, id) => (
        <motion.div
          key={id}
          variants={itemVariants}
          whileHover={{ y: -5, scale: 1.02 }}
          className="group relative overflow-hidden rounded-xl border border-white/10 bg-background/50 backdrop-blur-md p-0.5 shadow-lg transition-all hover:shadow-primary/25"
        >
          {/* Animated gradient border on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          
          <div className="relative flex h-[240px] flex-col justify-between rounded-lg bg-background p-6">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 shadow-[0_0_20px_rgba(var(--primary),0.2)] backdrop-blur-xl"
            >
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full -z-10" />
              <div className="text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.8)]">
                <skill.icon size={40} />
              </div>
            </motion.div>
            
            <div className="space-y-2 mt-4">
              <h3 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">{skill.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {skill.description}
              </p>
              <div className="pt-2">
                <Rating stars={skill.rating} />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
