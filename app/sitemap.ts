import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dannyrodriguez.online",
      lastModified: new Date("2026-08-16"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://dannyrodriguez.online/contact",
      lastModified: new Date("2026-08-16"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
