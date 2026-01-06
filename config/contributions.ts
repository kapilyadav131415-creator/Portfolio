export interface contributionsInterface {
  repo: string;
  contibutionDescription: string;
  repoOwner: string;
  link: string;
}

export const contributionsUnsorted: contributionsInterface[] = [
  {
    repo: "QR Restaurant Ordering SaaS",
    contibutionDescription:
      "Built a complete QR-based restaurant ordering platform with digital menu management, order tracking, REST APIs, and multi-tenant SaaS architecture.",
    repoOwner: "Kapil Yadav",
    link: "https://github.com/kapilyadav131415-creator",
  },
  {
    repo: "Multi Vendor eCommerce Platform",
    contibutionDescription:
      "Developed a scalable eCommerce platform with vendor onboarding, product management, shopping cart, checkout system, and role-based authentication.",
    repoOwner: "Kapil Yadav",
    link: "https://github.com/kapilyadav131415-creator",
  },
  {
    repo: "Remote Phone Lock System",
    contibutionDescription:
      "Built a Flutter, Kotlin, Node.js, and SQL Server based remote device management system capable of locking Android devices from an admin panel.",
    repoOwner: "Kapil Yadav",
    link: "https://github.com/kapilyadav131415-creator",
  },
  {
    repo: "Online News Portal CMS",
    contibutionDescription:
      "Created a dynamic content management system with article publishing, role management, SEO-friendly routing, and media management.",
    repoOwner: "Kapil Yadav",
    link: "https://github.com/kapilyadav131415-creator",
  },
  {
    repo: "PLC Modbus TCP Integration",
    contibutionDescription:
      "Implemented real-time PLC communication using Modbus TCP with automatic reconnect logic and industrial data monitoring.",
    repoOwner: "Kapil Yadav",
    link: "https://github.com/kapilyadav131415-creator",
  },
];

export const featuredContributions: contributionsInterface[] =
  contributionsUnsorted.slice(0, 3);