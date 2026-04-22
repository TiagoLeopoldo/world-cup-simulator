import "./MatchItem.css";

const MatchItem = ({ match, index }) => {
  return (
    <li className="match-item">
      {match.home.nome} {match.homeGoals} x {match.awayGoals} {match.away.nome}
    </li>
  );
};

export default MatchItem;
