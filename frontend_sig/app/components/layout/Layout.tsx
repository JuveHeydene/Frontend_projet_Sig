import React from 'react';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import './Layout.scss'

const Layout = ({ children, role }:any) => {
  const pagesWithoutLayout = ['/login', '/']; // Pas de Layout (Navbar/Sidebar) pour ces pages
  
  if (pagesWithoutLayout.includes(typeof window !== 'undefined' ? window.location.pathname : '')) {
    return <>{children}</>;
  }

  return (
    <div className='layout'>
      <Navbar />
      <Sidebar role={role} />
      <main >
          children
      </main>
    </div>
  );
};

export default Layout;
