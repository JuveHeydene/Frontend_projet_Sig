
"use client"
import "./NewResult.scss"
import React, { useEffect, useState } from 'react';
import ApiService, { fetchCandidats, fetchResultatsPourBureauDeVote } from '../../components/services/ApiServices';
import { User } from "@/app/Models/User";

interface Candidat {
  id: number;
  name: string;
  political_party: string | null; // Peut être null si le parti n'est pas renseigné
  photo?: string; // Propriété optionnelle qui sera ajoutée dynamiquement
}


const CreateResultatForm = () => {
  const [candidats, setCandidats] = useState<Candidat[]>([]);
  const [candidatsVoix, setCandidatsVoix] = useState<{ [key: string]: number }>({});
  const [bureauDeVoteId, setBureauDeVoteId] = useState<string>('');
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const loadCandidatsAndVoix = async () => {
      try {
        const user = localStorage.getItem("user");
        if (user) {
          setUser(JSON.parse(user));
        }

        const candidatsData = await fetchCandidats();
        const candidatsWithPhotos = candidatsData.map((candidat: Candidat) => ({
          ...candidat,
          photo: `person`,
        }));

        setCandidats(candidatsWithPhotos);

        if (user) {
          const parsedUser = JSON.parse(user);
          if (parsedUser.bureau_de_vote) {
            const resultats = await fetchResultatsPourBureauDeVote(parsedUser.bureau_de_vote);
            
            const voixInitiales = resultats.reduce((acc: { [key: string]: number }, resultat: { candidat_id: number, total_votes: number }) => {
              acc[resultat.candidat_id] = resultat.total_votes;
              return acc;
            }, {});
            setCandidatsVoix(voixInitiales);
            console.log("Candidats voix : ", voixInitiales)
          }
        }
        
      } catch (error) {
        console.error("Erreur lors du chargement des données :", error);
      }
    };

    loadCandidatsAndVoix();
    
}, []);
  
  const handleVoteChange = (candidatId: number, voix: number) => {
    setCandidatsVoix((prev) => ({ ...prev, [candidatId]: voix }));
  };

  const handleBlur = (candidatId: number) => {
    // Si l'input est vide, réinitialiser la valeur à 0
    setCandidatsVoix((prev) => ({ ...prev, [candidatId]: prev[candidatId] || 0 }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (user?.bureau_de_vote) {
        console.log("candidatsVoix : ", candidatsVoix)
        const response = await ApiService.createResultatDeVote(candidatsVoix, user?.bureau_de_vote);
        setSuccess('Résultats de vote créés avec succès!');
        console.log("Réponse backend:", response);
      }
    } catch (err: any) {
      setError('Une erreur s\'est produite.');
      console.error("Erreur:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-result">
      <h1>Enter office results</h1>
      <form onSubmit={handleSubmit}>

        <div className="card-container">
          {candidats.map((candidat) => (
            <div className="card" key={candidat.id}>
              <div className="candidat-profile">
                <i className="material-icons">{candidat.photo}</i>
                <p>{candidat.name} , {candidat.political_party}</p>
              </div>
              
              <input
                type="number"
                value={candidatsVoix[candidat.id] || 0}
                onBlur={() => handleBlur(candidat.id)}
                onChange={(e) => handleVoteChange(candidat.id, Number(e.target.value))}
                placeholder="Nombre de voix"
                required
              />
            </div>
          ))}
          {/* Penser à mettre une carte pour les votes blancs */}
        
        
        </div>
        <button className="submit-result" type="submit" disabled={loading}>Submit results</button>
      </form>

      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default CreateResultatForm;