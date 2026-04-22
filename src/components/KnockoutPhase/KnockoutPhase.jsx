import "./KnockoutPhase.css";

const KnockoutPhase = ({ title, matches }) => {
  return (
    <>
      <h2 className="phase-title">{title}</h2>

      <ul className="knockout-list">
        {matches.map((match, index) => (
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
    </>
  );
};

export default KnockoutPhase;
