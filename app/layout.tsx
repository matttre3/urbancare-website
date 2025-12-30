import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { HeaderBar } from "../components/HeaderBar";

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
    <>
      <HeaderBar />
      <html lang="en">
        <body className="h-full">{children}</body>
      </html>
      <footer>footer</footer>
    </>
  );
}
