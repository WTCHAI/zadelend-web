import { LOAN_WITHDRAWER_ABI } from "@/lib/abis";
import { exportSolidityCallData } from "@/lib/circuit";
import { publicClient, ScrollContract } from "@/lib/contract";
import { useProofStore } from "@/store/useProofStore";
import { bytes32ToBigInt } from "@/utils/byte32";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { groth16, Groth16Proof, PublicSignals } from "snarkjs";
import { toast } from "sonner";

export type ProofInput = {
  root: string;
  nullifier: string;
  nonce: string[];
  loanAmount: string;
  pathElements: string[];
  pathIndices: string[];
};

export type OutPut = {
  proof: Groth16Proof;
  publicSignals: PublicSignals;
};

export const useGenerateProofMutation = () => {
  const { setOutput } = useProofStore();
  const proof = useMutation({
    mutationFn: async (input: ProofInput): Promise<OutPut> => {
      const [wasmResp, zkeyResp] = await Promise.all([
        fetch("/circom/withdraw.wasm"),
        fetch("/circom/withdraw.zkey"),
      ]);

      const [wasmBuf, zkeyBuf] = await Promise.all([
        wasmResp.arrayBuffer(),
        zkeyResp.arrayBuffer(),
      ]);

      const { proof, publicSignals } = await groth16.fullProve(
        input,
        new Uint8Array(wasmBuf),
        new Uint8Array(zkeyBuf)
      );

      toast.success("Proof generated successfully");
      return { proof, publicSignals };
    },
  });

  useEffect(() => {
    if (!proof.data) return;

    (async () => {
      try {
        const callData = await exportSolidityCallData({
          proof: proof.data.proof,
          publicSignals: proof.data.publicSignals,
        });
        setOutput({
          proof: proof.data?.proof,
          publicSignals: proof.data?.publicSignals,
          calldata: callData,
        });
      } catch (error) {
        toast.error("Failed to export Solidity calldata");
      }
    })();
  }, [proof.data]);
  return proof;
};

// export const gettingProofLeafs = async (nonce: string[], nullifier: string) => {
//   const events = await publicClient.readContract({
//     address: ScrollContract.Loaner, // Replace with your contract address
//     abi: LOAN_WITHDRAWER_ABI,
//     functionName: "LeafCommitment",
//     args: [nullifier, nonce],
//   });
//   // const events = await contract.queryFilter(
//   //   'LeafCommitment',
//   //   10604124,
//   //   'latest'
//   // );

//   const { args } = events[0];
//   const [leafCommitment, leafIndex] = args;

//   // const commitment = poseidonHash([nullifier, secret, loanAmount]);
//   const commitment = bytes32ToBigInt(leafCommitment);

//   const leaves = [
//     19014214495641488759237505126948346942972912379615652741039992445865937985820n,
//     19014214495641488759237505126948346942972912379615652741039992445865937985820n,
//     19014214495641488759237505126948346942972912379615652741039992445865937985820n,
//     19014214495641488759237505126948346942972912379615652741039992445865937985820n,
//   ];
//   leaves[Number(leafIndex)] = commitment;

//   const tree = new MerkleTree(TREE_LEVELS, leaves, {
//     hashFunction: (a, b) => poseidonHash([a, b]),
//     zeroElement: 0n,
//   });

//   const { pathElements, pathIndices, pathRoot } = tree.proof(commitment);
// };
