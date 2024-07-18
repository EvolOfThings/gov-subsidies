export type EligibilityCriteria = {
    ageAbove18?: boolean;
    gender?: 'male' | 'female' | 'other';
    state: string;
  };
  
export type Subsidy = {
    name: string;
    description: string;
    eligibility: EligibilityCriteria;
  };
  
export  type StateSubsidies = {
    state: string;
    subsidies: Subsidy[];
  };
  
export function generateSubsidies(state: string): Subsidy[] {
    return [
      {
        name: "Women's Financial Assistance",
        description: "Monthly financial assistance for women.",
        eligibility: {
          state: state,
          gender: "female"
        }
      },
      {
        name: "Senior Pension",
        description: "Monthly pension for senior citizens above 60.",
        eligibility: {
          state: state,
          ageAbove18: true
        }
      },
    ];
  }
  

  
//   example
//   const sikkimSubsidies: StateSubsidies = {
//     state: "Sikkim",
//     subsidies: generateSubsidies("Sikkim")
//   };
  
//   console.log(sikkimSubsidies);
  