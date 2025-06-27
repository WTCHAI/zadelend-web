import {
  LOAN_WITHDRAWER_ABI,
  NFT_ABI,
  NFT_DEPOSITOR_ABI,
  USDC_ABI,
} from "./abis";
import { http, createConfig, getAccount } from "@wagmi/core";
import { sepolia, scroll } from "@wagmi/core/chains";
import { Address } from "viem";

export const SepoliaContract = {
  nft: "0x4B9D25236B30F01edF4D539ae8BDB04CcE029c75" as Address,
  usdc: "0xB58f04f651CDd8be01D3eA3266266Ce640C48C61" as Address,
  depositContract: "0x067A84705698F63AF3342417F085DEd0287f9740" as Address,
};

export const ScrollContract = {
  Loaner: "0xd3433BfB79dD273d0bF342696165A259C6284b73" as Address,
  usdc: "0x3832f87b02724D953e08906CaF3C73d84Ef08570" as Address,
};

export const contractConfig = createConfig({
  chains: [scroll, sepolia],
  transports: {
    [scroll.id]: http(),
    [sepolia.id]: http(),
  },
});

export const { connector, address: AccountAddress }  = getAccount(contractConfig)

// Contract configurations for writeContracts
export const ContractConfigs = {
  mintNFT: () => ({
    address: SepoliaContract.nft,
    abi: NFT_ABI,
    functionName: "mint",
  }),
  approveNFT: (spender: Address, tokenId: bigint) => ({
    address: SepoliaContract.usdc,
    abi: NFT_ABI,
    functionName: "approve",
    args: [spender, tokenId],
  }),
  depositNFT: (
    nftAddress: Address,
    tokenId: bigint,
    receiver: Address,
    commitment: string
  ) => ({
    address: SepoliaContract.depositContract,
    abi: NFT_DEPOSITOR_ABI,
    functionName: "depositNft",
    args: [nftAddress, tokenId, receiver, commitment],
  }),
  loanWithdraw: (
    nullifier: string,
    root: string,
    a: number[],
    b: number[][],
    c: number[],
    pubSignals: number[]
  ) => ({
    address: ScrollContract.Loaner,
    abi: LOAN_WITHDRAWER_ABI,
    functionName: "loanWithdraw",
    args: [nullifier, root, a, b, c, pubSignals],
  }),
};
