import { http, createConfig } from "wagmi";
import { sepolia } from "viem/chains";
import { walletConnect } from "wagmi/connectors";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

const metadata = {
  name: "Govt Subsidies",
  description: "Get government subsidies with Anon Aadhaar",
  url: "https://localhost:3000/",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

export const wagmiConfig = createConfig({
  chains: [sepolia],
  connectors: [
    walletConnect({
      projectId,
      metadata,
    }),
  ],
  transports: {
    [sepolia.id]: http(),
  },
});
