export const simulateMatch = () => {
  const homeGoals = Math.floor(Math.random() * 5);
  const awayGoals = Math.floor(Math.random() * 5);

  return {
    homeGoals,
    awayGoals,
  };
};
