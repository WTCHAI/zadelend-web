import { NFT_ABI } from "@/lib/abis";
import { sepolia } from "@wagmi/core/chains";
import { contractConfig, SepoliaContract } from "@/lib/contract";

import {
  waitForTransactionReceipt,
  writeContract,
  readContract,
} from "@wagmi/core";
import { toast } from "sonner";
import { Address } from "viem";

export const MintNFT = async (account: Address) => {
  try {
    const txHash = await writeContract(contractConfig, {
      abi: NFT_ABI,
      address: SepoliaContract.nft,
      functionName: "mint",
      args: [],
      account,
      chainId: sepolia.id,
    });

    return {
      hash: txHash,
      status: "pending" as const,
      getStatus: async () => {
        try {
          const receipt = await waitForTransactionReceipt(contractConfig, {
            hash: txHash,
          });

          toast.success(
            "Transaction confirmed successfully!" +
              receipt.transactionHash.toString()
          );
          return {
            hash: txHash,
            status: receipt.status,
            blockNumber: receipt.blockNumber,
            gasUsed: receipt.gasUsed,
            confirmed: true,
          };
        } catch (error) {
          toast.error("Transaction failed: " + error);
          return {
            hash: txHash,
            status: "failed" as const,
            error: error,
            confirmed: false,
          };
        }
      },
    };
  } catch (error) {
    console.error("Transaction submission failed:", error);
    throw error;
  }
};

export const GetLatestTokenId = async () => {
  const response = await readContract(contractConfig, {
    address: SepoliaContract.nft,
    abi: NFT_ABI,
    functionName: "nextTokenId",
    args: [],
  });
  const latestTokenID = Number(response) - 1;

  return latestTokenID;
};
