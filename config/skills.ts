import {
  SiDotnet,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiReact,
  SiJavascript,
  SiFirebase,
  SiGit,
  SiC,
  SiNextdotjs,
  SiGithub,
  SiPostman,
  SiAndroid
} from "react-icons/si";

import { TbApi, TbCode, TbDatabase, TbCpu } from "react-icons/tb";

export interface skillsInterface {
  name: string;
  description: string;
  rating: number;
  icon: any;
}

export const skillsUnsorted: skillsInterface[] = [
  {
    name: "JavaScript",
    description: "Create dynamic and interactive web applications.",
    rating: 5,
    icon: SiJavascript,
  },
  {
    name: "C#",
    description: "Develop enterprise applications and business solutions using C# and .NET.",
    rating: 5,
    icon: SiDotnet,
  },
  {
    name: "C",
    description: "Core systems programming and memory management.",
    rating: 4,
    icon: SiC,
  },
  {
    name: "React.js",
    description: "Build modern and responsive user interfaces.",
    rating: 4,
    icon: SiReact,
  },
  {
    name: "Next.js",
    description: "Full-stack React framework for production-grade web applications.",
    rating: 3,
    icon: SiNextdotjs,
  },
  {
    name: "Node.js",
    description: "Develop scalable backend applications and APIs.",
    rating: 5,
    icon: SiNodedotjs,
  },
  {
    name: "Express.js",
    description: "Build high-performance web APIs and services.",
    rating: 5,
    icon: SiExpress,
  },
  {
    name: "ASP.NET WebForms",
    description: "Build dynamic enterprise web applications and admin panels.",
    rating: 5,
    icon: SiDotnet,
  },
  {
    name: "REST API Design",
    description: "Design and implement secure API architectures.",
    rating: 5,
    icon: TbApi,
  },
  {
    name: "SQL Server",
    description: "Enterprise database management and stored procedures.",
    rating: 5,
    icon: TbDatabase,
  },
  {
    name: "PostgreSQL",
    description: "Manage relational databases for scalable applications.",
    rating: 4,
    icon: SiPostgresql,
  },
  {
    name: "Firebase (Realtime DB)",
    description: "Integrate authentication, messaging, and real-time cloud services.",
    rating: 4,
    icon: SiFirebase,
  },
  {
    name: "Git &  ",
    description: "Version control and collaborative software development.",
    rating: 5,
    icon: SiGithub,
  },
  {
    name: "Postman",
    description: "API development, testing, and documentation.",
    rating: 5,
    icon: SiPostman,
  },
  {
    name: "Visual Studio & VS Code",
    description: "Professional IDEs for modern development workflows.",
    rating: 5,
    icon: TbCode,
  },
  {
    name: "Android Device Admin APIs",
    description: "System-level Android integrations and device management.",
    rating: 4,
    icon: SiAndroid,
  },
  {
    name: "Data Structures & Algorithms",
    description: "Core computer science problem solving.",
    rating: 5,
    icon: TbCode,
  },
  {
    name: "DBMS & Operating Systems",
    description: "Strong fundamentals in database management systems and OS concepts.",
    rating: 4,
    icon: TbDatabase,
  }
];

export const skills = skillsUnsorted
  .slice()
  .sort((a, b) => b.rating - a.rating);

export const featuredSkills = skills.slice(0, 6);
