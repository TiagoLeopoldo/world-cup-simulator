import { useEffect, useState, useRef } from "react";
import { getTeams } from "./services/api";
import { createGroups } from "./utils/groupDraw";
import { getQualifiedTeams } from "./utils/qualification";
import { generateRoundOf16 } from "./utils/roundOf16";
import { playKnockoutRound } from "./utils/knockoutRounds";
import { sendFinalResult } from "./services/sendFinalResult";
import "./App.css";

function App() {
  const [groups, setGroups] = useState([]);
  const [tournament, setTournament] = useState(null);
  const resultSent = useRef(false);

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
    if (!tournament?.final?.winners?.length || resultSent.current) return;
    const run = async () => {
      resultSent.current = true;
      await sendFinalResult(tournament.final.matches[0]);
    };

    run();
  }, [tournament]);

  if (!tournament) return <p className="loading">Carregando...</p>;

  return (
    <div className="app">
      <h1 className="app-title">Copa do Mundo FIFA 2026</h1>

      {groups.map((group) => (
        <div key={group.group} className="group-card">
          <h2 className="group-name">Grupo {group.group}</h2>

          <ul className="teams-list">
            {group.teams.map((team) => (
              <li key={team.token} className="team-item">{team.nome}</li>
            ))}
          </ul>

          <h3 className="section-label">Jogos:</h3>
          <ul className="matches-list">
            {group.matches.map((match, index) => (
              <li key={index} className="match-item">
                {match.home.nome} {match.homeGoals} x {match.awayGoals}{" "}
                {match.away.nome}
              </li>
            ))}
          </ul>

          <h3 className="section-label">Tabela:</h3>
          <ul className="standings-list">
            {group.standings.map((teamStats, index) => (
              <li key={teamStats.token} className="standing-item">
                {index + 1}º - {teamStats.team} | {teamStats.points} pts | SG:{" "}
                {teamStats.goalDifference}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <h2 className="phase-title">Classificados para as oitavas</h2>
      <ul className="qualified-list">
        {tournament.qualifiedTeams.map((team, index) => (
          <li key={team.token} className="qualified-item">
            {index + 1} - {team.team}
          </li>
        ))}
      </ul>

      <h2 className="phase-title">Oitavas de Final</h2>
      <ul className="knockout-list">
        {tournament.roundOf16.map((match, index) => (
          <li key={index} className="knockout-item">
            {match.teamA.team} {match.goalsA} x {match.goalsB}{" "}
            {match.teamB.team}
            {match.penaltyA !== null && (
              <> (pênaltis: {match.penaltyA} x {match.penaltyB})</>
            )}
            <strong>{match.winner.team}</strong>
          </li>
        ))}
      </ul>

      <h2 className="phase-title">Quartas de Final</h2>
      <ul className="knockout-list">
        {tournament.quarterFinals.matches.map((m, i) => (
          <li key={i} className="knockout-item">
            {m.teamA.team} {m.goalsA} x {m.goalsB} {m.teamB.team}
            <strong>{m.winner.team}</strong>
          </li>
        ))}
      </ul>

      <h2 className="phase-title">Semifinais</h2>
      <ul className="knockout-list">
        {tournament.semiFinals.matches.map((m, i) => (
          <li key={i} className="knockout-item">
            {m.teamA.team} {m.goalsA} x {m.goalsB} {m.teamB.team}
            {m.penaltyA !== null && (
              <> (pênaltis: {m.penaltyA} x {m.penaltyB})</>
            )}
            <strong>{m.winner.team}</strong>
          </li>
        ))}
      </ul>

      <h2 className="phase-title phase-title-final">Final</h2>
      <ul className="knockout-list knockout-list-final">
        {tournament.final.matches.map((m, i) => (
          <li key={i} className="knockout-item knockout-item-final">
            {m.teamA.team} {m.goalsA} x {m.goalsB} {m.teamB.team}
            {m.penaltyA !== null && (
              <> (pênaltis: {m.penaltyA} x {m.penaltyB})</>
            )}
            <strong>{m.winner.team}</strong>
          </li>
        ))}
      </ul>

      {tournament.final.winners.length === 1 && (
        <div className="champion-block">
          <h2 className="champion-label">Campeão</h2>
          <h3 className="champion-name">{tournament.final.winners[0].team}</h3>
        </div>
      )}
    </div>
  );
}

export default App;