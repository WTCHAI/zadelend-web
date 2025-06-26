import { create } from "zustand";

interface MintMockNFTState {
  ownedNFTs: string[];
  loading: boolean;
  getUserNFTs: (userAddress: string) => Promise<void>;
  onMintNFT: () => Promise<void>;
}

export const useMintMockNFT = create<MintMockNFTState>((set, get) => ({
  ownedNFTs: ["123", "124", "128"],
  loading: false,

  getUserNFTs: async (userAddress: string) => {
    try {
      console.log("getting nft");
      //   const { ContractFactoryAddress } = useDepositStore.getState();
      //   set({ loading: true });

      //   const tokenIds = await useReadContract({
      //     address: ContractFactoryAddress as `0x${string}`,
      //     abi: ContractAbi,
      //     functionName: "getOwnedNFTs",
      //     args: [userAddress],
      //   });

      //   set({ ownedNFTs: tokenIds as number[] });
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
