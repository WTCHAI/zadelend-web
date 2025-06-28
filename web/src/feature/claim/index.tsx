"use client";

import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";

import { useAccount } from "wagmi";

import {
  ETH_ICON,
  SCROLL_ICON,
  USDT_ICON,
} from "@/components/common/Tokens/Icons";

import { ProofContentInfo } from "./proof";

export default function ClaimWithProofTabs() {
  const [activeTab, setActiveTab] = useState("proof");
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
            <ProofContentInfo
              value="proof"
              from={{ name: "Eth Sepolia", icon: ETH_ICON }}
              to={{ name: "Scroll Sepolia", icon: SCROLL_ICON }}
              tokenIcon={USDT_ICON}
              overlayIcon={ETH_ICON}
              networkIcon={ETH_ICON}
              isConnected={isConnected}
              buttonLabel="Deposit"
              setActiveTab={setActiveTab}
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
