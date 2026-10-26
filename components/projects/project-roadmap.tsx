"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import ChipContainer from "@/components/ui/chip-container";
import { ProjectInterface } from "@/config/projects";

interface ProjectRoadmapProps {
  projects: ProjectInterface[];
}

export default function ProjectRoadmap({ projects }: ProjectRoadmapProps) {
  return (
    <div className="relative mx-auto max-w-5xl px-4 py-10 overflow-hidden">
      {/* Vertical Line */}
      <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-ml-[1px]" />

      <div className="space-y-12 md:space-y-24">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`relative flex flex-col md:flex-row items-center justify-between ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 top-8 flex h-3 w-3 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-2 border-background bg-primary md:left-1/2 z-10" />

              {/* Empty space for alternating layout */}
              <div className="hidden w-1/2 md:block" />

              {/* Content Card */}
              <div className={`w-full pl-12 md:w-[45%] md:pl-0 ${isEven ? "md:pr-12" : "md:pl-12"}`}>
                <div className="panel group">
                  <div className="relative flex h-full flex-col p-6">
                    <div className="relative mb-6 h-[200px] w-full overflow-hidden border border-border">
                      <Image
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        src={project.companyLogoImg}
                        alt={project.companyName}
                        fill
                      />
                      
                    </div>

                    <div className="flex flex-col flex-grow">
                      <h5 className="mb-2 text-2xl font-semibold tracking-tight text-foreground font-heading">
                        {project.companyName}
                      </h5>
                      <p className="mb-4 font-normal text-muted-foreground line-clamp-3">
                        {project.shortDescription}
                      </p>
                      <div className="mb-6 flex gap-2 flex-wrap">
                        <ChipContainer textArr={project.category} />
                      </div>
                      
                      <Link href={`/projects/${project.id}`} className="mt-auto inline-block">
                        <Button variant="default" className="w-full sm:w-auto rounded-sm">
                          View Project
                          <Icons.chevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
