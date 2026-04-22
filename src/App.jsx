import GroupCard from "./components/GroupCard/GroupCard";
import KnockoutPhase from "./components/KnockoutPhase/KnockoutPhase";
import ChampionBanner from "./components/ChampionBanner/ChampionBanner";
import QualifiedList from "./components/QualifiedList/QualifiedList";
import useWorldCupSimulation from "./hooks/useWorldCupSimulation";
import "./App.css";

function App() {
  const { groups, tournament, error } = useWorldCupSimulation();

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
