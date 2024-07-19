import React, { useState } from 'react';
import {
  convertBigIntToByteArray,
  deserialize,
} from "@anon-aadhaar/core";
import { useAnonAadhaar } from "@anon-aadhaar/react";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import SubsidiesEligibility from '../components/SubsidiesEligibility';
import { EligibilityCriteria } from '../subsidyData';
import { useWeb3Modal } from '@web3modal/wagmi/react';


const Eligibility: React.FC = () => {
  const [anonAadhaar] = useAnonAadhaar();
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const [userAadhaarData, setUserAadhaarData] = useState<EligibilityCriteria>();
  const [aadhaarState, setAadhaarState] = useState<string>("");

 
   useEffect(() => {
    const aaObj = localStorage.getItem("anonAadhaar");
    const anonAadhaarProofs = JSON.parse(aaObj!).anonAadhaarProofs;

    deserialize(
      anonAadhaarProofs[Object.keys(anonAadhaarProofs).length - 1].pcd
    ).then((result) => {
      console.log("anonAadresulthaar", result);

      const byteGenderData = convertBigIntToByteArray(BigInt(result.proof.gender));
      const charConversionGender = String.fromCharCode(...byteGenderData);

      //covert  to byte array and then reverse(the protocol needs to come up with a util func)
      const byteStateData = convertBigIntToByteArray(BigInt(result.proof.state));
      const charConversionState = String.fromCharCode(...byteStateData);
      const reversedStringState = charConversionState.split("").reverse().join("");

      setAadhaarState(reversedStringState);
      setUserAadhaarData({
        ageAbove18: result.proof.ageAbove18 === "1" && true,
        gender: charConversionGender  === "M" ? "M" : charConversionGender === "F" ? "F" : "O",
        state: reversedStringState,
      });
  
    });
  }, [anonAadhaar]);

return (
  <div className="min-h-screen flex items-center justify-center bg-contain bg-no-repeat bg-center bg-[url('../../public/assets/govSubsidyLogo.svg')]">
    {isConnected && userAadhaarData && (
      <SubsidiesEligibility state={aadhaarState} userCriteria={userAadhaarData} />
    )}

    {!isConnected && (
      <button onClick={() => open()}
        type="button"
        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
      >
        You need to connect your wallet first ⬆️
      </button>
    )}
  </div>
);
};

export default Eligibility;
