"use client";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link as LinkIcon } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-100 w-full backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        <Link
          href="/"
          className="flex text-2xl font-extrabold items-center justify-center gap-2 tracking-tight text-link-primary/80 hover:text-link-primary/95 transition-colors duration-400"
        >
          <LinkIcon />
          ZADELEND
        </Link>

        {/* Center Nav */}
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink
                className="text-base font-medium text-link-dark transition-colors hover:text-link-primary/90 duration-400 bg-transparent hover:bg-transparent focus:bg-transparent focus:text-link-primary/90"
                href="/deposit"
              >
                Deposit
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="text-base font-medium text-link-dark transition-colors hover:text-link-primary/90 duration-400 bg-transparent hover:bg-transparent focus:bg-transparent focus:text-link-primary/90"
                href="/withdraw"
              >
                Withdraw
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="text-base font-medium text-link-dark transition-colors hover:text-link-primary/90 duration-400 bg-transparent hover:bg-transparent focus:bg-transparent focus:text-link-primary/90"
                href="/workflow"
              >
                How It Works
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="text-base font-medium text-link-dark transition-colors hover:text-link-primary/90 duration-400 bg-transparent hover:bg-transparent focus:bg-transparent focus:text-link-primary/90"
                href="/explorer"
              >
                Explorer
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Wallet */}
        <div className="">
          <ConnectButton
            chainStatus="icon"
            showBalance={false}
            accountStatus={"full"}
            label="Connect"
          />
        </div>
      </div>
    </nav>
  );
}
