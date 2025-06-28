import { LOAN_WITHDRAWER_ABI } from "@/lib/abis";
import { contractConfig, ScrollContract } from "@/lib/contract";
import { ProofOutput } from "@/store/useProofStore";
import { toBytes32 } from "@/utils/byte32";
import { waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { Address } from "viem";
import { scrollSepolia } from "@wagmi/core/chains";

export async function ClaimProof(
  callData: ProofOutput,
  commitment: string,
  root: string,
  account: Address
) {
  const root32 = toBytes32(BigInt(root));
  console.log("Claiming proof with commitment:", commitment);
  console.log("Root in bytes32:", root32);
  console.log("callData:", callData);

  console.log(
    "formatted: ",
    toBytes32(BigInt(commitment)),
    root32,
    callData[0].map((e) => BigInt(e)) as [bigint, bigint],
    callData[1].map((arr) => arr.map((e) => BigInt(e))) as [
      [bigint, bigint],
      [bigint, bigint]
    ],
    callData[2].map((e) => BigInt(e)) as [bigint, bigint],
    callData[3].map((e) => BigInt(toBytes32(BigInt(e)))) as [bigint]
  );

  //   toast.info("Claiming proof...");

  const claimTx = await writeContract(contractConfig, {
    address: ScrollContract.Loaner,
    abi: LOAN_WITHDRAWER_ABI,
    functionName: "loanWithdraw",
    args: [
      toBytes32(BigInt(commitment)),
      root32,
      callData[0].map((e) => BigInt(e)) as [bigint, bigint],
      callData[1].map((arr) => arr.map((e) => BigInt(e))) as [
        [bigint, bigint],
        [bigint, bigint]
      ],
      callData[2].map((e) => BigInt(e)) as [bigint, bigint],
      callData[3].map((e) => BigInt(toBytes32(BigInt(e)))) as [bigint],
    ],
    account,
    chainId: scrollSepolia.id,
  });

  const receipt = await waitForTransactionReceipt(contractConfig, {
    hash: claimTx,
  });

  return receipt.transactionHash.toString();
}
