const group = {
  teams: [
    { token: "BRA", nome: "Brasil" },
    { token: "FRA", nome: "França" },
    { token: "GER", nome: "Alemanha" },
  ],
  matches: [
    {
      home: { token: "BRA", nome: "Brasil" },
      away: { token: "FRA", nome: "França" },
      homeGoals: 2,
      awayGoals: 1,
    },
    {
      home: { token: "GER", nome: "Alemanha" },
      away: { token: "BRA", nome: "Brasil" },
      homeGoals: 0,
      awayGoals: 3,
    },
    {
      home: { token: "FRA", nome: "França" },
      away: { token: "GER", nome: "Alemanha" },
      homeGoals: 1,
      awayGoals: 1,
    },
  ],
};

export const calculateStandings = () => {
  const table = {};

  group.teams.forEach((teams) => {
    table[teams.token] = {
      team: teams.nome,
      points: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDiference: 0,
    };
  });

  group.matches.forEach((match) => {
    const home = table[match.home.token];
    const away = table[match.away.token];

    home.goalsFor += match.homeGoals;
    home.goalsAgainst += match.awayGoals;

    away.goalsFor += match.awayGoals;
    away.goalsAgainst += match.homeGoals;

    if (match.homeGoals > match.awayGoals) {
      home.points += 3;
    } else if (match.homeGoals < match.awayGoals) {
      away.points += 3;
    } else {
      home.points += 1;
      away.points += 1;
    }
  });

  Object.values(table).forEach((team) => {
    team.goalDifference = team.goalsFor - team.goalsAgainst;
  });

  return console.log(Object.values(table));
};

calculateStandings();
