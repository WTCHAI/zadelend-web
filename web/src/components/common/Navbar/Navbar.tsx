"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useConnect, useAccount } from "wagmi";
import { shortenText } from "@/utils/shortenText";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export function Navbar() {
  const { address, isConnected } = useAccount();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-background">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-2xl font-bold text-primary">
          BRAT
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="px-4 py-2 text-sm hover:underline"
                href="/bridge"
              >
                Bridge
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="px-4 py-2 text-sm hover:underline"
                href="/claim"
              >
                Claim
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <ConnectButton showBalance />
    </nav>
  );
}
