// eslint-disable-next-line @typescript-eslint/no-explicit-any

import { exportSolidityCallData, generateProof } from "@/lib/circuit";

import { ProofOutput } from "@/store/useProofStore";
import { toast } from "sonner";

export const GenerateProof = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- generateProof input type is flexible
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
