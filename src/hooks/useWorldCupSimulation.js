import { useEffect, useState, useRef } from "react";
import { getTeams } from "../services/api";
import { createGroups } from "../utils/groupDraw";
import { getQualifiedTeams } from "../utils/qualification";
import { generateRoundOf16 } from "../utils/roundOf16";
import { playKnockoutRound } from "../utils/knockoutRounds";
import { sendFinalResult } from "../services/sendFinalResult";

const useWorldCupSimulation = () => {
  const [groups, setGroups] = useState([]);
  const [tournament, setTournament] = useState(null);
  const [error, setError] = useState(false);
  const resultSent = useRef(false);

  useEffect(() => {
    async function runTournament() {
      let data;
      try {
        data = await getTeams();
      } catch (err) {
        console.error("Erro ao buscar times:", err);
        setError(true);
        return;
      }

      if (!data || !Array.isArray(data)) {
        setError(true);
        return;
      }

      // 1. Grupos
      const generatedGroups = createGroups(data);

      // 2. Classificados
      const qualifiedTeams = getQualifiedTeams(generatedGroups);

      // 3. Oitavas
      const roundOf16 = generateRoundOf16(generatedGroups);

      // 4. Quartas
      const quarterFinals = playKnockoutRound(roundOf16.map((m) => m.winner));

      // 5. Semifinais
      const semiFinals = playKnockoutRound(quarterFinals.winners);

      // 6. Final
      const final = playKnockoutRound(semiFinals.winners);

      setGroups(generatedGroups);
      setTournament({
        qualifiedTeams,
        roundOf16,
        quarterFinals,
        semiFinals,
        final,
      });
    }

    runTournament();
  }, []);

  useEffect(() => {
    if (!tournament?.final?.winners?.length || resultSent.current) return;

    const run = async () => {
      resultSent.current = true;
      await sendFinalResult(tournament.final.matches[0]);
    };

    run();
  }, [tournament]);

  return {
    groups,
    tournament,
    error
  };
};

export default useWorldCupSimulation;
