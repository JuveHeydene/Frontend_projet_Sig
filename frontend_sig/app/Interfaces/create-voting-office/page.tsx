"use client";
import React, { useState } from "react";

interface Circonscription {
  nom: string;
  circonscriptionname: string;
}
interface BureauVote {
  nom: string;
  circonscriptionname: string;
}

const CreateVotingOffice = () => {
  const [formcirconsription, setcirconsription] = useState<Circonscription>({
    nom: "",
    circonscriptionname: "",
  });
  const [formBureauvote, setBureauvote] = useState<BureauVote>({
    nom: "",
    circonscriptionname: "",
  });
  const [circonscriptions, setCirconscriptions] = useState<string[]>([
    "Circonscription A",
    "Circonscription B",
    "Circonscription C",
    "Circonscription D",
    "Circonscription E",
    "Circonscription F",
  ]);
  const handleSubmitcreatebureauvote = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/bureau/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(formcirconsription),
      });
      if (response.ok) {
        alert("bureau created successfully!");
      } else {
        console.error("Error creating bureau:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating bureau:", error);
    }
  };
  const handleInputbureaudevote = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setBureauvote({
      ...formBureauvote,
      [name]: value,
    });
  };
  return (
    <div className="w-full mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Ajouter un Bureau de vote{" "}
      </h1>
      <form onSubmit={handleSubmitcreatebureauvote}>
        {/* Champ Nom */}
        <div className="mb-4">
          <label htmlFor="nom" className="block text-gray-700 font-medium mb-2">
            Nom
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formBureauvote.nom}
            onChange={handleInputbureaudevote}
            placeholder="Entrez le nom"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Liste déroulante pour Circonscription */}
        <div className="mb-4">
          <label
            htmlFor="circonscriptionname"
            className="block text-gray-700 font-medium mb-2"
          >
            Circonscription
          </label>
          <select
            id="circonscriptionname"
            name="circonscriptionname"
            value={formBureauvote.circonscriptionname}
            onChange={handleInputbureaudevote}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Sélectionnez une circonscription</option>
            {circonscriptions.map((circ, index) => (
              <option key={index} value={circ}>
                {circ}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Soumettre
        </button>
      </form>
    </div>
  );
};

export default CreateVotingOffice;
