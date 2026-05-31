const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://urbancare-amministrazioni.com";

export const siteConfig = {
  name: "Urbancare",
  legalName: "Noele Romano - Urban Care",
  url: rawSiteUrl.replace(/\/$/, ""),
  description:
    "Amministratore condominiale a Milano e provincia. Gestione trasparente, strumenti digitali e supporto dedicato per il tuo condominio.",
  email: "urbancaregest@gmail.com",
  pec: "urbancare@legalmail.it",
  phone: "+39 327 530 6234",
  phoneHref: "tel:+393275306234",
  location: "Garbagnate Milanese",
  region: "MI",
  areaServed: ["Milano", "Provincia di Milano", "Garbagnate Milanese"],
} as const;

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
