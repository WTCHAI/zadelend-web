"use client";

import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import { toast } from "sonner";
import { useCopyToClipboard } from "@/hooks/useCopy";
import { Address } from "viem";
import { useMintMockNFT } from "@/store/useMintMockStore";
import { NetworkCard } from "@/components/common/Cards/cards";

import { useAccount } from "wagmi";
import { MintNFT } from "./mintNFT";
import { SepoliaContract } from "@/lib/contract";

type MintContentInfoProps = {
  value: string;
  from: { name: string; icon: string };
  to: { name: string; icon: string };
  tokenIcon: string;
  networkIcon: string;
  isConnected: boolean;
  buttonLabel: string;
};

export const MintContentInfo = ({
  from,
  isConnected,
}: MintContentInfoProps) => {
  const { latestTokenId, getLatestTokenID } = useMintMockNFT();
  const { handleCopy: FactoryCopy } = useCopyToClipboard(SepoliaContract.nft);
  const { address } = useAccount();
  return (
    <TabsContent value="mint" className="space-y-6 transition-all duration-700">
      <div className="bg-white/60 ring-1 hover:ring-2 ring-white/40 shadow-md backdrop-blur-3xl rounded-3xl p-5 hover:shadow-xl">
        <div>
          <Label className="text-gray-600 font-medium mb-3 block">
            Network
          </Label>
          <NetworkCard name={from.name} icon={from.icon} isSelected={false} />
        </div>

        {/* Mint Button */}
        <Button
          className={cn(
            "w-full mt-6 py-6 text-lg font-semibold rounded-2xl shadow-lg",
            isConnected
              ? "bg-link-primary/85"
              : "bg-link-primary/40 text-black cursor-not-allowed opacity-85"
          )}
          disabled={!isConnected}
          onClick={async () => {
            if (!isConnected || !address) return;
            try {
              const { hash } = await MintNFT(address as Address);

              toast.success(
                <div>
                  Transaction sent:&nbsp;
                  <a
                    href={`https://sepolia.etherscan.io/tx/${hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-medium"
                  >
                    View on Etherscan
                  </a>
                </div>
              );
              await getLatestTokenID();
            } catch (err) {
              toast.error("Mint failed");
              console.error(err);
            }
          }}
        >
          <Wallet className="w-5 h-5 mr-2" />
          {isConnected ? (
            <span>Mint your NFT</span>
          ) : (
            <span>Connect Wallet First</span>
          )}
        </Button>

        {/* NFT Factory Address */}
        <div className="text-xs text-gray-600 mt-4">
          <span className="font-medium">Factory Address:</span>{" "}
          <span
            className="text-blue-700 hover:underline cursor-pointer"
            onClick={() => {
              FactoryCopy();
              toast.success("Factory address copied");
            }}
          >
            {SepoliaContract.nft}
          </span>
        </div>

        {/* Token ID List */}
        {latestTokenId !== 0 ? (
          <div className="bg-white/50 backdrop-blur-xl rounded-xl p-4 mt-4 space-y-2">
            <h4 className="text-gray-700 font-semibold text-sm">
              Minted Token IDs
            </h4>
            <div className="flex justify-between items-center text-sm font-mono bg-white/70 px-3 py-2 rounded-lg border border-gray-200">
              {latestTokenId}
            </div>
          </div>
        ) : undefined}
      </div>
    </TabsContent>
  );
};
