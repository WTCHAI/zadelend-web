import { buildPoseidon } from "circomlibjs";

export const poseidonHash = async (inputs: bigint[] | bigint): Promise<bigint> => {
  const poseidon = await buildPoseidon();
  const F = poseidon.F;

  const inputArray = Array.isArray(inputs) ? inputs : [inputs];
  const bigints = inputArray.map((x) => BigInt(x));

  const result = poseidon(bigints);
  return BigInt(F.toString(result));
};