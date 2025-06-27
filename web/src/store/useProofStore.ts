import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Groth16Proof, PublicSignals } from "snarkjs";

export type ProofInput = {
  root: string;
  nullifier: string;
  nonce: string[];
  loanAmount: string;
  pathElements: string[];
  pathIndices: string[]
  pathRoot: string 
};

export type ProofOutput = {
  proof: Groth16Proof;
  publicSignals: PublicSignals;
  calldata?: [string[], string[][], string[], string[]];
};

type ProofState = {
  input: ProofInput | null;
  output: ProofOutput | null;
  setInput: (input: ProofInput) => void;
  setOutput: (output: ProofOutput) => void;
  reset: () => void;
};

export const useProofStore = create<ProofState>()(
  persist(
    (set) => ({
      input: null,
      output: null,
      setInput: (input) => set({ input }),
      setOutput: (output) => set({ output }),
      reset: () => set({ input: null, output: null }),
    }),
    {
      name: "zk-proof-store",
      version: 1,
    }
  )
);
