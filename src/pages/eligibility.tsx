import React from 'react';
import SubsidiesEligibility from '../components/SubsidiesEligibility';
import { EligibilityCriteria } from '../subsidyData';

const userCriteria: EligibilityCriteria = {
  ageAbove18: true,
  gender: 'female',
  state: 'Sikkim',
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <SubsidiesEligibility state="Sikkim" userCriteria={userCriteria} />
    </div>
  );
};

export default App;
