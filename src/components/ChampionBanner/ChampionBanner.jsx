import "./ChampionBanner.css";

const ChampionBanner = ({ team }) => {
  return (
    <section className="champion-block">
      <h2 className="champion-label">Campeão</h2>
      <h3 className="champion-name">{team}</h3>
    </section>
  );
};

export default ChampionBanner;
