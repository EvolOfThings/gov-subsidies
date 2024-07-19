/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent } from "react";
import Image from "next/image";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import govSubsidyLogo from "../../public/assets/govSubsidyLogo.svg";
import { shortenAddress } from "@/utils";

export const Header: FunctionComponent = () => {
  const { isConnected, address } = useAccount();
  const { open } = useWeb3Modal();

  return (
    <header className="flex flex-row justify-between">
      <div className="flex flex-row items-center mx-5">
        <Image
          priority
          src={govSubsidyLogo}
          width={50}
          height={50}
          alt="gov Subsidy Logo"
        />
      </div>
      <div className="flex flex-row gap-3 items-center justify-end">
        <div className="flex m-5 items-center space-x-2">
          {isConnected ? (
            <button
              className="bg-blue-950 rounded-lg text-[#009A08] px-8 py-2 hover:bg-black border-2 border-[#009A08] font-rajdhani font-medium"
              onClick={() => open()}
            >
              {address && shortenAddress(address)}
            </button>
          ) : (
            <button
              className="bg-blue-950 rounded-lg text-white px-8 py-3 hover:bg-black font-rajdhani font-medium"
              onClick={() => open()}
            >
              CONNECT WALLET
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
