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
      <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-primary/50 via-primary to-transparent md:left-1/2 md:-ml-[1px]" />

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
              <div className="absolute left-4 top-8 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-background bg-primary md:left-1/2 shadow-[0_0_15px_rgba(var(--primary),0.5)] z-10" />

              {/* Empty space for alternating layout */}
              <div className="hidden w-1/2 md:block" />

              {/* Content Card */}
              <div className={`w-full pl-12 md:w-[45%] md:pl-0 ${isEven ? "md:pr-12" : "md:pl-12"}`}>
                <div className="group relative overflow-hidden rounded-xl border border-border bg-background p-1 transition-all hover:shadow-2xl hover:shadow-primary/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  <div className="relative flex h-full flex-col rounded-lg bg-background/90 backdrop-blur-sm p-6">
                    <div className="relative mb-6 h-[200px] w-full overflow-hidden rounded-lg border border-border/50">
                      <Image
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        src={project.companyLogoImg}
                        alt={project.companyName}
                        fill
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                    </div>

                    <div className="flex flex-col flex-grow">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-foreground bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                        {project.companyName}
                      </h5>
                      <p className="mb-4 font-normal text-muted-foreground line-clamp-3">
                        {project.shortDescription}
                      </p>
                      <div className="mb-6 flex gap-2 flex-wrap">
                        <ChipContainer textArr={project.category} />
                      </div>
                      
                      <Link href={`/projects/${project.id}`} className="mt-auto inline-block">
                        <Button variant="default" className="w-full sm:w-auto shadow-md hover:shadow-lg transition-shadow">
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
