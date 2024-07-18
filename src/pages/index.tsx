/* eslint-disable react/no-unescaped-entities */
import { useAnonAadhaar } from "@anon-aadhaar/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
// import { AppContext } from "./_app";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export default function Home() {
  const [anonAadhaar] = useAnonAadhaar();
  // const { setIsTestMode } = useContext(AppContext);
  const { isConnected, address } = useAccount();
  const { open } = useWeb3Modal();
  const router = useRouter();

  
  useEffect(() => {
    if(isConnected){
      router.push('/subsidy')
    }  else if(isConnected && anonAadhaar.status === "logged-in"){
      router.push('/eligibility')
    }
  }, [anonAadhaar, router, isConnected]);

  const handleExploreSubsidy = () => {
    router.push('/subsidy');
  }
 
  return (
    <>
      <main className="flex flex-col min-h-[75vh] mx-auto justify-center items-center w-full p-4">
        <div className="max-w-4xl w-full">
          <h6 className="text-[36px] font-rajdhani font-medium leading-none">
            USING ANON AADHAAR
          </h6>
          <h2 className="text-[90px] font-rajdhani font-medium leading-none">
            Government Subsidies
          </h2>
          <div className="text-md mt-4 mb-8 text-[#717686]">
            Get the State Government Subsidies by proving your state eligibility
            without disclosing your Aadhaar number. This process ensures
            anonymity by utilizing the Aadhaar secure which preserves the
            confidentiality.
          </div>
          <div className="flex w-full gap-8 mb-8">
            {isConnected ? (
              <div>
                <div className="flex gap-4 place-content-center">
              <button
                className="bg-[#009A08] rounded-lg text-white px-6 py-1 font-rajdhani font-medium"
                onClick={() => handleExploreSubsidy}
              >
                Explore Subsidy
              </button>
                </div>
              </div> ) 
            : (
              <button
                className="bg-[#009A08] rounded-lg text-white px-6 py-1 font-rajdhani font-medium"
                onClick={() => open()}
              >
                CONNECT WALLET
              </button>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
