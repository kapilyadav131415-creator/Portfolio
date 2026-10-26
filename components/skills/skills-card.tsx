"use client";

import { featuredSkills, skills, skillsInterface } from "@/config/skills";

interface SkillsCardProps {
  type?: "all" | "featured";
}

const PROFICIENCY_LABEL = ["", "Beginner", "Basic", "Intermediate", "Advanced", "Expert"];

function SkillTile({ skill }: { skill: skillsInterface }) {
  const label = PROFICIENCY_LABEL[skill.rating] ?? "Expert";

  return (
    <div className="panel group p-4 flex flex-col items-center gap-3 text-center">
      <div className="flex items-center justify-center w-11 h-11 border border-border">
        <skill.icon size={22} className="text-primary" />
      </div>

      <div className="space-y-1.5 w-full">
        <p className="text-sm font-medium text-foreground leading-tight">
          {skill.name}
        </p>
        <div className="w-full h-1 bg-muted overflow-hidden">
          <div
            className="h-full bg-primary"
            style={{ width: `${(skill.rating / 5) * 100}%` }}
          />
        </div>
        <p className="font-mono text-[11px] text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export default function SkillsCard({ type = "all" }: SkillsCardProps) {
  const displaySkills = type === "featured" ? featuredSkills : skills;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {displaySkills.map((skill, id) => (
        <SkillTile key={id} skill={skill} />
      ))}
    </div>
  );
}
