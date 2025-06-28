import { create } from "zustand";

export type ProofInput = {
  commitment: string;
  root: string;
  nullifier: string;
  nonce: string;
  loanAmount: string;
  pathElements: string[];
  pathIndices: string[];
};

export type ProofOutput = [string[], string[][], string[], string[]];

type ProofState = {
  input: ProofInput | null;
  output: ProofOutput | null;
  setInput: (input: ProofInput) => void;
  setOutput: (output: ProofOutput) => void;
  reset: () => void;
};

export const useProofStore = create<ProofState>()((set) => ({
  input: {
    commitment: "",
    root: "",
    nullifier: "",
    nonce: "",
    loanAmount: "100",
    pathElements: [],
    pathIndices: [],
  },
  output: null,
  setInput: (input) => set({ input }),
  setOutput: (output) => set({ output }),
  reset: () => set({ input: null, output: null }),
}));
