"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { Wallet, ArrowRight } from "lucide-react";
import { useAccount } from "wagmi";

import { cn } from "@/lib/utils";
import {
  ETH_ICON,
  SCROLL_ICON,
  TokenIcon,
  TokenPairIcon,
  USDT_ICON,
} from "@/components/common/Tokens/Icons";
import { AmountCard, AssetCard, NetworkCard } from "@/feature/deposit/cards";

type BridgeTabProps = {
  value: string;
  from: { name: string; icon: string };
  to: { name: string; icon: string };
  amount: string;
  onAmountChange: (val: string) => void;
  tokenIcon: string;
  networkIcon: string;
  isConnected: boolean;
  buttonLabel: string;
};

const TabContentInfo = ({
  value,
  from,
  to,
  amount,
  onAmountChange,
  tokenIcon,
  networkIcon,
  isConnected,
  buttonLabel,
}: BridgeTabProps) => (
  <TabsContent value={value} className="space-y-6">
    <div className="bg-white/60 ring-1 hover:ring-2 ring-white/40 shadow-md backdrop-blur-3xl rounded-3xl p-5 hover:shadow-xl ">
      <div className="flex w-full items-center justify-between mb-2">
        <div>
          <Label className="text-gray-600 font-medium mb-3 block">From</Label>
          <NetworkCard name={from.name} icon={from.icon} isSelected={false} />
        </div>

        <div className="flex h-full items-end justify-end">
          <ArrowRight className="w-6 h-6 text-gray-400 translate-y-[1.5vh]" />
        </div>

        <div>
          <Label className="text-gray-600 font-medium mb-3 block">To</Label>
          <NetworkCard name={to.name} icon={to.icon} isSelected={false} />
        </div>
      </div>

      <AssetCard
        title="Assets"
        token="NFTs ZADELEND"
        amount={amount}
        onAmountChange={onAmountChange}
        tokenIcon={tokenIcon}
        networkIcon={networkIcon}
      />

      <AmountCard
        title="You Send"
        token="USDT"
        amount={amount}
        onAmountChange={onAmountChange}
        tokenIcon={tokenIcon}
        networkIcon={networkIcon}
      />

      <Button
        className={cn(
          "w-full mt-8 py-6 text-lg font-semibold rounded-2xl shadow-lg",
          isConnected
            ? "bg-link-primary/85"
            : "bg-link-primary/40 text-black cursor-not-allowed opacity-85"
        )}
        disabled={!isConnected}
        onClick={() => {
          if (!isConnected) return;
          if (value === "deposit") {
            console.log("execute deposit logic here");
          } else if (value === "withdraw") {
            console.log("execute withdraw logic here");
          }
        }}
      >
        <Wallet className="w-5 h-5 mr-2" />
        {isConnected ? (
          <span>
            {buttonLabel} {amount} USDT
          </span>
        ) : (
          <span>Connect Wallet First</span>
        )}
      </Button>
    </div>
  </TabsContent>
);

export default function DepositWithTabs() {
  const [activeTab, setActiveTab] = useState("deposit");
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
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
                value="deposit"
                className={`py-4 px-6 rounded-2xl font-semibold text-lg transition-all backdrop-blur-3xl hover:bg-white/30 duration-300 hover:ring1 hover:ring-bg-white/50 hover:shadow-md ${
                  activeTab === "deposit"
                    ? "bg-white/60  text-grayy-800 shadow-lg"
                    : "text-gray-500 hover:text-grayy-700 transparent"
                }`}
              >
                Deposit
              </TabsTrigger>
              <TabsTrigger
                value="withdraw"
                className={`py-4 px-6 rounded-2xl font-semibold text-lg transition-all backdrop-blur-3xl hover:bg-white/30 duration-300 hover:ring1 hover:ring-bg-white/50 hover:shadow-md ${
                  activeTab === "withdraw"
                    ? "bg-white/60 text-grayy-800 shadow-lg"
                    : "text-gray-500 hover:text-grayy-700 bg-transparent"
                }`}
              >
                Withdraw
              </TabsTrigger>
            </TabsList>

            <TabContentInfo
              value="deposit"
              from={{ name: "Ethereum", icon: ETH_ICON }}
              to={{ name: "Scroll", icon: SCROLL_ICON }}
              amount={depositAmount}
              onAmountChange={setDepositAmount}
              tokenIcon={USDT_ICON}
              networkIcon={ETH_ICON}
              isConnected={isConnected}
              buttonLabel="Deposit"
            />
            <TabContentInfo
              value="withdraw"
              from={{ name: "Scroll", icon: SCROLL_ICON }}
              to={{ name: "Ethereum", icon: ETH_ICON }}
              amount={withdrawAmount}
              onAmountChange={setWithdrawAmount}
              tokenIcon={USDT_ICON}
              networkIcon={SCROLL_ICON}
              isConnected={isConnected}
              buttonLabel="Withdraw"
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
