import { ValidPages } from "./constants";

type PagesConfig = {
  [key in ValidPages]: {
    title: string;
    description: string;
    metadata: {
      title: string;
      description: string;
    };
  };
};

export const pagesConfig: PagesConfig = {
  home: {
    title: "Home",
    description: "Welcome to Kapil  's portfolio website.",
    metadata: {
      title: "Kapil   | Full Stack Developer",
      description:
        "Portfolio of Kapil  , Full Stack Developer specializing in ASP.NET, C#, Node.js, SQL Server, React.js, Flutter, and Enterprise Software Development.",
    },
  },

  skills: {
    title: "Skills",
    description: "Technologies, tools, and frameworks I work with.",
    metadata: {
      title: "Skills | Kapil  ",
      description:
        "Technical skills including ASP.NET, C#, SQL Server, Node.js, React.js, Flutter, Kotlin, REST APIs, and Database Development.",
    },
  },

  projects: {
    title: "Projects",
    description: "Showcasing real-world software projects and solutions.",
    metadata: {
      title: "Projects | Kapil  ",
      description:
        "Explore projects including QR Restaurant SaaS, Multi-Vendor eCommerce Platform, Remote Phone Lock System, PLC Monitoring Solutions, and News Portal CMS.",
    },
  },

  experience: {
    title: "Experience",
    description: "Professional journey and software development experience.",
    metadata: {
      title: "Experience | Kapil  ",
      description:
        "Professional experience in ASP.NET Development, Backend Engineering, REST API Development, SQL Server, PLC Integration, and Enterprise Applications.",
    },
  },

  contact: {
    title: "Contact",
    description: "Let's connect and discuss opportunities.",
    metadata: {
      title: "Contact | Kapil  ",
      description:
        "Get in touch with Kapil   for internships, software development projects, collaborations, and career opportunities.",
    },
  },

  contributions: {
    title: "Featured Work",
    description: "Highlighted software projects and technical achievements.",
    metadata: {
      title: "Featured Work | Kapil  ",
      description:
        "A collection of software projects, enterprise solutions, mobile applications, and backend systems developed by Kapil Yadav.",
    },
  },

  resume: {
    title: "Resume",
    description: "View and download my professional resume.",
    metadata: {
      title: "Resume | Kapil  ",
      description:
        "Professional resume of Kapil Ya dav, Full Stack Developer and Software Engineer.",
    },
  },

  blogs: {
    title: "Blogs",
    description:
      "Articles, tutorials, and insights on software development and technology.",
    metadata: {
      title: "Blogs | Kapil  ",
      description:
        "Read articles about ASP.NET, Node.js, SQL Server, Flutter, REST APIs, Software Development, and Enterprise Applications.",
    },
  },
};