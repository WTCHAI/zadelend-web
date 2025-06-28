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
import { ProofInput, ProofOutput, useProofStore } from "@/store/useProofStore";
import { toast } from "sonner";
import { getLeafs } from "./getLeafs";
import { useAccount } from "wagmi";
import { poseidon2, poseidon3 } from "poseidon-lite";
import {
  exportSolidityCallData,
  generateProof,
  verifyProof,
} from "@/lib/circuit";
import MerkleTree from "fixed-merkle-tree";
import { isValidElement, useEffect, useState } from "react";
import { ClaimProof } from "./claimToken";

type ProofContentInfoProp = {
  value: string;
  from: { name: string; icon: string };
  to: { name: string; icon: string };
  tokenIcon: string;
  overlayIcon: string;
  networkIcon: string;
  isConnected: boolean;
  buttonLabel: string;
  setActiveTab: (tab: string) => void;
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
  setActiveTab,
}: ProofContentInfoProp) => {
  const { input, setInput, output, setOutput, reset } = useProofStore();
  const { address } = useAccount();
  const [validCallData, setVaidCalled] = useState(output !== null);
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
              try {
                const { commitment, pathElements, pathIndices, root } =
                  await getLeafs(
                    input.nullifier,
                    input.nonce,
                    input.loanAmount
                  );
                // update proof input params state
                setInput({
                  ...input,
                  commitment: commitment.toString(),
                  pathElements: pathElements,
                  pathIndices: pathIndices,
                  root: root,
                } as ProofInput);
              } catch (error) {
                toast.warning("invalid nullifier or nonce");
              }
              setVaidCalled(false);
              return;
            } else if (!validCallData && quoted) {
              // console.log("Generating Proof with input:", input);
              const inputArgs = {
                root: input?.root.toString() ?? "",
                nullifier: input?.commitment.toString() ?? "",
                secret: [input?.nullifier ?? "", input?.nonce.toString() ?? ""],
                loanAmount: "100", //fixed size amount
                pathElements:
                  input?.pathElements.map((el) => el.toString()) ?? [],
                pathIndices:
                  input?.pathIndices.map((el) => el.toString()) ?? [],
              };
              const { calldata } = await GenerateProof(inputArgs);

              // console.log("Proof generated:", a, b, c, publicOutput);
              setOutput(calldata);
              setVaidCalled(calldata !== null);
            } else if (
              output &&
              input &&
              input.commitment &&
              input.root &&
              address
            ) {
              console.log(input, output);
              await ClaimProof(output, input?.commitment, input?.root, address);
              // reset()f
            }
          }}
        >
          {input?.nonce[0] === "" ||
          input?.nullifier === "" ||
          input?.loanAmount === "" ? (
            <div>Generating Proof</div>
          ) : !quoted ? (
            <div>Quoting proof setup</div>
          ) : quoted && !validCallData ? (
            <div>Generating Proof</div>
          ) : validCallData ? (
            <div>Claim yout liquidity</div>
          ) : (
            <div>Generate Proof</div>
          )}
        </Button>
      </div>
    </TabsContent>
  );
};
