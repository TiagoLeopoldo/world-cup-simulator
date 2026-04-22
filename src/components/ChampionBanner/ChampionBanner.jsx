import "./ChampionBanner.css";

const ChampionBanner = ({ team }) => {
  return (
    <div className="champion-block">
      <h2 className="champion-label">Campeão</h2>
      <h3 className="champion-name">{team}</h3>
    </div>
  );
};

export default ChampionBanner;
