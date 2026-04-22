import "./QualifiedList.css";

const QualifiedList = ({ qualifiedTeams }) => {
  return (
    <section className="qualified-phase">
      <h2 className="phase-title">Classificados para as oitavas</h2>
      <ul className="qualified-list">
        {qualifiedTeams.map((team, index) => (
          <li key={team.token} className="qualified-item">
            {index + 1} - {team.team}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default QualifiedList;
