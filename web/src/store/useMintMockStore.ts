import { GetLatestTokenId } from "@/feature/deposit/mintNFT";
import { create } from "zustand";

interface MintMockNFTState {
  latestTokenId: number;
  loading: boolean;
  getLatestTokenID: () => Promise<void>;
}

export const useMintMockNFT = create<MintMockNFTState>((set) => ({
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
}));
