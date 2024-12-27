"use client"
import React, {ReactNode, ReactElement, useState, useEffect, useRef } from 'react'
import { NextPage } from "next";
import Layout from '../../components/layout/Layout'
import withAuth from '@/app/components/withAuths/page';
import Head from 'next/head';
import Image from 'next/image';
import  noimage2 from "@/app/noimage.png"

interface User {
  noms: string;
  prenoms: string;
  email:string;
  birthdate: string;
  political_party: string;
  tel: string;
  password: string;
  gender: string;
  role: string;
  bureau: string;
  userImage:string;
}


const CreateUsers = () => {
  const title = "New User"
  const regionName = "CENTRE";
  const [bureauDeVoteList, setBureauDeVoteList] = useState<string[]>([]);
  const [circonscriptions, setCirconscriptions] = useState<string[]>([
    "Circonscription A",
    "Circonscription B",
    "Circonscription C",
    "Circonscription D",
    "Circonscription E",
    "Circonscription F",
  ]);


  const [role, setRole] = useState<string>("")
  const [formUser, setFormUser] = useState<User>({
    noms: "",
    prenoms: "",
    email:"",
    birthdate: "",
    political_party: "",
    tel: "",
    password: "",
    gender: "",
    role: "",
    bureau: "",
    userImage:"",
  });
  
  const resetForm = () => {
    setFormUser({
      noms: "",
      prenoms: "",
      email:"",
      birthdate: "",
      political_party: "",
      tel: "",
      password: "",
      gender: "",
      role: "",
      bureau: "",
      userImage: "",
    });
  };

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

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        const imageUrl = await uploadImage(file);
        if (imageUrl) {
          setFormUser((prevData) => ({
            ...prevData,
            userImage: imageUrl,
          }));
        }
      }
    };
  
    const uploadImage = async (file: File): Promise<string | null> => {
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const response = await fetch('http://localhost:8000/users/upload/', {
          method: 'POST',
          body: formData,
          headers: {
          },
        });
  
        if (response.ok) {
          
          const textResponse = await response.json();
          console.log('Raw response:', textResponse.file_name);
  
          // Use the raw response as the filename
          alert('File uploaded successfully');
          return textResponse.file_name; // Use the raw response as the filename or URL
        } else {
          alert('File upload failed');
          return null;
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('File upload failed');
        return null;
      }
    };
  
   
  

  const handleSubmitcreateuser = async (
      e: React.FormEvent<HTMLFormElement>
    ) => {
      e.preventDefault();
      formUser.role=role
      console.log(formUser)
      try {
        const token = localStorage.getItem("token");
        const response = await fetch('http://localhost:8000/users/createuser/', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            
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

      resetForm();
    };

    useEffect(() => {
      async function fetchData() {
        try {
          const token = localStorage.getItem("token");
          // Convert JSON parameter to query string
          const queryParams = new URLSearchParams({ "region_name": regionName });
  
          const response = await fetch(`http://localhost:8000/circonscription/bureaudevotebyregion?${queryParams.toString()}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
          }
  
          const data = await response.json();
          const bureauDeVote = data.bureau_de_vote_;
          console.log(bureauDeVote);
          setBureauDeVoteList(bureauDeVote);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
  
      fetchData();
    }, [regionName]);

    document.title = "Bonjour"
    
  return (
    <>
    
    <div className="w-full">
  <form
    onSubmit={handleSubmitcreateuser}
    className="p-6 bg-gray-100 w-full rounded"
  >
    <h1 className="text-xl font-bold mb-4">Formulaire</h1>

    {/* Two-column layout */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Left Column */}
      <div>
        {/* Noms */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="noms">
            Noms
          </label>
          <input
            id="noms"
            type="text"
            name="noms"
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
            name="prenoms"
            value={formUser.prenoms}
            onChange={handleInputuserChange}
            placeholder="Entrer le prénom"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

         {/* Email */}
         <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="text"
            name="email"
            value={formUser.email}
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
            name="birthdate"
            value={formUser.birthdate}
            onChange={handleInputuserChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* TEL */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="tel">
            Tel
          </label>
          <input
            id="tel"
            type="number"
            name="tel"
            value={formUser.tel}
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
                value="MALE"
                checked={formUser.gender === "MALE"}
                onChange={handleInputuserChange}
                name="gender"
                className="mr-2"
              />
              Homme
            </label>
            <label>
              <input
                type="radio"
                value="FEMALE"
                checked={formUser.gender === "FEMALE"}
                onChange={handleInputuserChange}
                name="gender"
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
          className="w-full p-2 border border-gray-300 rounded" > 

          <option value="" disabled>-- Sélectionnez un rôle --</option> 
          <option value="CANDIDAT">Candidat</option> 
          <option value="ELECTEUR">Electeur</option> 
          <option value="ENROLEUR">Enrôleur</option> 
          <option value="SCRUTATEUR">Scrutateur</option> 
          <option value="SUPERVISEUR">Superviseur</option>
          <option value="ADMINISTRATEUR">Administrateur</option> 
          
          </select> 
          </div> 
      </div>

      {/* Right Column */}
      <div>
        {/* User Image */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">User Image</label>
          <div className="border border-gray-300 rounded-md w-full h-56">
            <input
              type="file"
              accept="image/*"
              name="vehicleImage"
              onChange={handleFileChange}
              className="border-custom-darkblue mb-2"
              required
            />
            {!formUser.userImage && (
              <Image
                className="w-full h-48 object-cover"
                src={noimage2}
                alt="Default"
              />
            )}
            {formUser.userImage && (
              <img
                className="w-full h-48 object-cover"
                src={`/UserImages/${formUser.userImage}`}
                alt="Uploaded"
              />
            )}
          </div>
        </div>

        {/* Bureau de vote (only visible if role is "scrutateur") */}
        {role === "SCRUTATEUR" && (
          <div className="mb-4">
            <label
              className="block text-gray-700 mb-1"
              htmlFor="bureau"
            >
              Bureau de vote
            </label>
            <select
        id="bureau"
        value={formUser.bureau}
        name='bureau'
        onChange={handleInputuserChange}
        className="w-full p-2 border border-gray-300 rounded" >  
      
        <option value="" disabled>
          -- Select an option --
        </option>
        {bureauDeVoteList.map((circonscription, index) => (
          <option key={index} value={circonscription}>
            {circonscription}
          </option>
        ))}
      </select>
          </div>
        )}


        {/* Partie Politiques (only visible if role is "candidat") */} 

            {role === "CANDIDAT" && ( 
            <div className="mb-4"> 
            <label className="block text-gray-700 mb-1" htmlFor="political_party"> 
            Partie Politiques 
            </label> 
            <select 
            id="political_party" 
            name='political_party' 
            value={formUser.political_party} 
            onChange={handleInputuserChange} 
            className="w-full p-2 border border-gray-300 rounded" > 
            <option value="">-- Sélectionnez un partie --</option> 
            <option value="RDPC">RDPC</option> 
            <option value="PMUC">PMUC</option> 
            <option value="XLLT">XLLT</option> 
            <option value="KKLO">KKLO</option> 
            </select> 
            </div> 
            )} 
                  </div>
                </div>

    {/* Submit Button */}
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