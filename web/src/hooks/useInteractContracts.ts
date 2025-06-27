import { create } from "zustand";
import { toast } from "sonner";
import { Address, Hex } from "viem";
import {
  publicClient,
  SepoliaContract,
  ScrollContract,
  TWalletCleint,
} from "@/lib/contract";
import { LOAN_WITHDRAW_ABI, NFT_DEPOSITOR_ABI, USDC_ABI as ERC20_ABI, NFT_ABI } from "@/lib/abis";
import { poseidonHash } from "@/utils/poseidon";
import { toBytes32 } from "@/utils/byte32";

type InteractState = {
  mintNFT: (walletClient: TWalletCleint) => Promise<void>;
  getUserNFTs: (walletClient: TWalletCleint) => Promise<bigint[]>;
  deposit: (
    walletClient: TWalletCleint,
    amount: bigint,
    tokenId: bigint
  ) => Promise<void>;
  getLeaves: () => Promise<Hex[]>;
  claim: (walletClient: TWalletCleint, noteHash: Hex) => Promise<void>;
};

export const useInteractContract = create<InteractState>(() => ({
  mintNFT: async (walletClient) => {
    try {
      toast.info("Minting NFT...");
      const [account] = await walletClient.getAddresses();

      const txHash = await walletClient.writeContract({
        address: SepoliaContract.nft,
        abi: NFT_ABI,
        functionName: "mint",
        args: [account],
        account,
      });

      await publicClient.waitForTransactionReceipt({ hash: txHash });
      toast.success(`NFT minted: ${txHash}`);
    } catch (err) {
      toast.error("Mint failed");
      console.error(err);
    }
  },

  getUserNFTs: async (walletClient) => {
    try {
      const [account] = await walletClient.getAddresses();

      const balance: bigint = await publicClient.readContract({
        address: SepoliaContract.nft,
        abi: NFT_DEPOSITOR_ABI,
        functionName: "balanceOf",
        args: [account],
      });

      const tokenIds: bigint[] = [];
      for (let i = 0n; i < balance; i++) {
        const tokenId: bigint = await publicClient.readContract({
          address: SepoliaContract.nft,
          abi: NFT_DEPOSITOR_ABI,
          functionName: "tokenOfOwnerByIndex",
          args: [account, i],
        });
        tokenIds.push(tokenId);
      }

      return tokenIds;
    } catch (err) {
      toast.error("Failed to fetch owned NFTs");
      console.error(err);
      return [];
    }
  },

  deposit: async (walletClient, amount, tokenId) => {
    try {
      const [account] = await walletClient.getAddresses();

      toast.info("Approving USDC...");
      const approveTx = await walletClient.writeContract({
        address: SepoliaContract.usdc,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [SepoliaContract.depositContract, amount],
        account,
      });

      await publicClient.waitForTransactionReceipt({ hash: approveTx });

      toast.info("Depositing...");
      const commitment = await poseidonHash([amount, tokenId, amount]);
      const bytes32Commitment = toBytes32(commitment);

      const txHash = await walletClient.writeContract({
        address: SepoliaContract.depositContract,
        abi: NFT_DEPOSITOR_ABI,
        functionName: "depositNft",
        args: [SepoliaContract.nft, tokenId, account, bytes32Commitment],
        account,
      });

      await publicClient.waitForTransactionReceipt({ hash: txHash });
      toast.success("Deposit successful");
    } catch (err) {
      toast.error("Deposit failed");
      console.error(err);
    }
  },

  getLeaves: async () => {
    try {
      const events = await publicClient.getContractEvents({
        address: ScrollContract.Loaner,
        abi: LOAN_WITHDRAW_ABI,
        eventName: "LeafCommitment",
        fromBlock: 8291489n,
      });

      return events.map((e) => e.args.commitment!);
    } catch (err) {
      toast.error("Failed to fetch leaves");
      console.error(err);
      return [];
    }
  },

  claim: async (walletClient, noteHash) => {
    try {
      const [account] = await walletClient.getAddresses();

      toast.info("Claiming...");
      const txHash = await walletClient.writeContract({
        address: ScrollContract.Loaner,
        abi: LOAN_WITHDRAW_ABI,
        functionName: "loanWithdraw",
        args: [],
        account,
      });

      await publicClient.waitForTransactionReceipt({ hash: txHash });
      toast.success("Claim successful");
    } catch (err) {
      toast.error("Claim failed");
      console.error(err);
    }
  },
}));
