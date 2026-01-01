import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const routes = [
    "/",
    "/servizi",
    "/servizi/gestione-contabile",
    "/servizi/amministrazione-condominiale",
    "/servizi/consulenza-condominiale",
    "/servizi/condominio-online",
    "/preventivo",
    "/contatti",
    "/lo-studio",
    "/privacy-policy",
  ];

  const now = new Date();

  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
