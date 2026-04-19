import { simulateMatch } from "./simulateMatch";

export const simulateKnockoutMatch = (teamA, teamB) => {
  const result = simulateMatch();

  let winner = null;
  let penaltyA = null;
  let penaltyB = null;

  if (result.homeGoals > result.awayGoals) {
    winner = teamA;
  } else if (result.homeGoals < result.awayGoals) {
    winner = teamB;
  } else {
    do {
      penaltyA = Math.floor(Math.random() * 5) + 1;
      penaltyB = Math.floor(Math.random() * 5) + 1;
    } while (penaltyA === penaltyB);

    winner = penaltyA > penaltyB ? teamA : teamB;
  }

  return {
    teamA,
    teamB,
    goalsA: result.homeGoals,
    goalsB: result.awayGoals,
    penaltyA,
    penaltyB,
    winner,
  };
};
