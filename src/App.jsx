import { useEffect, useState } from "react";
import { getTeams } from "./services/api";
import { createGroups } from "./utils/groupDraw";
import { getQualifiedTeams } from "./utils/qualification";
import { generateRoundOf16 } from "./utils/roundOf16";
import { playKnockoutRound } from "./utils/knockoutRounds";

function App() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    async function fetchTeams() {
      const data = await getTeams();
      const generatedGroups = createGroups(data);
      setGroups(generatedGroups);
    }

    fetchTeams();
  }, []);

  const qualifiedTeams = getQualifiedTeams(groups);

  const roundOf16 = groups.length === 8 ? generateRoundOf16(groups) : [];

  const roundOf16Matches = roundOf16;
  const quarterFinals = playKnockoutRound(
    roundOf16Matches.map((m) => m.winner),
  );

  const semiFinals = playKnockoutRound(quarterFinals.winners);

  const final = playKnockoutRound(semiFinals.winners);

  return (
    <div>
      <h1>Grupos da Copa</h1>

      {groups.map((group) => (
        <div key={group.group}>
          <h2>Grupo {group.group}</h2>

          <ul>
            {group.teams.map((team) => (
              <li key={team.token}>{team.nome}</li>
            ))}
          </ul>

          <h3>Jogos:</h3>
          <ul>
            {group.matches.map((match, index) => (
              <li key={index}>
                {match.home.nome} {match.homeGoals} x {match.awayGoals}{" "}
                {match.away.nome}
              </li>
            ))}
          </ul>

          <h3>Tabela:</h3>
          <ul>
            {group.standings.map((teamStats, index) => (
              <li key={teamStats.token}>
                {index + 1}º - {teamStats.team} | {teamStats.points} pts | SG:{" "}
                {teamStats.goalDifference}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <h2>Classificados para as oitavas</h2>

      <ul>
        {qualifiedTeams.map((team, index) => (
          <li key={team.token}>
            {index + 1} - {team.team}
          </li>
        ))}
      </ul>

      <h2>Oitavas de Final</h2>

      <ul>
        {roundOf16.map((match, index) => (
          <li key={index}>
            {match.teamA.team} {match.goalsA} x {match.goalsB}{" "}
            {match.teamB.team}
            {match.penaltyA !== null && (
              <>
                {" "}
                (pênaltis: {match.penaltyA} x {match.penaltyB})
              </>
            )}
            <spam> vencedor: </spam>
            <strong>{match.winner.team}</strong>
          </li>
        ))}
      </ul>

      <h2>Quartas de Final</h2>
      <ul>
        {quarterFinals.matches.map((m, i) => (
          <li key={i}>
            {m.teamA.team} {m.goalsA} x {m.goalsB} {m.teamB.team} →{" "}
            <strong>{m.winner.team}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
