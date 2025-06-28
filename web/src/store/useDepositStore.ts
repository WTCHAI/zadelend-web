import { create } from "zustand";

interface DepositStore {
  tokenId: string;
  nftValues: string;
  nonce: string;
  nullifier: string;

  setTokenId: (address: string) => void;
  setNonce: (nonce: string) => void;
  setNullifier: (nullifier: string) => void;

  reset: () => void;
}

export const useDepositStore = create<DepositStore>((set) => ({
  tokenId: "",
  nftValues: "100",
  nonce: "",
  nullifier: "",
  setTokenId: (address) => set({ tokenId: address }),
  setNonce: (nonce) => set({ nonce }),
  setNullifier: (nullifier) => set({ nullifier }),
  reset: () =>
    set({
      tokenId: "",
      nftValues: "100",

      nonce: "",
      nullifier: "",
    }),
}));
