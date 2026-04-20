export const getQualifiedTeams = (groups) => {
  const qualified = [];

  groups.forEach((group) => {
    const topTwo = group.standings.slice(0, 2);
    qualified.push(...topTwo);
  });

  return qualified.map((team) => ({
  token: team.token,
  team: team.team,
}));
};