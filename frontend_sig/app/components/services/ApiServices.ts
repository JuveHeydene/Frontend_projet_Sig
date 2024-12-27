import axios from 'axios';
const API_BASE_URL = 'http://localhost:8000'; // Base URL du backend

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",  // Changez cette URL selon votre backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le Bearer Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Récupère le token depuis localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const fetchCandidats = async () => {
    const token = localStorage.getItem('token'); // Récupérer le token
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await axios.get(`${API_BASE_URL}/users/candidats/`, { headers });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des candidats :", error);
        throw error;
    }
};

// Fonction pour créer plusieurs résultats de vote
export const createResultatDeVote = async (
  candidatsVoix: { [key: string]: number },
  bureauDeVoteId: string
): Promise<any> => {
  try {
    const candidatsData = Object.entries(candidatsVoix).map(([candidatId, totalVoix]) => ({
      candidat_id: candidatId,
      total_voix: totalVoix,
    }));

    const response = await api.post(`${API_BASE_URL}/users/resultats-de-vote/`, {
      candidats_voix: candidatsData,
      bureau_de_vote: bureauDeVoteId,
    });

    return response.data;  // Retourne les données du backend (résultat créé)
  } catch (error) {
    console.error("Erreur lors de la création des résultats de vote:", error);
    throw error;
  }
};
// Ajout dans ApiServices.ts
export const fetchResultatsPourBureauDeVote = async (bureauDeVoteId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/resultats/${bureauDeVoteId}/`);
    if (!response.data) {
      throw new Error('Erreur lors de la récupération des résultats');
    }
    console.log(response.data)
    return await response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des résultats :", error);
    throw error;
  }
};
//Récupérer tous les centres de votes 
export const fetchAllVotingCenters = async()=>{
  try{
    const response = await axios.get(`${API_BASE_URL}/circonscription/get_voting_centers_as_list_options`)
    console.log(response.data)
    return await response.data
  }
  catch(error){
    console.error("Erreur lors de la récupération des centres de votes :", error);
    throw error;
  }

}

export const create_new_voting_office = async(data:any)=>{
  try{
    const response = await api.post(`${API_BASE_URL}/circonscription/create_new_voting_office/`,
      data
    )
    return response.data
  }
  catch(error){
    console.error("Erreur lors de la création du bureau de votes :", error);
    throw error;
  }
}

export default {
  createResultatDeVote,
  fetchResultatsPourBureauDeVote,
  create_new_voting_office,
};
