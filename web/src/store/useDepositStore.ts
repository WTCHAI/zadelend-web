import { create } from "zustand";

interface DepositStore {
  tokenId: string;
  ContractFactoryAddress: string;
  nftValues: string

  nonce: string;
  nullifier: string;

  setTokenId: (address: string) => void;
  setContractFactoryAddress: (address: string) => void;

  setNonce: (nonce: string) => void;
  setNullifier: (nullifier: string) => void;

  reset: () => void;
}

export const useDepositStore = create<DepositStore>((set) => ({
  tokenId: "",
  ContractFactoryAddress: "0x4B9D25236B30F01edF4D539ae8BDB04CcE029c75",
  nftValues: "100",
  nonce: "",
  nullifier: "",

  setTokenId: (address) => set({ tokenId: address }),
  setContractFactoryAddress: (address) =>
    set({ ContractFactoryAddress: address }),

  setNonce: (nonce) => set({ nonce }),
  setNullifier: (nullifier) => set({ nullifier }),

  reset: () =>
    set({
      tokenId: "",
      ContractFactoryAddress: "",
      nftValues: "100",

      nonce: "",
      nullifier: "",
    }),
}));
