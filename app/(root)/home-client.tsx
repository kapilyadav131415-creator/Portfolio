"use client";

import Image from "next/image";
import Link from "next/link";

import BlogCard from "@/components/blogs/blog-card";
import { AnimatedSection } from "@/components/common/animated-section";
import { AnimatedText } from "@/components/common/animated-text";
import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { Icons } from "@/components/common/icons";
import { Typewriter } from "@/components/common/typewriter";
import ContributionCard from "@/components/contributions/contribution-card";
import ExperienceCard from "@/components/experience/experience-card";
import ProjectCard from "@/components/projects/project-card";
import SkillsCard from "@/components/skills/skills-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { featuredContributions } from "@/config/contributions";
import { experiences } from "@/config/experience";
import { pagesConfig } from "@/config/pages";
import { featuredProjects } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { BlogMeta } from "@/lib/blogs";
import { cn } from "@/lib/utils";
import profileImg from "@/public/profile-img.jpg";

const ROLES = [
  "Full-Stack Developer",
  "Backend Engineer",
  "API Architect",
  "Systems Integrator",
  "Problem Solver",
];

const STATS = [
  { value: "2+", label: "Years exp." },
  { value: "10+", label: "Projects" },
  { value: "3", label: "Industries" },
  { value: "100%", label: "Committed" },
];

const STACK_LINE = [".NET / C#", "Node.js", "React", "SQL Server", "Modbus TCP"];

function SectionHeading({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-[46rem]">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-muted-foreground">{index}</span>
        <span className="rule-grow" />
      </div>
      <AnimatedText
        as="h2"
        className="mt-3 font-heading text-3xl font-semibold leading-tight sm:text-4xl text-foreground"
      >
        {title}
      </AnimatedText>
      {description && (
        <AnimatedText
          as="p"
          delay={0.1}
          className="mt-3 leading-relaxed text-muted-foreground sm:text-lg"
        >
          {description}
        </AnimatedText>
      )}
    </div>
  );
}

interface HomePageClientProps {
  featuredBlogs: BlogMeta[];
}

