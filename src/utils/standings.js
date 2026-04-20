export const calculateStandings = ({teams, matches}) => {
  const table = {};

  teams.forEach((team) => {
    table[team.token] = {
      token: team.token,
      team: team.nome,
      points: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
    };
  });

  matches.forEach((match) => {
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

    return Object.values(table).map((team) => ({
    ...team,
    goalDifference: team.goalsFor - team.goalsAgainst,
  }));
};


export const sortStandings = (standings) => {
  return [...standings].sort((a, b) => {
    if (a.points !== b.points) {
      return b.points - a.points;
    }

    if (a.goalDifference !== b.goalDifference) {
      return b.goalDifference - a.goalDifference;
    }

    return Math.random() - 0.5;
  });
};
