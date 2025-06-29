import { TabsContent } from "@/components/ui/tabs";

import { Label } from "@/components/ui/label";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDepositStore } from "@/store/useDepositStore";
import { AssetCard, NetworkCard } from "@/components/common/Cards/cards";
import { DepositNFT } from "./depositNFT";
import { Address, Hex } from "viem";

import { useAccount } from "wagmi";

import { poseidon3 } from "poseidon-lite";
import { toBytes32 } from "@/utils/byte32";
import { ScrollContract, SepoliaContract } from "@/lib/contract";
import { useEffect } from "react";
import { sepolia } from "viem/chains";
import { toast } from "sonner";

type BridgeTabProps = {
  value: string;
  from: { name: string; icon: string };
  to: { name: string; icon: string };
  tokenIcon: string;
  networkIcon: string;
  isConnected: boolean;
  buttonLabel: string;
};

export const DepositContentInfo: React.FC<BridgeTabProps> = ({
  value,
  from,
  to,
  tokenIcon,
  networkIcon,
  isConnected,
}: BridgeTabProps) => {
  const { tokenId, nonce, nullifier } = useDepositStore();
  const { address, chainId: currentChain } = useAccount();

  useEffect(() => {
    if (currentChain !== sepolia.id) {
      toast.warning("Please switch to Sepolia network");
    }
  }, [currentChain]);
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
          onClick={async () => {
            if (!isConnected && !address) return;
            if (value === "deposit") {
              const commitment = poseidon3([
                Number(nullifier),
                Number(nonce),
                100,
              ]);
              console.log("Current commitment:", commitment);
              const byteCommitment = toBytes32(commitment);

              const { txhashed } = await DepositNFT({
                account: address as Address,
                tokenId: BigInt(tokenId),
                amount: 100n,
                commitment: byteCommitment as Hex,
                nftAddress: SepoliaContract.nft as Address,
                receiverAddress: ScrollContract.Loaner as Address,
              });
              toast.success(
                <div>
                  Transaction sent:&nbsp;
                  <a
                    href={`https://sepolia.etherscan.io/tx/${txhashed}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-medium"
                  >
                    View on Etherscan
                  </a>
                </div>
              );
              toast.success(
                <div>
                  Search with transaction hased:&nbsp;
                  <a
                    href={`https://ccip.chain.link/?search=${txhashed}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-medium"
                  >
                    View on CCIP
                  </a>
                </div>
              );
            } else if (value === "withdraw") {
              console.log("execute withdraw logic here");
            }
          }}
        >
          {isConnected ? (
            <span>Deposit your NFT</span>
          ) : (
            <span>Connect Wallet First</span>
          )}
        </Button>
      </div>
    </TabsContent>
  );
};
