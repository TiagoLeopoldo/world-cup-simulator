import { simulateKnockoutMatch } from "./knockout";

export const playKnockoutRound = (teams) => {
  const matches = [];
  const winners = [];

  if (!teams || teams.length < 2) {
    return { matches: [], winners: [] };
  }

  for (let i = 0; i < teams.length; i += 2) {
    const teamA = teams[i];
    const teamB = teams[i + 1];

    if (!teamA || !teamB) continue;

    const match = simulateKnockoutMatch(teamA, teamB);

    matches.push(match);

    if (match?.winner) {
      winners.push(match.winner);
    }
  }

  return {
    matches,
    winners,
  };
};