/* eslint-disable react/no-unescaped-entities */
import { LaunchProveModal, useAnonAadhaar } from "@anon-aadhaar/react";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { AppContext } from "./_app";
import { useWeb3Modal } from "@web3modal/wagmi/react";

const LaunchMode = ({
  isTest,
  setIsTestMode,
  address,
}: {
  isTest: boolean;
  setIsTestMode: (isTest: boolean) => void;
  address: string;
}) => {
  return (
    <span onClick={() => setIsTestMode(isTest)}>
      <LaunchProveModal
        nullifierSeed={Math.floor(Math.random() * 1983248)}
        signal={address}
        fieldsToReveal={[
        'revealAgeAbove18',
        'revealGender',
        'revealState',
      ]}
        buttonStyle={{
          borderRadius: "8px",
          border: "solid",
          borderWidth: "1px",
          boxShadow: "none",
          fontWeight: 500,
          borderColor: "#009A08",
          color: "#009A08",
          fontFamily: "rajdhani",
        }}
        buttonTitle={isTest ? "UPLOAD AADHAAR QR" : "USE REAL CREDENTIALS"}
        useTestAadhaar={isTest}
      />
    </span>
  );
};

export default function Subsidy() {
  const { setIsTestMode } = useContext(AppContext);
  const { isConnected, address } = useAccount();
  const { open } = useWeb3Modal();
  const [anonAadhaar] = useAnonAadhaar();
  const router = useRouter();

useEffect(() => {
  if(anonAadhaar.status === "logged-in"){
    router.push('/eligibility')
  }  
}, [anonAadhaar, router]);

 
  return (
    <>
      <main className="flex flex-col min-h-[75vh] mx-auto justify-center items-center w-full p-4">
        <div className="max-w-4xl w-full justify-center items-center">
          <h2 className="text-7xl font-sans text-center font-semibold text-blue-950 leading-none pb-4">
            Government Subsidies
          </h2>
          <p className="text-2xl text-center font-sans mt-10 mb-2  text-slate-900">
           Please upload your Aadhar QR code to see your eligibility
          </p>

          <div className="flex w-full gap-8 mb-8 justify-center">

            {isConnected ? (
              <div>
                <div className="flex gap-4 place-content-center mt-4">
                  <LaunchMode
                    isTest={true}
                    setIsTestMode={setIsTestMode}
                    address={address as string}
                  />
                </div>
              </div> ) 
            
            
            : (
              <button
                className="bg-blue-950 rounded-lg px-10 py-4 mt-10 hover:bg-black  text-white font-rajdhani font-medium"
                onClick={() => open()}
              >
                Please connect your wallet
              </button>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
