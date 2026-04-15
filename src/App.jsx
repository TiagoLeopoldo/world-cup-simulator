import { useEffect, useState } from 'react';
import { getTeams } from "./services/api";

const App = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getTeams();
        setTeams(data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    fetchTeams();
  }, []);
  console.log(teams);
  return (
    <div>
      <h1>World Cup Simulator</h1>
      <ul>
        {teams.map((team) => (
          <li key={team.token}>{team.nome}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;