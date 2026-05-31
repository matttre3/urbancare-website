import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  robots?: Metadata["robots"];
};

export function createPageMetadata({
  title,
  description,
  path,
  robots = { index: true, follow: true },
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      locale: "it_IT",
      type: "website",
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: "Urbancare - Amministratore condominiale a Milano",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}
