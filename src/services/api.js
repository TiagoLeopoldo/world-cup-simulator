const BASE_URL = "/api";

export const getTeams = async () => {
  const response = await fetch(`${BASE_URL}/WorldCup/GetAllTeams`, {
    headers: {
      "git-user": "TiagoLeopoldo"
    }
  });

  const data = await response.json();
  return data;
  
}