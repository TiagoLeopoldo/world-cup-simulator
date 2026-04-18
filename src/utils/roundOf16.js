export const generateRoundOf16 = (groups) => {
  const getFirst = (groupName) =>
    groups.find((g) => g.group === groupName).standings[0];

  const getSecond = (groupName) =>
    groups.find((g) => g.group === groupName).standings[1];

  return [
    [getFirst("A"), getSecond("B")],
    [getFirst("C"), getSecond("D")],
    [getFirst("E"), getSecond("F")],
    [getFirst("G"), getSecond("H")],
    [getFirst("B"), getSecond("A")],
    [getFirst("D"), getSecond("C")],
    [getFirst("F"), getSecond("E")],
    [getFirst("H"), getSecond("G")],
  ];
};