export function HomePageClient({ featuredBlogs }: HomePageClientProps) {
  return (
    <ClientPageWrapper>
      {/* ─── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="absolute inset-0 -z-10 opacity-[0.035] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="container py-16 md:py-24">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            {/* Circular photo */}
            <AnimatedText type="scale" delay={0.05}>
              <div className="relative h-32 w-32 sm:h-40 sm:w-40 overflow-hidden rounded-full border-2 border-border">
                <Image
                  src={profileImg}
                  alt={`${siteConfig.authorName} — Full Stack Developer`}
                  fill
                  sizes="160px"
                  className="object-cover"
                  priority
                />
              </div>
            </AnimatedText>

            <AnimatedText type="fade" delay={0.12} className="mt-5">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <span className="status-dot" />
                Open for freelance projects
              </div>
            </AnimatedText>

            <AnimatedText as="h1" delay={0.18} className="mt-4">
              <span className="font-heading text-5xl sm:text-6xl font-semibold tracking-tight text-foreground block leading-[1.05]">
                {siteConfig.authorName}
              </span>
            </AnimatedText>

            <AnimatedText delay={0.24} className="block mt-3">
              <p className="font-heading text-xl sm:text-2xl font-medium text-muted-foreground">
                <Typewriter
                  words={ROLES}
                  className="text-foreground"
                  typingSpeed={70}
                  deletingSpeed={45}
                />
              </p>
            </AnimatedText>

            <AnimatedText
              as="p"
              delay={0.3}
              className="mt-4 leading-relaxed text-muted-foreground text-base sm:text-lg max-w-xl"
            >
              Full-stack developer building scalable, production-grade web
              applications across .NET and Node.js — specializing in REST
              API architecture, SQL performance tuning, and real-time
              industrial system integration.
            </AnimatedText>

            <AnimatedText delay={0.36} className="mt-7">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link href="/contact" className={cn(buttonVariants({ size: "lg" }), "rounded-sm px-7")}>
                  Start a project
                </Link>
                <Link
                  href="/resume"
                  target="_blank"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-sm px-7")}
                >
                  View resume
                </Link>
              </div>
            </AnimatedText>

            <AnimatedText delay={0.44} className="mt-8 w-full">
              <div className="flex border border-border">
                {STATS.map((stat, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex-1 px-4 py-3",
                      i !== 0 && "border-l border-border"
                    )}
                  >
                    <div className="font-heading text-xl font-semibold text-foreground">
                      {stat.value}
                    </div>
                    <div className="font-mono text-[11px] text-muted-foreground mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedText>

            <AnimatedText delay={0.5} className="mt-5">
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {STACK_LINE.map((tech) => (
                  <span key={tech} className="mono-tag">{tech}</span>
                ))}
              </div>
            </AnimatedText>
          </div>
        </div>
      </section>

      {/* ─── PROJECTS ─────────────────────────────────────────────────────── */}
      <section className="py-20" id="projects">
        <div className="container space-y-10">
          <SectionHeading
            index="01"
            title={pagesConfig.projects.title}
            description={pagesConfig.projects.description}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProjects.map((project, index) => (
              <AnimatedSection key={project.id} delay={0.08 * index} direction="up">
                <ProjectCard project={project} />
              </AnimatedSection>
            ))}
          </div>
          <Link href="/projects" className={cn(buttonVariants({ variant: "outline" }), "rounded-sm")}>
            View all projects
          </Link>
        </div>
      </section>

      {/* ─── EXPERIENCE ───────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border" id="experience">
        <div className="container space-y-10">
          <SectionHeading
            index="02"
            title={pagesConfig.experience.title}
            description={pagesConfig.experience.description}
          />
          <div className="mx-auto grid justify-center gap-5 md:w-full lg:grid-cols-3">
            {experiences.slice(0, 3).map((experience, index) => (
              <AnimatedSection
                key={experience.id}
                delay={0.08 * (index + 1)}
                direction="up"
              >
                <ExperienceCard experience={experience} />
              </AnimatedSection>
            ))}
          </div>
          <Link href="/experience" className={cn(buttonVariants({ variant: "outline" }), "rounded-sm")}>
            View all experience
          </Link>
        </div>
      </section>

      {/* ─── EDUCATION ────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border" id="education">
        <div className="container space-y-10">
          <SectionHeading
            index="03"
            title="Education & certifications"
            description="Academic foundation and technical achievements that shaped my craft."
          />
          <div className="mx-auto grid justify-center gap-5 md:w-full lg:grid-cols-2 max-w-4xl">
            <AnimatedSection delay={0.15} direction="up">
              <div className="panel h-full p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Icons.post className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold leading-snug font-heading">
                      B.Tech, Computer Science &amp; Engineering
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Ajay Kumar Garg Engineering College, Ghaziabad
                    </p>
                    <p className="font-mono text-xs text-muted-foreground/70 mt-0.5">
                      Affiliated to AKTU
                    </p>
                  </div>
                </div>
                <div>
                  <p className="font-mono text-xs text-muted-foreground mb-2">coursework</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["DSA", "OS", "DBMS", "Computer Networks", "OOP"].map((course) => (
                      <span key={course} className="mono-tag">{course}</span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-border text-sm">
                  <span className="text-muted-foreground">Expected graduation</span>
                  <span className="font-mono text-foreground">May 2028</span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.22} direction="up">
              <div className="panel h-full p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Icons.check className="w-4 h-4 text-primary flex-shrink-0" />
                  <h3 className="text-lg font-semibold font-heading">
                    Certifications &amp; achievements
                  </h3>
                </div>
                <div className="flex items-start gap-3 border border-border px-3 py-3">
                  <Icons.check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">
                      HackerRank Problem Solving Certification
                    </p>
                    <a
                      href="https://www.hackerrank.com/profile/kapilyadav131415"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-primary hover:underline mt-0.5 inline-flex items-center gap-1"
                    >
                      View profile
                      <Icons.externalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── CONTRIBUTIONS ────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border" id="contributions">
        <div className="container space-y-10">
          <SectionHeading
            index="04"
            title={pagesConfig.contributions.title}
            description={pagesConfig.contributions.description}
          />
          <ContributionCard contributions={featuredContributions} />
          <Link href="/contributions" className={cn(buttonVariants({ variant: "outline" }), "rounded-sm")}>
            View all work
          </Link>
        </div>
      </section>

      {/* ─── BLOGS ────────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border" id="blogs">
        <div className="container space-y-10">
          <SectionHeading
            index="05"
            title={pagesConfig.blogs.title}
            description={pagesConfig.blogs.description}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full items-stretch">
            {featuredBlogs.map((blog, index) => (
              <AnimatedSection
                key={blog.slug}
                delay={0.08 * (index + 1)}
                direction="up"
                className="h-full w-full min-w-0"
              >
                <BlogCard blog={blog} />
              </AnimatedSection>
            ))}
          </div>
          <Link href="/blogs" className={cn(buttonVariants({ variant: "outline" }), "rounded-sm")}>
            View all posts
          </Link>
        </div>
      </section>

      {/* ─── SKILLS ───────────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-border" id="skills">
        <div className="container space-y-10">
          <SectionHeading
            index="06"
            title={pagesConfig.skills.title}
            description={pagesConfig.skills.description}
          />
          <SkillsCard type="featured" />
          <Link href="/skills" className={cn(buttonVariants({ variant: "outline" }), "rounded-sm")}>
            View all skills
          </Link>
        </div>
      </section>
    </ClientPageWrapper>
  );
}
