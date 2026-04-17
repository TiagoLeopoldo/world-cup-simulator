const BASE_URL = import.meta.env.VITE_API_URL;

export const getTeams = async () => {
  try {
    const response = await fetch(`${BASE_URL}/WorldCup/GetAllTeams`, {
      headers: {
        "git-user": "TiagoLeopoldo"
      }
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Falha na requisição:", error);
    return null;
  }
};
