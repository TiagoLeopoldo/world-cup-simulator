import { simulateKnockoutMatch } from "./knockout";

export const generateRoundOf16 = (groups) => {
  if (groups.length !== 8) return [];

  const getFirst = (groupName) =>
    groups.find((g) => g.group === groupName).standings[0];

  const getSecond = (groupName) =>
    groups.find((g) => g.group === groupName).standings[1];

  const matches = [
    [getFirst("A"), getSecond("B")],
    [getFirst("C"), getSecond("D")],
    [getFirst("E"), getSecond("F")],
    [getFirst("G"), getSecond("H")],
    [getFirst("B"), getSecond("A")],
    [getFirst("D"), getSecond("C")],
    [getFirst("F"), getSecond("E")],
    [getFirst("H"), getSecond("G")],
  ];

  return matches.map(([teamA, teamB]) => simulateKnockoutMatch(teamA, teamB));
};
