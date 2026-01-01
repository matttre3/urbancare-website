import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Text } from "./Text";

export default function Footer() {
  return (
    <footer className="bg-urbancare-primary-blue text-white mt-20">
      <div className="px-5 sm:px-10 md:px-20 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
          <div className="justify-self-start md:justify-self-start">
            <Text size="p" className="text-white/90">
              <span className="font-semibold">2024</span> Garbagnate Milanese
            </Text>
          </div>

          <div className="justify-self-center">
            <Image
              src="/urbancare-pittogramma-white.svg"
              alt="UrbanCare Logo"
              width={140}
              height={32}
            />
          </div>

          <div className="justify-self-start md:justify-self-end text-right">
            <div>
              <Link href="/privacy-policy" className="hover:underline">
                <Text size="p" className="text-white/90">
                  Privacy Policy
                </Text>
              </Link>
            </div>
            <div>
              <Text size="p" className="text-white/90">
                <span className="font-semibold">P.IVA</span> 23123213231231231
              </Text>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
