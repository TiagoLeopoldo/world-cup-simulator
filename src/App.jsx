import { useEffect, useState, useRef } from "react";
import { getTeams } from "./services/api";
import { createGroups } from "./utils/groupDraw";
import { getQualifiedTeams } from "./utils/qualification";
import { generateRoundOf16 } from "./utils/roundOf16";
import { playKnockoutRound } from "./utils/knockoutRounds";
import { sendFinalResult } from "./services/sendFinalResult";
import GroupCard from "./components/GroupCard/GroupCard";
import KnockoutPhase from "./components/KnockoutPhase/KnockoutPhase";
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
      const quarterFinals = playKnockoutRound(roundOf16.map((m) => m.winner));

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
        <GroupCard key={group.group} group={group} />
      ))}

      <h2 className="phase-title">Classificados para as oitavas</h2>
      <ul className="qualified-list">
        {tournament.qualifiedTeams.map((team, index) => (
          <li key={team.token} className="qualified-item">
            {index + 1} - {team.team}
          </li>
        ))}
      </ul>

      <KnockoutPhase title="Oitavas de Final" matches={tournament.roundOf16} />

      <KnockoutPhase
        title="Quartas de Final"
        matches={tournament.quarterFinals.matches}
      />

      <KnockoutPhase
        title="Semifinais"
        matches={tournament.semiFinals.matches}
      />

      <KnockoutPhase
        title="Final"
        matches={tournament.final.matches}
        isFinal={true}
      />

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
