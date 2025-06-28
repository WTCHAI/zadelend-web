import { LOAN_WITHDRAWER_ABI } from "@/lib/abis";
import { publicClient, ScrollContract } from "@/lib/contract";
import { bytes32ToBigInt } from "@/utils/byte32";
import { poseidon2, poseidon3 } from "poseidon-lite";

import { MerkleTree } from "fixed-merkle-tree";
import { toast } from "sonner";

export async function getLeafs(
  nullifier: string,
  nonce: string,
  loanAmount: string
) {
  const i_commitment = poseidon3([nullifier, nonce, loanAmount]);
  // console.log("Current commitment:", toBytes32(i_commitment));
  toast.info("Quoting your comitment...");
  const currentBlock = await publicClient.getBlockNumber();
  const logs = await publicClient.getContractEvents({
    abi: LOAN_WITHDRAWER_ABI,
    address: ScrollContract.Loaner,
    eventName: "LeafCommitment",
    fromBlock: 10604488n,
    toBlock: currentBlock,
  });
  const leaf = logs.map((x) => x.args.commitment);
  const leafLength = leaf.length;

  const leaves = [
    19014214495641488759237505126948346942972912379615652741039992445865937985820n,
    19014214495641488759237505126948346942972912379615652741039992445865937985820n,
    19014214495641488759237505126948346942972912379615652741039992445865937985820n,
    19014214495641488759237505126948346942972912379615652741039992445865937985820n,
  ];

  for (let i = 0; i < leafLength; i++) {
    leaves[i] = bytes32ToBigInt(leaf[i] ?? "0x");
  }
  // @ts-expect-error MerkleTree types are not compatible here
  const tree = new MerkleTree(2, leaves, {
    hashFunction: (a, b) => poseidon2([a, b]),
    zeroElement: 0n,
  });

  // console.log("Fetched leaf logs :", Bigleaf);
  // console.log("Leaves:", leaves);
  // console.log("Commitment:", i_commitment);
  // console.log("Index of commitment:", leaves.indexOf(i_commitment));
  toast.success(
    leaves.indexOf(i_commitment) === -1
      ? "We cannot find your commitment! Make sure inpur correct nonce & nullifier"
      : "Quoting completed successfully!"
  );
  // @ts-expect-error invalid commitment not founce in merkle tree
  const { pathElements, pathIndices, pathRoot } = tree.proof(i_commitment);
  return {
    commitment: i_commitment,
    pathElements: pathElements.map((el) => el.toString()),
    pathIndices: pathIndices.map((el) => el.toString()),
    root: pathRoot.toString(),
  };
}
