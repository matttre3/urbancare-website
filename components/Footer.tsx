import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Text } from "./Text";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-white/10 bg-urbancare-primary-blue text-white">
      <div className="px-5 py-6 sm:px-10 sm:py-8 md:px-20">
        <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <div className="text-center lg:text-left">
            <Text size="p" className="text-white/90">
              <span className="font-semibold">{currentYear}</span>{" "}
              {siteConfig.name} - {siteConfig.location}
            </Text>
          </div>

          <Link
            href="/"
            className="mx-auto cursor-pointer transition-opacity hover:opacity-80"
            aria-label="Vai alla home"
          >
            <Image
              src="/horizontal-logo.svg"
              alt="UrbanCare Logo"
              width={220}
              height={53}
              className="h-9 w-auto brightness-0 invert sm:h-10"
            />
          </Link>

          <div className="flex flex-col items-center gap-1 text-center lg:items-end lg:text-right">
            <div>
              <Link
                href="/privacy-policy"
                className="underline decoration-white/50 underline-offset-4"
              >
                <Text size="p" className="text-white/90">
                  Privacy Policy
                </Text>
              </Link>
            </div>
            <div>
              <Text size="p" className="text-white/90">
                <span className="font-semibold">P.IVA</span> 13746130965
              </Text>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
