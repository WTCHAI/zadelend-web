import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { sepolia, arbitrumSepolia, scrollSepolia } from "wagmi/chains";

export const walletConfig = createConfig({
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [sepolia.id]: http(),
    [arbitrumSepolia.id]: http(),
    [scrollSepolia.id]: http(),
  },
  chains: [sepolia, arbitrumSepolia, scrollSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
  batch: {
    multicall: true,
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof walletConfig;
  }
}
