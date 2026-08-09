import { http, createConfig } from 'wagmi';
import { polygonAmoy, sepolia, localhost } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

export const config = createConfig({
  chains: [polygonAmoy, sepolia, localhost],
  connectors: [
    injected(), // C'est tout ce qu'il faut pour MetaMask et les portefeuilles du navigateur !
  ],
  transports: {
    [polygonAmoy.id]: http(),
    [sepolia.id]: http(),
    [localhost.id]: http(),
  },
  ssr: true,
});