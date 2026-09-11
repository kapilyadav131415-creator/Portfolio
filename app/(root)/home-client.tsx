"use client";

import { motion } from "framer-motion";
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
  "Full Stack Developer",
  "Backend Engineer",
  "Freelance Developer",
  "API Architect",
  "Problem Solver",
];

const STATS = [
  { value: "2+", label: "Years Exp." },
  { value: "10+", label: "Projects" },
  { value: "3", label: "Industries" },
  { value: "100%", label: "Committed" },
];

function SectionHeading({
  badge,
  title,
  description,
}: {
  badge?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-3 text-center">
      {badge && (
        <AnimatedText
          as="span"
          type="fade"
          className="inline-flex items-center rounded-full border border-border/60 bg-muted/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          {badge}
        </AnimatedText>
      )}
      <AnimatedText
        as="h2"
        className="font-heading text-3xl font-bold leading-tight sm:text-4xl md:text-5xl text-foreground"
      >
        {title}
      </AnimatedText>
      {description && (
        <AnimatedText
          as="p"
          delay={0.15}
          className="max-w-[85%] leading-relaxed text-muted-foreground sm:text-lg"
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
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-violet-500/10 blur-[100px]" />
          <div className="absolute top-0 right-1/3 w-[300px] h-[300px] rounded-full bg-emerald-500/8 blur-[80px]" />
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="container py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Text */}
            <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
              {/* Availability badge */}
              <AnimatedText type="fade" delay={0.05}>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-500">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Available for Freelance Projects
                </div>
              </AnimatedText>

              {/* Name */}
              <AnimatedText as="h1" delay={0.1}>
                <span className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground block leading-[1.1]">
                  Hi, I&apos;m{" "}
                  <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500 bg-clip-text text-transparent">
                    {siteConfig.authorName}
                  </span>
                </span>
              </AnimatedText>

              {/* Typewriter */}
              <AnimatedText delay={0.2} className="block">
                <p className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground">
                  I&apos;m a{" "}
                  <Typewriter
                    words={ROLES}
                    className="text-foreground"
                    typingSpeed={70}
                    deletingSpeed={45}
                  />
                </p>
              </AnimatedText>

              {/* Description */}
              <AnimatedText
                as="p"
                delay={0.3}
                className="leading-relaxed text-muted-foreground text-base sm:text-lg max-w-xl mx-auto lg:mx-0"
              >
                Full-stack developer building scalable, production-grade web
                applications across .NET and Node.js ecosystems — specializing
                in REST API architecture, SQL performance tuning, and real-time
                industrial system integration.
              </AnimatedText>

              {/* CTAs */}
              <AnimatedText delay={0.4}>
                <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 justify-center lg:justify-start">
                  <Link
                    href="/contact"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "rounded-full px-8 bg-gradient-to-r from-blue-600 to-violet-600 border-0 hover:from-blue-500 hover:to-violet-500 text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-105"
                    )}
                  >
                    <Icons.contact className="w-4 h-4 mr-2" />
                    Let&apos;s Talk
                  </Link>
                  <Link
                    href="/resume"
                    target="_blank"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "rounded-full px-8 hover:scale-105 transition-all"
                    )}
                  >
                    <Icons.post className="w-4 h-4 mr-2" />
                    View Resume
                  </Link>
                </div>
              </AnimatedText>

              {/* Stats */}
              <AnimatedText delay={0.55}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border/50 max-w-xl mx-auto lg:mx-0">
                  {STATS.map((stat, i) => (
                    <div key={i} className="text-center lg:text-left">
                      <div className="font-heading text-2xl font-bold text-foreground">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedText>
            </div>

            {/* Right — Image */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <AnimatedText type="scale" delay={0.2}>
                <div className="relative">
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500 opacity-20 blur-xl animate-pulse" />
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500 opacity-60" />
                  <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-background">
                    <Image
                      src={profileImg}
                      alt={`${siteConfig.authorName} — Full Stack Developer`}
                      fill
                      sizes="(max-width: 640px) 224px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-background border border-border rounded-2xl px-4 py-2 shadow-xl"
                  >
                    <p className="text-xs text-muted-foreground">Tech Stack</p>
                    <p className="text-sm font-bold">.NET · Node.js · React</p>
                  </motion.div>
                </div>
              </AnimatedText>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="flex justify-center mt-16 lg:mt-20"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icons.chevronDown className="h-5 w-5 text-muted-foreground/50" />
          </motion.div>
        </div>
      </section>

      {/* ─── PROJECTS ─────────────────────────────────────────────────────── */}
      <section className="py-20 bg-muted/30" id="projects">
        <div className="container space-y-10">
          <SectionHeading
            badge="My Work"
            title={pagesConfig.projects.title}
            description={pagesConfig.projects.description}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <AnimatedSection key={project.id} delay={0.1 * index} direction="up">
                <ProjectCard project={project} />
              </AnimatedSection>
            ))}
          </div>
          <AnimatedText delay={0.3} className="flex justify-center">
            <Link href="/projects">
              <Button variant="outline" className="rounded-full px-8">
                <Icons.chevronDown className="mr-2 h-4 w-4" />
                View All Projects
              </Button>
            </Link>
          </AnimatedText>
        </div>
      </section>

      {/* ─── EXPERIENCE ───────────────────────────────────────────────────── */}
      <section className="py-20" id="experience">
        <div className="container space-y-10">
          <SectionHeading
            badge="Career"
            title={pagesConfig.experience.title}
            description={pagesConfig.experience.description}
          />
          <div className="mx-auto grid justify-center gap-6 md:w-full lg:grid-cols-3">
            {experiences.slice(0, 3).map((experience, index) => (
              <AnimatedSection
                key={experience.id}
                delay={0.1 * (index + 1)}
                direction="up"
              >
                <ExperienceCard experience={experience} />
              </AnimatedSection>
            ))}
          </div>
          <AnimatedText delay={0.4} className="flex justify-center">
            <Link href="/experience">
              <Button variant="outline" className="rounded-full px-8">
                <Icons.chevronDown className="mr-2 h-4 w-4" />
                View All Experience
              </Button>
            </Link>
          </AnimatedText>
        </div>
      </section>

      {/* ─── EDUCATION ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-muted/30" id="education">
        <div className="container space-y-10">
          <SectionHeading
            badge="Background"
            title="Education & Certifications"
            description="Academic foundation and technical achievements that shaped my craft."
          />
          <div className="mx-auto grid justify-center gap-6 md:w-full lg:grid-cols-2 max-w-4xl">
            <AnimatedSection delay={0.2} direction="up">
              <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 flex-shrink-0">
                      <Icons.post className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold leading-snug">
                        B.Tech, Computer Science &amp; Engineering
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Ajay Kumar Garg Engineering College, Ghaziabad
                      </p>
                      <p className="text-xs text-muted-foreground/70 italic mt-0.5">
                        Affiliated to AKTU
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                      Relevant Coursework
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["DSA", "OS", "DBMS", "Computer Networks", "OOP"].map(
                        (course, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-primary/8 text-primary border border-primary/15"
                          >
                            {course}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-border/50 text-sm">
                    <span className="text-muted-foreground">Expected Graduation</span>
                    <span className="font-semibold bg-muted px-3 py-1 rounded-lg">
                      May 2028
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3} direction="up">
              <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 flex-shrink-0">
                      <Icons.check className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold">
                      Certifications &amp; Achievements
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 border border-border/40">
                      <Icons.check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-sm">
                          HackerRank Problem Solving Certification
                        </p>
                        <a
                          href="https://www.hackerrank.com/profile/kapilyadav131415"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-500 hover:text-blue-400 hover:underline mt-0.5 inline-flex items-center gap-1"
                        >
                          View Profile
                          <Icons.externalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── CONTRIBUTIONS ────────────────────────────────────────────────── */}
      <section className="py-20" id="contributions">
        <div className="container space-y-10">
          <SectionHeading
            badge="Portfolio"
            title={pagesConfig.contributions.title}
            description={pagesConfig.contributions.description}
          />
          <ContributionCard contributions={featuredContributions} />
          <AnimatedText delay={0.4} className="flex justify-center">
            <Link href="/contributions">
              <Button variant="outline" className="rounded-full px-8">
                <Icons.chevronDown className="mr-2 h-4 w-4" />
                View All Work
              </Button>
            </Link>
          </AnimatedText>
        </div>
      </section>

      {/* ─── BLOGS ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-muted/30" id="blogs">
        <div className="container space-y-10">
          <SectionHeading
            badge="Writing"
            title={pagesConfig.blogs.title}
            description={pagesConfig.blogs.description}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-stretch">
            {featuredBlogs.map((blog, index) => (
              <AnimatedSection
                key={blog.slug}
                delay={0.1 * (index + 1)}
                direction="up"
                className="h-full w-full min-w-0"
              >
                <BlogCard blog={blog} />
              </AnimatedSection>
            ))}
          </div>
          <AnimatedText delay={0.4} className="flex justify-center">
            <Link href="/blogs">
              <Button variant="outline" className="rounded-full px-8">
                <Icons.chevronDown className="mr-2 h-4 w-4" />
                View All Posts
              </Button>
            </Link>
          </AnimatedText>
        </div>
      </section>

      {/* ─── SKILLS ───────────────────────────────────────────────────────── */}
      <section className="py-20" id="skills">
        <div className="container space-y-10">
          <SectionHeading
            badge="Expertise"
            title={pagesConfig.skills.title}
            description={pagesConfig.skills.description}
          />
          <SkillsCard type="featured" />
          <AnimatedText delay={0.4} className="flex justify-center">
            <Link href="/skills">
              <Button variant="outline" className="rounded-full px-8">
                <Icons.chevronDown className="mr-2 h-4 w-4" />
                View All Skills
              </Button>
            </Link>
          </AnimatedText>
        </div>
      </section>
    </ClientPageWrapper>
  );
}
