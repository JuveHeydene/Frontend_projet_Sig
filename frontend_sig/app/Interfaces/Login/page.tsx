"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useRouter } from 'next/navigation';


interface usersignin {
  username:string,
  password:string
}
const LoginPage=()=>{
  const router = useRouter();

  const [formData,setFormData ]=useState<usersignin>({
    username:"",
    password:""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    
    const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    
  };


  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
  try {
    console.log("User to log in info :",formData)
      const response = await fetch('http://localhost:3001/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(formData),
      });
      console.log("HERE IS data to send log in ",formData)

      if(response.ok){
        const data = await response.json();
        console.log("here is your response "+data.id);
        console.log("here is your response "+data.accessToken);
        console.log("here is your response "+data.roles);

        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('username', data.username);
        localStorage.setItem('roles', JSON.stringify(data.roles));
        alert("User log in  succesfully")
        router.push('/Interfaces/ReceptionpageAferLogin');

        
      }else 
      {
        console.error('Error registring user ', response.statusText);
      }
    
  } catch (error) {
    console.error('Error registring user');
  }
  }



    return(
        <div>
            <div className="flex flex-row w-full h-screen  justify-between">

                <div className="flex flex-col items-center mt-20  w-full gap-y-4 ">
                 
                <div 
  className=" text-gray-300 border "  
  style={{ width: 'clamp(50px, 20vw, 100px)',}}>

  
</div>

                    <h1 className="font-bold text-black text-3xl whitespace-nowrap text-[clamp(0rem,2vw,2rem)] mx-10">WELCOME BACK!</h1>
                    <p className="font-light text-xs">Please sign in with details...</p>
                    <form className= "  w-full max-w-[400px]" onSubmit={handleSubmit}>

                    <input 
              type="text"
              name="username"
              value={formData.username}
                onChange={handleChange}
              className= " block w-full max-w-[400px]  h-10 border bg-white border-gray-300 rounded-md p-2 "  
              placeholder="Username"/> 

               <div className="w-full max-w-[400px]">
                <input  
              type="text"
              name="password"
              value={formData.password}
                onChange={handleChange}
              className= " block w-full max-w-[400px]  h-10 border bg-white border-gray-300 rounded-md p-2"  
              placeholder="Password"/> 

              <div className="flex flex-row ">
                <p className="underline text-gray-500 ">forgot Password?</p>
              </div>
              </div>


              <button type="submit" className="block w-full max-w-[400px]  h-10 border bg-black text-white rounded-md p-2"
               
              >Sign In</button>

              </form>

              <p className="text-gray-500">Don't  have an account yet? <Link href={"/Interfaces/SignUp"}><span className="underline text-black">Sing Up</span></Link></p>


                </div>


            

                
            </div>
        </div>
    )
}

export default LoginPage