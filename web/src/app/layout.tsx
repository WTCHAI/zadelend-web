import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { cookieToInitialState } from "wagmi";
import { headers } from "next/headers";
import { walletConfig } from "../config/wallet";
import { GlobalProviders } from "../providers/GlobalProvider";
import { Navbar } from "@/components/common/Navbar/Navbar";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const interMono = Inter({
  variable: "--font-inter-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pomwha",
  description: "Bridge your assets with zk technology",
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
        className={`${interSans.variable} ${interMono.variable} backdrop-blur-sm bg-gradient-to-br from-link-backgroundlight to-blue-50`}
      >
        <GlobalProviders initialState={initialState}>
          <Navbar />
          {children}
        </GlobalProviders>
      </body>
    </html>
  );
}
