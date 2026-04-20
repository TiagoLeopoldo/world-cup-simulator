import { useEffect, useState } from "react";
import { getTeams } from "./services/api";
import { createGroups } from "./utils/groupDraw";
import { getQualifiedTeams } from "./utils/qualification";
import { generateRoundOf16 } from "./utils/roundOf16";
import { playKnockoutRound } from "./utils/knockoutRounds";
import { sendFinalResult } from "./services/sendFinalResult";

function App() {
  const [groups, setGroups] = useState([]);
  const [tournament, setTournament] = useState(null);

  useEffect(() => {
    async function runTournament() {
      const data = await getTeams();

      // 1. Grupos
      const generatedGroups = createGroups(data);

      // 2. Classificados
      const qualifiedTeams = getQualifiedTeams(generatedGroups);

      // 3. Oitavas
      const roundOf16 = generateRoundOf16(generatedGroups);

      // 4. Quartas
      const quarterFinals = playKnockoutRound(
        roundOf16.map((m) => m.winner)
      );

      // 5. Semifinais
      const semiFinals = playKnockoutRound(quarterFinals.winners);

      // 6. Final
      const final = playKnockoutRound(semiFinals.winners);

      setGroups(generatedGroups);
      setTournament({
        qualifiedTeams,
        roundOf16,
        quarterFinals,
        semiFinals,
        final,
      });
    }

    runTournament();
  }, []);

  useEffect(() => {
    if (!tournament?.final?.winners?.length) return;

    const run = async () => {
      console.log("ENVIANDO FINAL:", tournament.final.matches[0]);
      await sendFinalResult(tournament.final.matches[0]);
    };

    run();
  }, [tournament]);

  if (!tournament) return <p>Carregando...</p>;

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
        {tournament.qualifiedTeams.map((team, index) => (
          <li key={team.token}>
            {index + 1} - {team.team}
          </li>
        ))}
      </ul>

      <h2>Oitavas de Final</h2>
      <ul>
        {tournament.roundOf16.map((match, index) => (
          <li key={index}>
            {match.teamA.team} {match.goalsA} x {match.goalsB}{" "}
            {match.teamB.team}
            {match.penaltyA !== null && (
              <> (pênaltis: {match.penaltyA} x {match.penaltyB})</>
            )}
            {" → "}
            <strong>{match.winner.team}</strong>
          </li>
        ))}
      </ul>

      <h2>Quartas de Final</h2>
      <ul>
        {tournament.quarterFinals.matches.map((m, i) => (
          <li key={i}>
            {m.teamA.team} {m.goalsA} x {m.goalsB} {m.teamB.team} →{" "}
            <strong>{m.winner.team}</strong>
          </li>
        ))}
      </ul>

      <h2>Semifinais</h2>
      <ul>
        {tournament.semiFinals.matches.map((m, i) => (
          <li key={i}>
            {m.teamA.team} {m.goalsA} x {m.goalsB} {m.teamB.team}
            {m.penaltyA !== null && (
              <> (pênaltis: {m.penaltyA} x {m.penaltyB})</>
            )}
            {" → "}
            <strong>{m.winner.team}</strong>
          </li>
        ))}
      </ul>

      <h2>Final</h2>
      <ul>
        {tournament.final.matches.map((m, i) => (
          <li key={i}>
            {m.teamA.team} {m.goalsA} x {m.goalsB} {m.teamB.team}
            {m.penaltyA !== null && (
              <> (pênaltis: {m.penaltyA} x {m.penaltyB})</>
            )}
            {" → "}
            <strong>{m.winner.team}</strong>
          </li>
        ))}
      </ul>

      {tournament.final.winners.length === 1 && (
        <>
          <h2>Campeão</h2>
          <h3>{tournament.final.winners[0].team}</h3>
        </>
      )}
    </div>
  );
}

export default App;