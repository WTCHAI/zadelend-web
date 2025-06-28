import { NFT_DEPOSITOR_ABI } from "@/lib/abis";
import { publicClient, SepoliaContract } from "@/lib/contract";

import { toast } from "sonner";

export interface DepositLog {
  nftAddress: string;
  owner: string;
  tokenId: string;
  messageId: string;
}

export async function getDepositLog() {
  toast.info("Quoting event logs...");
  const currentBlock = await publicClient.getBlockNumber();
  const logs = await publicClient.getContractEvents({
    abi: NFT_DEPOSITOR_ABI,
    address: SepoliaContract.depositContract,
    eventName: "NFTDeposit",
    fromBlock: 10604488n,
    toBlock: currentBlock,
  });

  console.log(logs);
  //   const depositLogs: DepositLog[] = logs.map((log) => ({
  //     nftAddress: log.args.nftAddress,
  //     owner: log.args.owner,
  //     tokenId: log.args.tokenId,
  //     messageId: log.args?.messageId ?? "0x",
  //   }));
  //   return depositLogs
}
