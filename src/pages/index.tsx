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
      <main className="flex flex-col min-h-[75vh] mx-auto justify-center items-center w-full p-4 ">
        <div className="max-w-5xl w-full">
          <h2 className="text-8xl font-sans font-semibold text-blue-950 leading-none pb-4 mb-10">
            Government Subsidies
          </h2>
          <p className="text-[26px] font-rajdhani font-medium leading-none">
            USING ANON AADHAAR
          </p>
          <p className="text-3xl font-sans mt-10 mb-8 text-slate-900">
            Check Government Subsidies by proving your Indian nationality
            without disclosing your Aadhaar number. 
          </p>
          <div className="flex w-full gap-8 mb-8 justify-center">
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
                className="bg-blue-950 rounded-lg text-lg text-white px-10 py-4 font-rajdhani font-medium mt-8 hover:bg-black"
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
