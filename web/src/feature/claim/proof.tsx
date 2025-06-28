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
import { GenerateProof, ProofInputParam } from "@/hooks/useGenProof";
import { ProofInput, useProofStore } from "@/store/useProofStore";
import { toast } from "sonner";
import { getLeafs } from "./getLeafs";
import { useAccount } from "wagmi";
import { poseidon3 } from "poseidon-lite";

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
  const { input, setInput } = useProofStore();
  const { address } = useAccount();
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
          onClick={async (e) => {
            e.preventDefault();
            if (!quoted && address) {
              // GettingLeave function
              if (!input?.nullifier || !input?.nonce) {
                toast.error("Please provide nullifier and nonce first.");
                return;
              }
              console.log("Fetching leafs for nullifier:", input.nullifier);
              console.log("Nonce:", input.nonce);
              console.log("Loan Amount:", input.loanAmount);
              // Fetching leafs
              const { pathElements, pathIndices, root } = await getLeafs(
                input.nullifier,
                input.nonce,
                input.loanAmount
              );
              // update proof input params state
              setInput({
                ...input,
                pathElements: pathElements,
                pathIndices: pathIndices,
                root: root,
              } as ProofInput);
              return;
            }
            // console.log("Generating Proof with input:", input);
            // const inputArgs: ProofInputParam = {
            //   root: input?.root ?? "",
            //   nullifier: input?.nullifier.toString() ?? "",
            //   secret: [input?.nullifier ?? "", input?.nonce.toString() ?? ""],
            //   loanAmount: "100", //fixed size amount
            //   pathElements:
            //     input?.pathElements.map((el) => el.toString()) ?? [],
            //   pathIndices: input?.pathIndices.map((el) => el.toString()) ?? [],
            // };
            const i_commitment = poseidon3([12, 11, 100]);
            console.log("Current commitment:", i_commitment.toString());
            const inputArgs: ProofInputParam = {
              root: "3568792632707908471653242077392028502802971188580429106389237628370425210300",
              nullifier: "12",
              secret: ["12", "11"],
              loanAmount: "100",
              pathElements: [
                "19014214495641488759237505126948346942972912379615652741039992445865937985820",
                "6735486976153207481917817300106879816087474366714266275682876014984271171285",
              ],
              pathIndices: ["0", "1"],
            };
            console.log(inputArgs, "inputArgs for proof generation");
            await GenerateProof(inputArgs);
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
