import { simulateKnockoutMatch } from "./knockout";

export const playKnockoutRound = (teams) => {
  const matches = [];
  const winners = [];

  for (let i = 0; i < teams.length; i += 2) {
    const match = simulateKnockoutMatch(teams[i], teams[i + 1]);

    matches.push(match);
    winners.push(match.winner);
  }

  return {
    matches,
    winners,
  };
};