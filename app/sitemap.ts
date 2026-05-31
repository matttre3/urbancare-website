import { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
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

  const lastModified = new Date("2026-05-29T00:00:00Z");

  return routes.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
