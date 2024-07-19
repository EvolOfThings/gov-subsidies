import React from 'react';
import { Subsidy, EligibilityCriteria } from '../subsidyData';
import { checkEligibility } from '../utils';
import { generateSubsidies } from '../subsidyData';
// import govSubsidyLogoSquare from '/public/assets/govSubsidyLogoSquare.png';

type SubsidiesEligibilityProps = {
  state: string;
  userCriteria: EligibilityCriteria;
};

const SubsidiesEligibility: React.FC<SubsidiesEligibilityProps> = ({ state, userCriteria }) => {
  const subsidies: Subsidy[] = generateSubsidies(state);
  return (
    <div className="p-4 w-9/12 bg-black/70 shadow-md rounded">
      
      <h2 className="text-5xl font-sans bg-slate-600/85 rounded text-center font-semibold text-yellow-600 leading-none pb-4 mb-4">
            Government Subsidies
          </h2>
      <ul className="space-y-2">
        {subsidies.map((subsidy, index) => {
          const isEligible = checkEligibility(userCriteria, subsidy.eligibility);
          return (
            <li key={index} className={`flex items-center rounded-md pt-2 pb-2 ${isEligible ? 'bg-green-500/60' : 'bg-red-500/60'}`}>
              <span className={`mr-4 ml-2 text-xl ${isEligible ? 'text-green-500/85' : 'text-red-500/85'}`}>
                {isEligible ? '✔️' : '❌'}
              </span>
              <div className={`p-2 flex-1`}>
                <h2 className="text-lg font-semibold">{subsidy.name}</h2>
                <p>{subsidy.description}</p>
              </div>
              <span className={`mr-2 text-lg font-bold	`} style={{ justifySelf: 'flex-end' }}>
                {isEligible ? 'ELIGIBLE' : 'NOT ELIGIBLE'}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SubsidiesEligibility;
