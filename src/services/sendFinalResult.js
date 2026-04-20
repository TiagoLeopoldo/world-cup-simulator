const BASE_URL = import.meta.env.VITE_API_URL;

export const sendFinalResult = async (finalMatch) => {
  try {
    const payload = {
      equipeA: finalMatch.teamA.token,
      equipeB: finalMatch.teamB.token,
      golsEquipeA: finalMatch.goalsA,
      golsEquipeB: finalMatch.goalsB,
      golsPenaltyTimeA: finalMatch.penaltyA ?? 0,
      golsPenaltyTimeB: finalMatch.penaltyB ?? 0,
    };

    console.log("PAYLOAD FINAL CORRETO:", payload);

    const response = await fetch(`${BASE_URL}/WorldCup/FinalResult`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "git-user": "TiagoLeopoldo",
      },
      body: JSON.stringify(payload),
    });

    const raw = await response.text();
    console.log("RAW RESPONSE:", raw);

    if (!response.ok) {
      throw new Error(raw);
    }

    return raw;
  } catch (error) {
    console.error("Erro API FINAL:", error.message);
  }
};