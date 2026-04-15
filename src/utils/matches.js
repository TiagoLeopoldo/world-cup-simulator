import { simulateMatch } from "./simulateMatch";

export const generateMatchesForGroup = (teams) => {
  const matches = [];

  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const result = simulateMatch();
      matches.push({
        home: teams[i],
        away: teams[j],
        homeGoals: result.homeGoals,
        awayGoals: result.awayGoals,
      });
    }
  }
  return matches;
};
