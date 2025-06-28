"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useAccount } from "wagmi";

import {
  ETH_ICON,
  SCROLL_ICON,
  USDT_ICON,
} from "@/components/common/Tokens/Icons";

import { MintContentInfo } from "./mint";
import { DepositContentInfo } from "./deposit";

export default function DepositWithTabs() {
  const [activeTab, setActiveTab] = useState("mint");
  const { isConnected } = useAccount();

  return (
    <section className="h-screen w-screen absolute top-0 z-0">
      <div className="min-h-screen bg-gradient-to-br from-link-backgroundlight via-link-lightblue/60 to-link-primary/70  flex items-center justify-center p-4 ">
        <div className="w-full max-w-md">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            {/* Tab Headers */}
            <TabsList className="grid grid-cols-2 mb-8 bg-transparent p-0 gap-4">
              <TabsTrigger
                value="mint"
                className={`py-4 px-6 rounded-2xl font-semibold text-lg transition-all backdrop-blur-3xl hover:bg-white/30 duration-300 hover:ring1 hover:ring-bg-white/50 hover:shadow-md ${
                  activeTab === "mint"
                    ? "bg-white/60 text-grayy-800 shadow-lg"
                    : "text-gray-500 hover:text-grayy-700 bg-transparent"
                }`}
              >
                Mint
              </TabsTrigger>
              <TabsTrigger
                value="deposit"
                className={`py-4 px-6 rounded-2xl font-semibold text-lg transition-all backdrop-blur-3xl hover:bg-white/30 duration-300 hover:ring1 hover:ring-bg-white/50 hover:shadow-md ${
                  activeTab === "deposit"
                    ? "bg-white/60  text-grayy-800 shadow-lg"
                    : "text-gray-500 hover:text-grayy-700 transparent"
                }`}
              >
                Deposit
              </TabsTrigger>
            </TabsList>

            <DepositContentInfo
              value="deposit"
              from={{ name: "Eth Sepolia", icon: ETH_ICON }}
              to={{ name: "Scroll Sepolia", icon: SCROLL_ICON }}
              tokenIcon={USDT_ICON}
              networkIcon={ETH_ICON}
              isConnected={isConnected}
              buttonLabel="Deposit"
            />
            <MintContentInfo
              value="mint"
              from={{ name: "Eth Sepolia", icon: ETH_ICON }}
              to={{ name: "Scroll Sepolia", icon: SCROLL_ICON }}
              tokenIcon={USDT_ICON}
              networkIcon={ETH_ICON}
              isConnected={isConnected}
              buttonLabel="Deposit"
            />
          </Tabs>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">
              Powered by{" "}
              <span className="text-gray-700 font-medium">Chainlink CCIP</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
