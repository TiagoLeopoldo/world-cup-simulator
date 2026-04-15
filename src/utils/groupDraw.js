import { shuffleArray } from "./shuffle";

const createGroup = (teams) => {
  const shuffleTeams = shuffleArray(teams);

  const groups = [];
  const groupsNames = ["A", "B", "C", "D", "E", "F", "G", "H"];

  for (let i = 0; i < 8; i++) {
    const groupTeams = shuffleTeams.slice(i * 4, i * 4 + 4);

    groups.push({
      group: groupsNames[i],
      teams: groupTeams
    });
  }
  return groups;
}