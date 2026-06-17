import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";

const baseUrl = "https://latticevisual.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/work", "/services", "/templates", "/process", "/about", "/contact"];
  const projectRoutes = projects.map((project) => `/work/${project.slug}`);

  return [...staticRoutes, ...projectRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.startsWith("/work/") ? 0.7 : 0.8,
  }));
}
