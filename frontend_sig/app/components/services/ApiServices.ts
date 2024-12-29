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
  } catch (err:any) {
    if (err.response && err.response.status === 400) {
      // Si le serveur retourne un statut 400 (HTTP_BAD_REQUEST)
      console.error("Erreur backend (dépassement de voix) :", err.response.data);
    } else {
      console.error("Erreur générale :", err);
    }
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
export const create_new_voting_center = async(data:any)=>{
  try{
    const response = await api.post(`${API_BASE_URL}/circonscription/create_new_voting_center/`,
      data
    )
    return response.data
  }
  catch(error){
    console.error("Erreur lors de la création du bureau de votes :", error);
    throw error;
  }
}
const fetchRegionsAndDepartments = async () => {
  try {
    const response = await api.get(`${API_BASE_URL}/circonscription/regions_departments/`);
    return response.data
  } catch (error) {
    console.error('Erreur lors du chargement des régions et départements:', error);
  }
};
const fetchVotingCenters = async (filters:any) => {
  try {
    const response = await api.get(`${API_BASE_URL}/circonscription/voting_centers_list/`, {
      params: {
        center_name: filters.center_name,
        arrondissement_name: filters.arrondissement_name,
        region_id: filters.region_id,
        departement_id: filters.departement_id,
      },
    });
    return response.data
  } catch (error) {
    console.error('Erreur lors du chargement des centres de vote:', error);
  }
};
const fetchVotingOffice = async (filters:any) => {
  try {
    const response = await api.get(`${API_BASE_URL}/circonscription/voting_office_list/`, {
      params: {
        center_name: filters.center_name,
        arrondissement_name: filters.arrondissement_name,
        region_id: filters.region_id,
        departement_id: filters.departement_id,
      },
    });
    return response.data
  } catch (error) {
    console.error('Erreur lors du chargement des centres de vote:', error);
  }
};
const updateVotingCenter = async (id: number, data: { center_name: string; arrondissement_name: string }) => {
  try {
    const response = await api.put(`/circonscription/voting-centers/${id}/update/`, data);
    return response.data; // Retourne la réponse du backend après la mise à jour
  } catch (error) {
    console.error("Erreur lors de la mise à jour du centre de vote:", error);
    throw error;
  }
};
const deleteVotingCenter = async (id: number) => {
  try {
    const response = await api.delete(`/circonscription/voting-centers/${id}/delete/`);
    return response.data; // Retourne la réponse du backend après la suppression
  } catch (error) {
    console.error("Erreur lors de la suppression du centre de vote:", error);
    throw error;
  }
};
const updateVotingOffice = async (id: number, data: { office_name: string; center_name: string }) => {
  try {
    const response = await api.put(`/circonscription/voting-office/${id}/update/`, data);
    return response.data; // Retourne la réponse du backend après la mise à jour
  } catch (error) {
    console.error("Erreur lors de la mise à jour du centre de vote:", error);
    throw error;
  }
};
const deleteVotingOffice = async (id: number) => {
  try {
    const response = await api.delete(`/circonscription/voting-office/${id}/delete/`);
    return response.data; // Retourne la réponse du backend après la suppression
  } catch (error) {
    console.error("Erreur lors de la suppression du centre de vote:", error);
    throw error;
  }
};
export const fetchAllArrondissments = async ()=>{
  try {
    const response = await api.get(`/circonscription/arrondissments`);
    return response.data; // Retourne la réponse du backend après la suppression
  } catch (error) {
    console.error("Erreur lors de la suppression du centre de vote:", error);
    throw error;
  }
};
const upload_pv = async (bureau_id:number, formData:any)=>{
  try{
    console.log("Formdata :", formData)
    const response = await api.post(`${API_BASE_URL}/circonscription/upload_pv/${bureau_id}/`,formData)
    
    return response;
  }catch(error){
    console.error("Erreur lors du chargement du proces verbale :", error);
    throw error;
  }
}

export default {
  createResultatDeVote,
  fetchResultatsPourBureauDeVote,
  create_new_voting_office,
  create_new_voting_center,
  fetchRegionsAndDepartments,
  fetchVotingCenters,
  updateVotingCenter,
  deleteVotingCenter,
  updateVotingOffice,
  deleteVotingOffice,
  fetchAllArrondissments,
  fetchVotingOffice,
  upload_pv
};
