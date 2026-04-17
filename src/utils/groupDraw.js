import { shuffleArray } from "./shuffle";
import { generateMatchesForGroup } from "./matches";
import { calculateStandings, sortStandings } from "./standings";

export const createGroups = (teams) => {
  const shuffleTeams = shuffleArray(teams);

  const groups = [];
  const groupsNames = ["A", "B", "C", "D", "E", "F", "G", "H"];

  for (let i = 0; i < 8; i++) {
    const groupTeams = shuffleTeams.slice(i * 4, i * 4 + 4);
    const matches = generateMatchesForGroup(groupTeams);

    const standings = sortStandings(
      calculateStandings({ teams: groupTeams, matches: matches }),
    );

    groups.push({
      group: groupsNames[i],
      teams: groupTeams,
      matches,
      standings,
    });
  }
  return groups;
};
