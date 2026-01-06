import { ValidSkills } from "./constants";

export interface ExperienceInterface {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: Date;
  endDate: Date | "Present";
  description: string[];
  achievements: string[];
  skills: ValidSkills[];
  companyUrl?: string;
  logo?: string;
}

export const experiences: ExperienceInterface[] = [
  {
    id: "symbolic",
    position: "Software Developer",
    company: "Symbolic India Software Solutions",
    location: "Ghaziabad, India",
    startDate: new Date("2023-01-01"),
    endDate: "Present",
    description: [
      "Developed and maintained ASP.NET WebForms applications for business automation and enterprise workflows.",
      "Built RESTful APIs using Node.js and Express.js for scalable client-server communication.",
      "Optimized SQL Server queries and stored procedures to improve application performance.",
      "Integrated industrial PLC devices using Modbus TCP for real-time data monitoring and processing.",
    ],
    achievements: [
      "Developed multiple production-grade ASP.NET applications used by real-world clients.",
      "Reduced database response times through query optimization and indexing strategies.",
      "Implemented real-time PLC communication with automatic reconnect mechanisms.",
      "Designed and deployed secure REST APIs for enterprise software solutions.",
      "Collaborated with teams on debugging, testing, deployment, and production support.",
    ],
    skills: [
      "ASP.NET WebForms",
      "ASP.NET Core API",
      "C#",
      "Node.js",
      "Express.js",
      "SQL Server",
      "REST API",
      "Stored Procedures",
      "Modbus TCP",
      "PLC Integration",
      "Git",
    ],
    companyUrl: "#",
    logo: "/experience/symbolic-logo.png",
  },
];