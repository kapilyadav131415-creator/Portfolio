import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kapil  | Full Stack Developer",
    short_name: "Kapil  ",
    description:
      "Full Stack Developer specializing in ASP.NET, Node.js, SQL Server, REST APIs, React.js, and scalable web applications. Building modern software solutions and enterprise-grade systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f172a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "64x64",
        type: "image/x-icon",
      },
      {
        src: "/favicon.ico",
        sizes: "64x64",
        type: "image/x-icon",
        purpose: "maskable",
      },
    ],
    categories: [
      "portfolio",
      "full stack developer",
      "software engineer",
      "web development",
      "asp.net",
      "nodejs",
      "react",
      "backend development",
      "api development",
    ],
    lang: "en",
    dir: "ltr",
    scope: "/",
  };
}