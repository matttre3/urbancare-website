import type { Metadata } from "next";
import "./globals.css";
import { HeaderBar } from "../components/HeaderBar";
import Footer from "../components/Footer";
import { ViewTransition } from "react";
import { absoluteUrl, siteConfig } from "@/lib/site";

import localFont from "next/font/local";
const poppins = localFont({
  src: [
    {
      path: "./fonts/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: "Urbancare | Amministratore condominiale Milano",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: absoluteUrl("/"),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Urbancare | Amministratore condominiale Milano",
    description: siteConfig.description,
    url: absoluteUrl("/"),
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
    title: "Urbancare | Amministratore condominiale Milano",
    description: siteConfig.description,
    images: [absoluteUrl("/opengraph-image")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${poppins.variable} h-full`}>
        <ViewTransition>
          <HeaderBar />
          <div className="min-h-[calc(100vh-224px)] pt-16 lg:min-h-[calc(100vh-264px)] lg:pt-[104px]">
            {children}
          </div>
          <Footer />
        </ViewTransition>
      </body>
    </html>
  );
}
