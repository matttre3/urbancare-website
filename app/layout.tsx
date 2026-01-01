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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
