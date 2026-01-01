"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";
import { Text } from "../components/Text";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function HeaderBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60 shadow-md w-full">
      <div className="w-full h-10 bg-linear-to-t from-urbancare-primary-blue to-urbancare-secondary-blue flex items-center justify-end px-4 sm:px-6 lg:px-8 gap-2 hidden lg:flex">
        <Image
          src="/icons/chevron-right-solid-full.svg"
          alt="Arrow"
          width={16}
          height={16}
          className="invert inline-block motion-safe:animate-[chevron-nudge-x_1.2s_ease-in-out_infinite]"
        />

        <Text size="p" className="text-white text-sm font-poppins font-medium">
          Accedi alle tue spese condominiali:
        </Text>
        <Link href="https://condomini.baslab.it/auth/login/BAS20559">
          <Text
            size="p"
            weight="semibold"
            className="text-urbancare-tertiary-blue underline cursor-pointer"
          >
            AREA PERSONALE
          </Text>
        </Link>
      </div>
      <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-3 items-center h-16 ">
          <button
            type="button"
            className="col-start-1 lg:hidden inline-flex relative items-center justify-center w-9 h-9 rounded-md hover:bg-accent focus:outline-none"
            aria-label="Toggle menu"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`absolute block h-0.5 w-5 bg-current transition-transform text-urbancare-primary-blue duration-300 ease-in-out ${
                open ? "translate-y-0 rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute block h-0.5 w-5 bg-current transition-opacity text-urbancare-primary-blue duration-300 ease-in-out ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute block h-0.5 w-5 bg-current transition-transform text-urbancare-primary-blue duration-300 ease-in-out ${
                open ? "translate-y-0 -rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>

          <Link
            href="/"
            className="col-start-2 justify-self-center lg:col-start-1 lg:justify-self-start font-semibold"
          >
            <Image
              src="/horizontal-logo.svg"
              alt="UrbanCare  Logo"
              width={170}
              height={100}
            />
          </Link>

          <NavigationMenu className="hidden lg:flex col-start-2 justify-self-center h-full">
            <NavigationMenuList className="items-end justify-center gap-12">
              <NavigationMenuItem>
                <NavigationMenuLink data-active={pathname === "/"} asChild>
                  <Link href="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  data-active={pathname === "/servizi"}
                  asChild
                >
                  <Link href="/servizi">Servizi</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  data-active={pathname === "/contatti"}
                  asChild
                >
                  <Link href="/contatti">Contatti</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  data-active={pathname === "/lo-studio"}
                  asChild
                >
                  <Link className="whitespace-nowrap" href="/lo-studio">
                    Lo studio
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link href="/preventivo">
            <Button className="hidden lg:block col-start-3 justify-self-end">
              <p className="tracking-wider">Richiedi un preventivo</p>
            </Button>
          </Link>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 pt-2 space-y-1">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={`block rounded-lg px-3 py-2 font-medium text-urbancare-primary-blue ${
              pathname === "/"
                ? "bg-urbancare-quaternary-blue"
                : "hover:bg-urbancare-quaternary-blue"
            }`}
          >
            <Text
              size="p"
              weight={pathname === "/" ? "bold" : "medium"}
              className="text-urbancare-primary-blue"
            >
              Home
            </Text>
          </Link>
          <Link
            href="/servizi"
            onClick={() => setOpen(false)}
            className={`block rounded-lg px-3 py-2 font-medium text-urbancare-primary-blue ${
              pathname === "/servizi"
                ? "bg-urbancare-quaternary-blue"
                : "hover:bg-urbancare-quaternary-blue"
            }`}
          >
            <Text
              size="p"
              weight={pathname === "/servizi" ? "bold" : "medium"}
              className="text-urbancare-primary-blue"
            >
              Servizi
            </Text>
          </Link>
          <Link
            href="/contatti"
            onClick={() => setOpen(false)}
            className={`block rounded-lg px-3 py-2 font-medium text-urbancare-primary-blue ${
              pathname === "/contatti"
                ? "bg-urbancare-quaternary-blue"
                : "hover:bg-urbancare-quaternary-blue"
            }`}
          >
            <Text
              size="p"
              weight={pathname === "/contatti" ? "bold" : "medium"}
              className="text-urbancare-primary-blue"
            >
              Contatti
            </Text>
          </Link>
          <Link
            href="/lo-studio"
            onClick={() => setOpen(false)}
            className={`block rounded-lg px-3 py-2 font-medium text-urbancare-primary-blue ${
              pathname === "/lo-studio"
                ? "bg-urbancare-quaternary-blue"
                : "hover:bg-urbancare-quaternary-blue"
            }`}
          >
            <Text
              size="p"
              weight={pathname === "/lo-studio" ? "bold" : "medium"}
              className="text-urbancare-primary-blue"
            >
              Lo studio
            </Text>
          </Link>

          <div className="my-3 border-t" />

          <div className="flex flex-col gap-3">
            <Button asChild size="lg" className="w-full">
              <Link href="/preventivo" onClick={() => setOpen(false)}>
                <Text
                  size="p"
                  weight="semibold"
                  className="tracking-wider text-white text-sm"
                >
                  Richiedi un preventivo
                </Text>
              </Link>
            </Button>

            <Button variant="secondary" asChild size="lg" className="w-full">
              <Link
                href="/https://condomini.baslab.it/auth/login/BAS20559"
                onClick={() => setOpen(false)}
              >
                <Text
                  size="p"
                  weight="semibold"
                  className="tracking-wider text-urbancare-primary-blue text-sm"
                >
                  Area Personale
                </Text>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
