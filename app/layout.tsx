import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { HeaderBar } from "../components/HeaderBar";
import Footer from "../components/Footer";
import { ViewTransition } from "react";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Urbancare – Amministratore condominiale Milano",
    template: "%s | Urbancare – Amministratore condominiale Milano",
  },
  description:
    "Amministratore condominiale a Milano e provincia. Gestione condominio trasparente, interventi rapidi, supporto dedicato. Richiedi un preventivo gratuito.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
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
          <div className="pt-[104px] min-h-[calc(100vh-264px)]">{children}</div>
          <Footer />
        </ViewTransition>
      </body>
    </html>
  );
}
