/* eslint-disable react/no-unescaped-entities */
import { LaunchProveModal, useAnonAadhaar } from "@anon-aadhaar/react";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { AppContext } from "./_app";
import { useWeb3Modal } from "@web3modal/wagmi/react";

// This is a trick to enable having both modes in under the same page.
// This could be removed and only the <LaunchProveModal /> could be displayed.

// pass fieldsToReveal to <LaunchProveModal /> to get fields
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
        'revealPinCode',
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
        buttonTitle={isTest ? "USE TEST CREDENTIALS" : "USE REAL CREDENTIALS"}
        useTestAadhaar={isTest}
      />
    </span>
  );
};

export default function Subsidy() {
  const [anonAadhaar] = useAnonAadhaar();
  const { setIsTestMode } = useContext(AppContext);
  const { isConnected, address } = useAccount();
  const { open } = useWeb3Modal();
  const router = useRouter();

  useEffect(() => {
    // if (anonAadhaar.status === "logged-in") {
    //   router.push("./vote");
    // }
    if(isConnected){
      router.push('/')
    }  else if(isConnected && anonAadhaar.status === "logged-in"){
      router.push('/')
    }
  }, [anonAadhaar, router]);

 
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
                  {/* <LaunchMode
                    isTest={false}
                    setIsTestMode={setIsTestMode}
                    address={address as string}
                  /> */}

                  {/* TODO: this will go into dirrefct page, after getting the proof and selecting the scheme */}
                  <LaunchMode
                    isTest={true}
                    setIsTestMode={setIsTestMode}
                    address={address as string}
                  />

              {/* <button
                className="bg-[#009A08] rounded-lg text-white px-6 py-1 font-rajdhani font-medium"
                onClick={() => open()}
              >
                Explore
              </button> */}


                </div>
              </div> ) 
            
            
            : (
              <button
                className="bg-[#009A08] rounded-lg text-white px-6 py-1 font-rajdhani font-medium"
                onClick={() => open()}
              >
                YOU MUST BE CONNECTED TO CONTINUE
              </button>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
