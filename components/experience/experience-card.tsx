"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

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

  return (
    <div className="panel group h-full flex flex-col">
      <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-start gap-3">
          {experience.logo && (
            <div className="w-12 h-12 border border-border bg-white overflow-hidden flex-shrink-0">
              <Image
                src={experience.logo}
                alt={experience.company}
                width={48}
                height={48}
                className="w-full h-full object-contain p-2"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base sm:text-lg font-semibold text-foreground leading-tight line-clamp-1 font-heading">
                {experience.position}
              </h3>
              {experience.companyUrl && (
                <a
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0"
                >
                  <Icons.externalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
            <p className="text-sm font-medium text-muted-foreground mt-0.5">{experience.company}</p>
            <p className="text-xs text-muted-foreground/70 mt-0.5">{experience.location}</p>
          </div>
        </div>

        {/* Duration */}
        <span className="mono-tag w-fit">
          {isActive && <span className="status-dot" />}
          {getDuration(experience.startDate, experience.endDate)}
        </span>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
          {experience.description[0]}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {experience.skills.slice(0, 4).map((skill, i) => (
            <span key={i} className="mono-tag">{skill}</span>
          ))}
          {experience.skills.length > 4 && (
            <span className="mono-tag">+{experience.skills.length - 4}</span>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="rounded-sm w-full sm:w-auto mt-auto group-hover:border-primary group-hover:text-primary transition-colors"
          asChild
        >
          <Link href={`/experience/${experience.id}`}>
            View details
            <Icons.chevronRight className="ml-2 h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ExperienceCard;
