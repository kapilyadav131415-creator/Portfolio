import { ValidCategory, ValidExpType, ValidSkills } from "./constants";

interface PagesInfoInterface {
  title: string;
  imgArr: string[];
  description?: string;
}

interface DescriptionDetailsInterface {
  paragraphs: string[];
  bullets: string[];
}

export interface ProjectInterface {
  id: string;
  type: ValidExpType;
  companyName: string;
  category: ValidCategory[];
  shortDescription: string;
  websiteLink?: string;
  githubLink?: string;
  techStack: ValidSkills[];
  startDate: Date;
  endDate: Date;
  companyLogoImg: any;
  descriptionDetails: DescriptionDetailsInterface;
  pagesInfoArr: PagesInfoInterface[];
}

export const Projects: ProjectInterface[] = [
 {
  id: "ecommerce",
  companyName: "Multi Vendor eCommerce Platform",
  type: "Personal",
  category: ["Full Stack", "Backend", "Frontend"],

  shortDescription:
    "Multi-vendor eCommerce platform with vendor onboarding, inventory management, shopping cart and checkout system.",

  techStack: [
    "ASP.NET WebForms",
    "ASP.NET Core API",
    "SQL Server",
    "C#"
  ],

  startDate: new Date("2023-05-01"),
  endDate: new Date("2024-01-01"),

  companyLogoImg: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",

  descriptionDetails: {
    paragraphs: [
      "Built a scalable multi-vendor eCommerce solution supporting vendors, customers, and administrators.",
      "Implemented product management, order management, and secure authentication modules."
    ],

    bullets: [
      "Vendor onboarding system.",
      "Shopping cart and checkout workflow.",
      "Role-based authentication.",
      "SQL Server stored procedures optimization.",
      "Admin dashboard and analytics."
    ]
  },
  pagesInfoArr: []
},
  {
  id: "qr-restaurant",
  companyName: "QR Restaurant Ordering SaaS",
  type: "Personal",
  category: ["Full Stack", "Backend", "Frontend"],
  shortDescription:
    "Cloud-based QR restaurant ordering platform with multi-tenant SaaS architecture and real-time order management.",

  techStack: [
    "React.js",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "REST API"
  ],

  startDate: new Date("2024-01-01"),
  endDate: new Date("2024-06-01"),

  companyLogoImg: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",

  descriptionDetails: {
    paragraphs: [
      "Developed a complete QR-based restaurant ordering platform allowing customers to scan QR codes and place orders directly from mobile devices.",
      "Implemented multi-tenant SaaS architecture supporting multiple restaurants with isolated data and branding."
    ],

    bullets: [
      "Built digital menu management system.",
      "Developed restaurant order tracking workflow.",
      "Created REST APIs for ordering and checkout.",
      "Generated dynamic QR codes for tables and takeaway orders."
    ]
  },
  pagesInfoArr: []
},
  {
  id: "news-portal",

  companyName: "Online News Portal CMS",

  type: "Personal",

  category: [
    "Full Stack",
    "Frontend"
  ],

  shortDescription:
    "Dynamic news publishing platform with content management and role-based administration.",

  techStack: [
    "ASP.NET WebForms",
    "SQL Server",
    "C#"
  ],

  startDate: new Date("2023-08-01"),
  endDate: new Date("2023-12-01"),

  companyLogoImg: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",

  descriptionDetails: {
    paragraphs: [
      "Developed a complete content management system for news publishing and administration.",
      "Implemented article publishing workflows and SEO-friendly routing."
    ],

    bullets: [
      "Role-based admin panel.",
      "Content moderation workflow.",
      "SEO-friendly URLs.",
      "Media upload management."
    ]
  },
  pagesInfoArr: []
},
 
];

export const featuredProjects = Projects.slice(0, 3);
