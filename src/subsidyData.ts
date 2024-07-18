export type EligibilityCriteria = {
    ageAbove18?: boolean;
    gender?: 'M' | 'F' | 'O';
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
          gender: "F"
        }
      },
      {
        name: "Pension",
        description: "You maybe eligible for a Monthly pension for senior citizens above 60.",
        eligibility: {
          state: state,
          ageAbove18: true
        }
      },
    ];
  }
  