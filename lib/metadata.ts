import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { socialImage } from "@/lib/social-image";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  robots?: Metadata["robots"];
  image?: { url: string; alt: string };
};

export function createPageMetadata({
  title,
  description,
  path,
  image,
  robots = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production" ? { index: false, follow: false } : { index: true, follow: true },
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title: { absolute: `${title} | ${siteConfig.name}` },
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
          url: absoluteUrl(image?.url || socialImage.path),
          ...(!image ? { width: 1200, height: 630 } : {}),
          alt: image?.alt || socialImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [{ url: absoluteUrl(image?.url || socialImage.path), alt: image?.alt || socialImage.alt }],
    },
  };
}
