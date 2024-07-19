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
        name: "Healthcare Subsidy for Women",
        description: "Reduced healthcare costs for women.",
        eligibility: {
          state: state,
          gender: "F"
        }
      },
      {
        name: 'Maternity Benefit Scheme',
        description: 'Financial support for pregnant women.',
        eligibility: {
          state: state,
          gender: "F"
        }
      },
      {
        name: 'Women Empowerment Subsidy',
        description: 'Support for women-led businesses.',
        eligibility: {
          state: state,
          gender: "F"
        }
      },
      {
        name: "Pension for Senior Citizens",
        description: "Regular income support for the elderly. If you are over 60, you are eligible for this.",
        eligibility: {
          state: state,
          ageAbove18: true
        }
      },
      {
        name: "Elderly Nutrition Program",
        description: "Nutritional aid for the elderly. If you are over 60, you are eligible for this.",
        eligibility: {
          state: state,
          ageAbove18: true
        }
      },
    ];
  }
  