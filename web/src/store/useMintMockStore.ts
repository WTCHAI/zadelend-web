import { GetLatestTokenId } from "@/feature/deposit/mintNFT";
import { create } from "zustand";

interface MintMockNFTState {
  latestTokenId: number;
  loading: boolean;
  getLatestTokenID: () => Promise<void>;
  onMintNFT: () => Promise<void>;
}

export const useMintMockNFT = create<MintMockNFTState>((set, get) => ({
  latestTokenId: 0,
  loading: false,

  getLatestTokenID: async () => {
    try {
      console.log("getting nft");
      const latestTokenID = await GetLatestTokenId();
      set({ loading: true });
      set({ latestTokenId: latestTokenID });
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    } finally {
      set({ loading: false });
    }
  },

  onMintNFT: async () => {
    try {
      console.log("Minting NFT...");
      //   const { ContractFactoryAddress } = useDepositStore.getState();
      //   const { address } = getAccount();

      //   set({ loading: true });

      //   const tx = await writeContract({
      //     address: ContractFactoryAddress as `0x${string}`,
      //     abi: ContractAbi,
      //     functionName: "mint",
      //     args: [], // Add args if your mint takes any
      //     account: address,
      //   });

      //   console.log("Mint tx:", tx);
    } catch (err) {
      console.error("Minting failed:", err);
    } finally {
      set({ loading: false });
    }
  },
}));
