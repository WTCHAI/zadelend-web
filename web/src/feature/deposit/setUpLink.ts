import { NFT_ABI } from "@/lib/abis";
import { contractConfig, SepoliaContract } from "@/lib/contract";

import {
  waitForTransactionReceipt,
  writeContract,
  readContract,
} from "@wagmi/core";
import { toast } from "sonner";
import { Address, parseEther } from "viem";

export const SetupLink = async (account: Address) => {
  const linkAbi = [
    {
      constant: false,
      inputs: [
        { name: "_to", type: "address" },
        { name: "_value", type: "uint256" },
        { name: "_data", type: "bytes" },
      ],
      name: "transferAndCall",
      outputs: [{ name: "success", type: "bool" }],
      type: "function",
    },
  ];
  try {
    const txHash = await writeContract(contractConfig, {
      abi: linkAbi,
      address: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
      functionName: "transferAndCall",
      args: [SepoliaContract.depositContract, parseEther("1"), "0x"],
      account,
    });

    return {
      hash: txHash,
      status: "pending" as const,
      getStatus: async () => {
        try {
            console.log("sending send 1 link ")
          const receipt = await waitForTransactionReceipt(contractConfig, {
            hash: txHash,
          });

          toast.success(
              "Transaction confirmed successfully link transfer to contract!" +
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
