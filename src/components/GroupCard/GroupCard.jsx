import "./GroupCard.css";
import MatchItem from "../MatchItem/MatchItem";

const GroupCard = ({ group }) => {
  return (
    <section className="group-card">
      <h2 className="group-name">Grupo {group.group}</h2>

      <ul className="teams-list">
        {group.teams.map((team) => (
          <li key={team.token} className="team-item">
            {team.nome}
          </li>
        ))}
      </ul>

      <h3 className="section-label">Jogos:</h3>
      <ul className="matches-list">
        {group.matches.map((match, index) => (
          <MatchItem key={index} match={match} index={index} />
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
    </section>
  );
};

export default GroupCard;
