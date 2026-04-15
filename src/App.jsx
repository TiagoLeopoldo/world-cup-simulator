import { useEffect, useState } from "react";
import { getTeams } from "./services/api";
import { createGroups } from "./utils/groupDraw";

function App() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    async function fetchTeams() {
      const data = await getTeams();
      const generatedGroups = createGroups(data);
      setGroups(generatedGroups);
    }

    fetchTeams();
  }, []);

  return (
    <div>
      <h1>Grupos da Copa</h1>

      {groups.map((group) => (
        <div key={group.group}>
          <h2>Grupo {group.group}</h2>

          <ul>
            {group.teams.map((team) => (
              <li key={team.token}>{team.nome}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
