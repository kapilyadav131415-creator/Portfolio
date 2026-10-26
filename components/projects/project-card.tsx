"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import { ProjectInterface } from "@/config/projects";

interface ProjectCardProps {
  project: ProjectInterface;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="panel group flex flex-col h-full">
      {/* Image */}
      <div className="relative w-full h-44 overflow-hidden flex-shrink-0 border-b border-border">
        <Image
          className="object-cover"
          src={project.companyLogoImg}
          alt={project.companyName}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-3 right-3">
          <span className="mono-tag bg-background/90">
            {project.type === "Personal" ? (
              <Icons.userFill className="h-3 w-3" />
            ) : (
              <Icons.work className="h-3 w-3" />
            )}
            {project.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5 space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {project.category.map((cat, i) => (
            <span key={i} className="mono-tag">
              {cat}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-foreground leading-snug font-heading">
          {project.companyName}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-grow">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.techStack.slice(0, 4).map((tech, i) => (
            <span key={i} className="mono-tag">{tech}</span>
          ))}
          {project.techStack.length > 4 && (
            <span className="mono-tag">+{project.techStack.length - 4}</span>
          )}
        </div>

        <Link href={`/projects/${project.id}`} className="mt-auto pt-2 block">
          <Button variant="outline" className="w-full rounded-sm group-hover:border-primary group-hover:text-primary transition-colors">
            View details
            <Icons.chevronRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
