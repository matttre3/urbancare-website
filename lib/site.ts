const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.urbancare-amministrazioni.com";

export const siteConfig = {
  name: "Urbancare",
  legalName: "Noele Romano - Urban Care",
  url: rawSiteUrl.replace(/\/$/, ""),
  description:
    "Amministrazione condominiale a Garbagnate Milanese e nei comuni vicini: contabilità chiara, comunicazione con i condomini e gestione organizzata.",
  email: "info@urbancare-amministrazioni.com",
  pec: "urbancare@legalmail.it",
  phone: "+39 327 530 6234",
  phoneHref: "tel:+393275306234",
  location: "Garbagnate Milanese",
  region: "MI",
  localAreas: ["Garbagnate Milanese", "Cesate", "Arese", "Lainate", "Bollate", "Senago", "Caronno Pertusella"],
  areaServed: ["Garbagnate Milanese", "Cesate", "Arese", "Lainate", "Bollate", "Senago", "Caronno Pertusella", "Milano", "Provincia di Milano"],
} as const;

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
