import { LOAN_WITHDRAWER_ABI } from "@/lib/abis";
import { exportSolidityCallData, verifyProof } from "@/lib/circuit";

import { ProofOutput, useProofStore } from "@/store/useProofStore";
import { groth16 } from "snarkjs";
import { toast } from "sonner";

export type ProofInputParam = {
  root: string;
  nullifier: string;
  secret: string[];
  loanAmount: string;
  pathElements: string[];
  pathIndices: string[];
};

export const GenerateProof = async (
  input: ProofInputParam
): Promise<ProofOutput> => {
  const wasmResponse = await fetch("/circom/withdraw.wasm");
  const zkeyResponse = await fetch("/circom/withdraw.wasm");

  const wasmBuffer = await wasmResponse.arrayBuffer();
  const zkeyBuffer = await zkeyResponse.arrayBuffer();

  console.log("input ", input);
  const { proof, publicSignals } = await groth16.fullProve(
    input,
    new Uint8Array(wasmBuffer),
    new Uint8Array(zkeyBuffer)
  );
  const valid = await verifyProof(proof, publicSignals);
  console.log(valid);

  toast.success("Proof generated successfully");
  const callData = await exportSolidityCallData({
    proof: proof,
    publicSignals: publicSignals,
  });
  console.log("calldata : ", callData);
  toast.success(`Proof test verification: ${valid ? "Valid" : "Invalid"}`);

  toast.success("format Proof to Solidity calldata");
  return { calldata: callData };
};

//   useEffect(() => {
//     if (!proof.data) return;

//     (async () => {
//       try {
//         const callData = await exportSolidityCallData({
//           proof: proof.data.proof,
//           publicSignals: proof.data.publicSignals,
//         });
//         setOutput({
//           proof: proof.data?.proof,
//           publicSignals: proof.data?.publicSignals,
//           calldata: callData,
//         });
//       } catch (error) {
//         toast.error("Failed to export Solidity calldata");
//       }
//     })();
//   }, [proof.data]);
//   return proof;
// };

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
