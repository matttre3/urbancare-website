"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60 border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <button
            type="button"
            className="sm:hidden inline-flex relative items-center justify-center w-9 h-9 rounded-md  hover:bg-accent focus:outline-none "
            aria-label="Toggle menu"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`absolute block h-0.5 w-5 bg-current transition-transform duration-300 ease-in-out ${
                open ? "translate-y-0 rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute block h-0.5 w-5 bg-current transition-opacity duration-300 ease-in-out ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute block h-0.5 w-5 bg-current transition-transform duration-300 ease-in-out ${
                open ? "translate-y-0 -rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>

          <NavigationMenu className="hidden sm:flex">
            <NavigationMenuList className="flex-wrap">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/docs">Docs</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/docs">Docs</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/docs">Docs</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/docs">Docs</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link href="/" className="font-semibold">
            <Image
              src="/horizontal-logo.svg"
              alt="UrbanCare  Logo"
              width={170}
              height={100}
            />
          </Link>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`sm:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 pt-2 space-y-2">
          <Link
            href="/docs"
            onClick={() => setOpen(false)}
            className="block rounded-md px-3 py-2 hover:bg-accent"
          >
            Docs
          </Link>
          <Link
            href="/docs"
            onClick={() => setOpen(false)}
            className="block rounded-md px-3 py-2 hover:bg-accent"
          >
            Docs
          </Link>
          <Link
            href="/docs"
            onClick={() => setOpen(false)}
            className="block rounded-md px-3 py-2 hover:bg-accent"
          >
            Docs
          </Link>
          <Link
            href="/docs"
            onClick={() => setOpen(false)}
            className="block rounded-md px-3 py-2 hover:bg-accent"
          >
            Docs
          </Link>
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
