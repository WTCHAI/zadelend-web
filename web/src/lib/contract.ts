import {
  Address,
  createPublicClient,
  createWalletClient,
  http,
  parseAbi,
} from "viem";
import { sepolia } from "viem/chains";
import { useAccount, useWalletClient } from "wagmi";

export const SepoliaContract = {
  nft: "0x4B9D25236B30F01edF4D539ae8BDB04CcE029c75" as Address,
  usdc: "0xB58f04f651CDd8be01D3eA3266266Ce640C48C61" as Address,
  desposit: "0x7B21582f11527001CEAD47826c24F0bB997edC76" as Address,
};

export const ScrollContract = {
  Loaner: "0x3B800E554059Fa1c31e3F7FD0DF4BCD581E47aa4" as Address,
  usdc: "0x" as Address,
};

export const publicClient = createPublicClient({
  chain: sepolia,
  batch: {
    multicall: true,
  },
  transport: http(sepolia.rpcUrls.default.http[0], {
    batch: true,
  }),
});

export const { data: walletClient } = useWalletClient();
export type TWalletCleint = typeof walletClient;