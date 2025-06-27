import { TabsContent } from "@/components/ui/tabs";

import { Label } from "@/components/ui/label";

import { ArrowRight, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDepositStore } from "@/store/useDepositStore";
import {
  AssetCard,
  AssetNFTCard,
  NetworkCard,
} from "@/components/common/Cards/cards";
import { useGenerateProofMutation } from "@/hooks/useGenProof";
import { ProofInput, useProofStore } from "@/store/useProofStore";
import { toast } from "sonner";

type ProofContentInfoProp = {
  value: string;
  from: { name: string; icon: string };
  to: { name: string; icon: string };
  tokenIcon: string;
  overlayIcon: string;
  networkIcon: string;
  isConnected: boolean;
  buttonLabel: string;
};

export const ProofContentInfo = ({
  value,
  from,
  to,
  tokenIcon,
  overlayIcon,
  networkIcon,
  isConnected,
  buttonLabel,
}: ProofContentInfoProp) => {
  const proofGeneration = useGenerateProofMutation();
  const { input } = useProofStore();
  const quoted =
    Array.isArray(input?.pathElements) &&
    input.pathElements.length > 0 &&
    Array.isArray(input?.pathIndices) &&
    input.pathIndices.length > 0 &&
    input?.root !== "";
  return (
    <TabsContent
      value={value}
      className="space-y-6 transition-all duration-700"
    >
      <div className="flex flex-col bg-white/60 ring-1 hover:ring-2 ring-white/40 shadow-md backdrop-blur-3xl rounded-3xl p-5 hover:shadow-xl gap-4">
        <div className="flex">
          <div className="text-sm font-semibold text-grayy-700 bg-white/80 rounded-xl p-4 text-center w-full">
            Proving you are the owner of the Asset
          </div>
        </div>

        <AssetNFTCard
          title="Assets"
          token="NFTs ZADELEND"
          tokenIcon={tokenIcon}
          overlayIcon={overlayIcon}
          networkIcon={networkIcon}
        />

        <Button
          className={cn(
            "w-full py-6 text-lg font-semibold rounded-2xl shadow-lg cursor-pointer",
            "bg-link-primary/85 hover:bg-link-primary/95 transition-all duration-300"
          )}
          disabled={
            input?.nonce[0] === "" ||
            input?.nullifier === "" ||
            input?.loanAmount === ""
          }
          onClick={(e) => {
            e.preventDefault();
            if (!quoted) {
              // getLeaf information execution

              return;
            }
            const inputArgs: ProofInput = {
              nullifier: input?.nullifier.toString() ?? "",
              nonce: [input?.nonce.toString() ?? ""],
              loanAmount: "100", //fixed size amount
              pathElements: ["we"],
              pathIndices: ["d"],
              root: "df",
              pathRoot: "df",
            };
            proofGeneration.mutate(inputArgs, {
              onSuccess: (data) => {
                console.log("Storing Proof successfully");
              },
              onError: (error) => {
                console.error("Error generating proof:");
              },
            });
          }}
        >
          {input?.nonce[0] === "" ||
          input?.nullifier === "" ||
          input?.loanAmount === "" ? (
            <div>Generating Proof</div>
          ) : quoted ? (
            <div>Generating Proof</div>
          ) : (
            <div>Quoting proof setup</div>
          )}
        </Button>
      </div>
    </TabsContent>
  );
};
