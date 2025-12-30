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
    <html lang="en">
      <body className={`${poppins.variable} h-full`}>
        <HeaderBar />
        <div className="pt-[104px] min-h-screen">{children}</div>
        <footer>footer</footer>
      </body>
    </html>
  );
}
