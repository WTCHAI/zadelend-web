import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";
import { walletConfig } from "../config/wallet";
import { GlobalProviders } from "../providers/GlobalProvider";
import { Navbar } from "@/components/common/Navbar/Navbar";
import { Toaster } from "sonner";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const interMono = Inter({
  variable: "--font-inter-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "zadelend",
  description: " Cross-Chain Asset Collateralized enabling unlinkable, proof-based assets liquid across chains with complete user custody.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    walletConfig,
    (await headers()).get("cookie")
  );
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} ${interMono.variable} min-h-screen from-link-backgroundlight via-link-lightblue/60 to-link-primary/70`}
      >
        <GlobalProviders initialState={initialState}>
          <Navbar />
          {children}
          <Toaster />
        </GlobalProviders>
      </body>
    </html>
  );
}
