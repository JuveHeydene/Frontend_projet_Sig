"use client"
import React, {ReactNode, ReactElement, useState, useEffect, useRef } from 'react'
import { NextPage } from "next";
import Layout from '../../components/layout/Layout'
import withAuth from '@/app/components/withAuths/page';
import Head from 'next/head';
interface User {
  noms: string;
  prenoms: string;
  birthdate: string;
  political_party: string;
  tel: string;
  password: string;

  gender: string;
  role: string;
  bureau: string;
}


const CreateUsers = () => {
  const title = "New User"
  const [role, setRole] = useState<string>("")
  const [formUser, setFormUser] = useState<User>({
    noms: "",
    prenoms: "",
    birthdate: "",
    political_party: "",
    tel: "",
    password: "",
    gender: "",
    role: "",
    bureau: "",
  });
  const handleInputuserChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      e.preventDefault();
      const { name, value } = e.target;
      setFormUser({
        ...formUser,
        [name]: value,
      });
    };
    useEffect(() => {
      const role = localStorage.getItem("roles")
      if (role) {
        setRole(role)
      }
      else{
        setRole("")
      }
    }, []);
  

  const handleSubmitcreateuser = async (
      e: React.FormEvent<HTMLFormElement>
    ) => {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:3000/user/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(formUser),
        });
        if (response.ok) {
          alert("user created successfully!");
        } else {
          console.error("Error creating user:", response.statusText);
        }
      } catch (error) {
        console.error("Error creating user:", error);
      }
    };
    document.title = "Bonjour"
    
  return (
    <>
    
    <div className="w-full">
            <form
              onSubmit={handleSubmitcreateuser}
              className="p-6 bg-gray-100 w-full  rounded"
            >
              <h1 className="text-xl font-bold mb-4">Formulaire</h1>

              {/* Noms */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="noms">
                  Noms
                </label>
                <input
                  id="noms"
                  type="text"
                  value={formUser.noms}
                  onChange={handleInputuserChange}
                  placeholder="Entrer le nom"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              {/* Prénoms */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="prenoms">
                  Prénoms
                </label>
                <input
                  id="prenoms"
                  type="text"
                  value={formUser.prenoms}
                  onChange={handleInputuserChange}
                  placeholder="Entrer le prénom"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              {/* Date de naissance */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="birthdate">
                  Date de naissance
                </label>
                <input
                  id="birthdate"
                  type="date"
                  value={formUser.birthdate}
                  onChange={handleInputuserChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              {/* Genre */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Genre</label>
                <div className="flex space-x-4">
                  <label>
                    <input
                      type="radio"
                      value={formUser.gender}
                      onChange={handleInputuserChange}
                      name="gender"
                      className="mr-2"
                    />
                    Homme
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value={formUser.gender}
                      onChange={handleInputuserChange}
                      className="mr-2"
                    />
                    Femme
                  </label>
                </div>
              </div>

              {/* Rôle */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1" htmlFor="role">
                  Rôle
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">-- Sélectionnez un rôle --</option>
                  <option value="candidat">Candidat</option>
                  <option value="enrolleur">Enrôleur</option>
                  <option value="scrutateur">Scrutateur</option>
                  <option value="moderateur">Modérateur</option>
                </select>
              </div>

              {/* Bureau de vote (affiché uniquement si le rôle est "Scrutateur") */}
              {role === "scrutateur" && (
                <div className="mb-4">
                  <label className="block text-gray-700 mb-1" htmlFor="bureau">
                    Bureau de vote
                  </label>
                  <input
                    id="bureau"
                    type="text"
                    value={formUser.bureau}
                    onChange={handleInputuserChange}
                    placeholder="Entrer le bureau de vote"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Soumettre
              </button>
            </form>
          </div>
          </>
  )
}



export default withAuth(CreateUsers, ['ADMINISTRATEUR','SUPERVISEUR']);