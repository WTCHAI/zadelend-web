import { 
  groth16, 
  Groth16Proof, 
  PublicSignals 
} from 'snarkjs';

export type Input = {
  x: number,
  y: number
}

export type OutPut = {
  proof: Groth16Proof, 
  publicSignals: PublicSignals
}

export const generateProof = async (input: Input): Promise<OutPut> => {
  const wasmResponse = await fetch('/square_and_sum.wasm');
  const zkeyResponse = await fetch('/square_and_sum.zkey');

  const wasmBuffer = await wasmResponse.arrayBuffer();
  const zkeyBuffer = await zkeyResponse.arrayBuffer();

  const { proof, publicSignals } = await groth16.fullProve(
    input,
    new Uint8Array(wasmBuffer),
    new Uint8Array(zkeyBuffer)
  );

  // console.log('Proof:', proof);
  // console.log('Public signals:', publicSignals);

  return { proof, publicSignals };
}

export const verifyProof = async (
  proof: Groth16Proof, 
  publicSignals: PublicSignals
): Promise<boolean> => {
  const vkRes = await fetch('/verification_key.json');
  const vKey = await vkRes.json();
  return await groth16.verify(vKey, publicSignals, proof);
}

export const exportSolidityCallData = async ({ proof, publicSignals }: OutPut): Promise<any> => {
  const calldata = await groth16.exportSolidityCallData(proof, publicSignals);

  return JSON.parse(`[${calldata}]`);
}