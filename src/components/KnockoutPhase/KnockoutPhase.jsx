import "./KnockoutPhase.css";

const KnockoutPhase = ({ title, matches, isFinal }) => {
  return (
    <section className="knockout-phase">
      <h2 className={`phase-title ${isFinal ? "phase-title-final" : ""}`}>{title}</h2>

      <ul className={`knockout-list ${isFinal ? "knockout-list-final" : ""} ${matches?.length === 2 && !isFinal ? "knockout-list-semi" : ""}`}>
        {matches.map((match, index) => (
          <li key={index} className={`knockout-item ${isFinal ? "knockout-item-final" : ""}`}>
            {match.teamA.team} {match.goalsA} x {match.goalsB}{" "}
            {match.teamB.team}
            {match.penaltyA !== null && (
              <>
                {" "}
                (pênaltis: {match.penaltyA} x {match.penaltyB})
              </>
            )}
            <strong>{match.winner.team}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default KnockoutPhase;
