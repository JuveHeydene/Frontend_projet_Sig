"use client"
import React, { useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import './Layout.scss'

interface LayoutProps {
  role: string; // Déclare le rôle comme une chaîne
  children: React.ReactNode; // Accepte des enfants React
}

const Layout: React.FC<LayoutProps> = ({children, role}) => {
  const pagesWithoutLayout = ['/login', '/']; // Pas de Layout (Navbar/Sidebar) pour ces pages
  
  if (pagesWithoutLayout.includes(typeof window !== 'undefined' ? window.location.pathname : '')) {
    return <>{children}</>;
  }
  useEffect(()=>{
    console.log("role : ", role)
  },[])

  return (
    <div className='layout'>
      <Navbar />
      <Sidebar role={role} />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
