import { useEffect, useState, useRef } from "react";
import { getTeams } from "./services/api";
import { createGroups } from "./utils/groupDraw";
import { getQualifiedTeams } from "./utils/qualification";
import { generateRoundOf16 } from "./utils/roundOf16";
import { playKnockoutRound } from "./utils/knockoutRounds";
import { sendFinalResult } from "./services/sendFinalResult";
import GroupCard from "./components/GroupCard/GroupCard";
import KnockoutPhase from "./components/KnockoutPhase/KnockoutPhase";
import ChampionBanner from "./components/ChampionBanner/ChampionBanner";
import QualifiedList from "./components/QualifiedList/QualifiedList";
import "./App.css";

function App() {
  const [groups, setGroups] = useState([]);
  const [tournament, setTournament] = useState(null);
  const [error, setError] = useState(false);
  const resultSent = useRef(false);

  useEffect(() => {
    async function runTournament() {
      let data;
      try {
        data = await getTeams();
      } catch (err) {
        console.error("Erro ao buscar times:", err);
        setError(true);
        return;
      }

      if (!data || !Array.isArray(data)) {
        setError(true);
        return;
      }

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

  if (error) return <p className="loading">Erro ao carregar dados</p>;
  if (!tournament) return <p className="loading">Carregando...</p>;

  return (
    <div className="app">
      <h1 className="app-title">Copa do Mundo FIFA 2026</h1>

      {groups.map((group) => (
        <GroupCard key={group.group} group={group} />
      ))}

      <QualifiedList qualifiedTeams={tournament.qualifiedTeams} />

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
        <ChampionBanner team={tournament.final.winners[0].team} />
      )}
    </div>
  );
}

export default App;
