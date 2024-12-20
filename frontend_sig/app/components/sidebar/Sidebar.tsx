"use client"
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import "./Sidebar.scss";

const Sidebar = (role:any) => {
  const sidebarRef = useRef<HTMLElement>(null);
  const toggleBtnRef = useRef<HTMLAnchorElement | null>(null);
  const toggleSidebar = (event:React.MouseEvent)=>{
    if (sidebarRef.current) {
      sidebarRef.current.classList.toggle('close')
      toggleBtnRef.current?.classList.toggle('rotate')
    }
    closeAllSubMenus()
  }
  const closeAllSubMenus = ()=>{
    const showElements = Array.from(sidebarRef.current?.getElementsByClassName('show') || []);
    showElements.forEach(ul=>{
      ul.classList.remove('show')
      ul.previousElementSibling?.classList.remove('rotate')
    })
  }
  function toggleSubMenu(button:any): void {
    //closeAllSubMenus()
    if (!button.nextElementSibling.classList.contains('show')) {
      closeAllSubMenus()
    }
    button.nextElementSibling?.classList.toggle('show')
    button.classList.toggle('rotate')

    if (sidebarRef.current?.classList.contains('close')) {
      sidebarRef.current.classList.toggle('close')
      toggleBtnRef.current?.classList.toggle('rotate')
    }
  }
  const menuItems = [
    { id: "Menu", icon: "keyboard_double_arrow_left", label: null, children: null },
    { id: "Dashboard", icon: "dashboard", label: "Dashboard", children: null },
    { id: "HomePage", icon: "home", label: "Home Page", children: null },
    { id: "AllUsers", icon: "people", label: "All Users", children: null },
    { id: "Create", icon: "add", label: "Create", children:[
      {
        id: "CreateUsers",
        icon: "person_add",
        label: "Create Users",
        children: null,
      },
      {
        id: "VotingCenter",
        icon: "apartment",
        label: "Create Center",
        children: null,
      },
      {
        id: "Favorite",
        icon: "how_to_vote",
        label: "Create VoteOffice",
        children: null,
      },
    ] },
    { id: "Settings", icon: "settings", label: "Settings", children: null },
    { id: "AdvancedParameters", icon: "tune", label: "ADVANCE PARAMETERS", children: null },
    { id: "AboutElection", icon: "info", label: "About Election", children: null },
    { id: "LightDarkMode", icon: "light_mode", label: "Light/Dark Mode", children: null },
    { id: "Logout", icon: "logout", label: "Log Out", children: null },
  ];

  

  return (
    <aside ref={sidebarRef}>
        <ul>
          {menuItems.map((item) => (
            <li
              
              key={item.id}
              
              className="active"
            >
              {item.children ? (
                <>
                  <button onClick={(e)=>toggleSubMenu(e.currentTarget as HTMLButtonElement)} className="dropdown-btn">
                    <i className="material-icons">{item.icon}</i>
                    <span>{item.label}</span>
                    <i className="material-icons">arrow_drop_down</i>
                  </button>
                  <ul className="sub-menu">
                    <div>
                    {item.children.map((child) => (
                      
                        <li
                        key={child.id}
                        
                        
                        className="active"
                        >
                        <a href="#">
                          <i className="material-icons">{child.icon}</i>
                          <span>{child.label}</span>
                          </a>
                        </li>
                     
                      
                    ))}
                    </div>
                  </ul>
                </>
              ) : (
                item.id === "Menu"?(
                  <a href="#" id={item.id} ref={toggleBtnRef} onClick={(e)=>toggleSidebar(e)}>
                    <i className="material-icons" >{item.icon}</i>
                    
                  </a>
                ):(
                  <a href="#" id={item.id}>
                    <i className="material-icons" >{item.icon}</i>
                    <span>{item.label}</span>
                  </a>
                )
                
              )}
            </li>
          ))}
        </ul>
      </aside>
  );
};

export default Sidebar;
