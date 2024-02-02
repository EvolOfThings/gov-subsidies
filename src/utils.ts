import { ethers } from "ethers";
import votingAbi from "../public/AnonAadhaarVote.json";

const providerUrl = `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_SEPOLIA_PROVIDER_ID}`;

export const getTotalVotes = async (): Promise<number> => {
  const provider = ethers.getDefaultProvider(providerUrl);
  const voteContract = new ethers.Contract(
    "0x" + process.env.NEXT_PUBLIC_VOTE_CONTRACT_ADDRESS,
    votingAbi.abi,
    provider
  );

  const proposalCount = await voteContract.getProposalCount();

  // Initialize a variable to store the total vote count
  let totalVoteCount = 0;

  // Iterate through the proposals and sum their vote counts
  for (let i = 0; i < proposalCount; i++) {
    const voteCount = await voteContract.getProposal(i);
    totalVoteCount += Number(voteCount[1]);
  }

  return totalVoteCount;
};

export const hasVoted = async (userAddress: string): Promise<boolean> => {
  const provider = ethers.getDefaultProvider(providerUrl);
  const voteContract = new ethers.Contract(
    "0x" + process.env.NEXT_PUBLIC_VOTE_CONTRACT_ADDRESS,
    votingAbi.abi,
    provider
  );

  return await voteContract.checkVoted(userAddress);
};
