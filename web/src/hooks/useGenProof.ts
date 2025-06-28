import { LOAN_WITHDRAWER_ABI } from "@/lib/abis";
import {
  exportSolidityCallData,
  generateProof,
  verifyProof,
} from "@/lib/circuit";

import { ProofOutput } from "@/store/useProofStore";
import { toast } from "sonner";

export const GenerateProof = async (
  input: any
): Promise<{ calldata: ProofOutput }> => {
  const { proof, publicSignals } = await generateProof(input);
  // const valid = await verifyProof(proof, publicSignals);
  // console.log(valid);

  toast.success("Proof generated successfully");
  const callData = await exportSolidityCallData({
    proof: proof,
    publicSignals: publicSignals,
  });

  toast.success(`Proof Generated : ${callData ? "Success" : "Failed"}`);

  toast.success("format Proof to Solidity calldata");
  return { calldata: callData };
};
