import { TabsContent } from "@/components/ui/tabs";

import { Label } from "@/components/ui/label";

import { ArrowRight, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDepositStore } from "@/store/useDepositStore";
import { AssetCard, NetworkCard } from "@/components/common/Cards/cards";

type ProofContentInfoProp = {
  value: string;
  from: { name: string; icon: string };
  to: { name: string; icon: string };
  tokenIcon: string;
  networkIcon: string;
  isConnected: boolean;
  buttonLabel: string;
};

export const ProofContentInfo = ({
  value,
  from,
  to,
  tokenIcon,
  networkIcon,
  isConnected,
  buttonLabel,
}: ProofContentInfoProp) => {
  const { tokenId } = useDepositStore();

  
  return (
    <TabsContent
      value={value}
      className="space-y-6 transition-all duration-700"
    >
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
              {buttonLabel} {tokenId}
            </span>
          ) : (
            <span>Connect Wallet First</span>
          )}
        </Button>
      </div>
    </TabsContent>
  );
};
