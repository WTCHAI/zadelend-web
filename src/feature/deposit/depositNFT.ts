import { writeContract, waitForTransactionReceipt } from "@wagmi/core";
import {
  contractConfig,
  SepoliaContract,
  ScrollContract,
} from "@/lib/contract";
import { Address, Hex } from "viem";
import { toast } from "sonner";
import { NFT_ABI, NFT_DEPOSITOR_ABI } from "@/lib/abis";
import { SetupLink } from "./setUpLink";

/**
 * Approves USDC and deposits an NFT.
 */

export const DepositNFT = async ({
  account,
  tokenId,
  commitment,
}: {
  account: Address;
  nftAddress: Address;
  receiverAddress: Address;
  tokenId: bigint;
  amount: bigint;
  commitment: Hex;
}) => {
  try {
    toast.info("Placeing fees by link token");
    await SetupLink(account as Address);

    // 1️⃣ Approve NFT
    toast.info("Approving nft...");
    const approveTx = await writeContract(contractConfig, {
      address: SepoliaContract.nft,
      abi: NFT_ABI,
      functionName: "approve",
      args: [SepoliaContract.depositContract, tokenId],
      account,
    });

    await waitForTransactionReceipt(contractConfig, { hash: approveTx });
    toast.success("token approved!");

    // 2️⃣ Deposit NFT
    toast.info("Depositing NFT..." + tokenId);
    const depositTx = await writeContract(contractConfig, {
      address: SepoliaContract.depositContract,
      abi: NFT_DEPOSITOR_ABI,
      functionName: "depositNft",
      args: [SepoliaContract.nft, tokenId, ScrollContract.Loaner, commitment],
      account,
      gas: 500_000n,
    });

    const receipt = await waitForTransactionReceipt(contractConfig, {
      hash: depositTx,
    });

    return {
      txhashed: receipt.transactionHash.toString(),
      approveTx,
      depositTx,
      success: true,
    };
  } catch (error) {
    console.error("Deposit failed:", error);
    toast.error("Deposit failed: " + (error as Error).message);
    throw error;
  }
};
