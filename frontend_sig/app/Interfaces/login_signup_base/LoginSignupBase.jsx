import {createBrowserRouter, RouterProvider, Link, Outlet, NavLink} from "react-router-dom";
import React from 'react'
import myImage from '../../assets/LOGO.jpg'

import './LoginSignupBase.scss';


const LoginSignupBase = () => {
  return (
    <div className="grid-container">
        <section className="logo">
            <img src={myImage} alt="Description de l'image"/>
            <h1>Intra-SMS</h1>
        </section>
        <Outlet/>
    </div>
  )
}

export default LoginSignupBase