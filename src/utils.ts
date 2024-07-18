export function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}


import { EligibilityCriteria } from './subsidyData';

export function checkEligibility(userCriteria: EligibilityCriteria, subsidyCriteria: EligibilityCriteria): boolean {
  if (subsidyCriteria.state && subsidyCriteria.state !== userCriteria.state) {
    return false;
  }
  if (subsidyCriteria.gender && subsidyCriteria.gender !== userCriteria.gender) {
    return false;
  }
  if (subsidyCriteria.ageAbove18) {
    const userAge = userCriteria.ageAbove18 ?? 0;
    if (subsidyCriteria.ageAbove18 !== undefined && userAge < subsidyCriteria.ageAbove18) {
      return false;
    }
  }
  return true;
}
