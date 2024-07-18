import React from 'react';
import { Subsidy, EligibilityCriteria } from '../subsidyData';
import { checkEligibility } from '../utils';
import { generateSubsidies } from '../subsidyData';

type SubsidiesEligibilityProps = {
  state: string;
  userCriteria: EligibilityCriteria;
};

const SubsidiesEligibility: React.FC<SubsidiesEligibilityProps> = ({ state, userCriteria }) => {
  const subsidies: Subsidy[] = generateSubsidies(state);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Government Subsidies</h1>
      <ul className="space-y-4">
        {subsidies.map((subsidy, index) => {
          const isEligible = checkEligibility(userCriteria, subsidy.eligibility);
          return (
            <li key={index} className="flex items-center">
              <span className={`mr-2 text-xl ${isEligible ? 'text-green-500' : 'text-red-500'}`}>
                {isEligible ? '✔️' : '❌'}
              </span>
              <div>
                <h2 className="text-lg font-semibold">{subsidy.name}</h2>
                <p>{subsidy.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SubsidiesEligibility;
