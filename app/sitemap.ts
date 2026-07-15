import type { MetadataRoute } from "next";

const SITE_URL = "https://shahadat-engineering-portfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date("2026-07-15"),
      changeFrequency: "monthly",
      priority: 1,
      images: [
        `${SITE_URL}/images/projects/shahadat-engineering-portfolio-v3.png`,
      ],
    },
  ];
}
