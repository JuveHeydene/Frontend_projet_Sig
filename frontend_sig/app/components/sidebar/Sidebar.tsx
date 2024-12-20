"use client"
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import "./Sidebar.scss";
interface MenuItem {
  id: string;
  icon: string;
  label: string|null;
  children: Array<MenuItem>|null;
  url: string;
}

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
  let menuItems:Array<MenuItem> = []
  switch (role) {
    case "ADMINISTRATEUR":
      menuItems = [
        { id: "Menu", icon: "keyboard_double_arrow_left", label: null, children: null ,url: "" },
        { id: "Dashboard", icon: "dashboard", label: "Dashboard", children: null ,url: "" },
        { id: "users", icon: "group", label: "Users", children:[
          {
            id: "CreateUsers",
            icon: "person_add",
            label: "Create Users",
            children: null,
            url: ""
          },
          {
            id: "user-list",
            icon: "people",
            label: "Registered people",
            children: null,
            url: ""
          }
        ] , url: ""},
        { id: "voting-centers", icon: "apartment", label: "Voting centers", children:[
          {
            id: "center-list",
            icon: "list",
            label: "Voting centers list",
            children: null,
            url: ""
          },
          {
            id: "add-voting-centers",
            icon: "add",
            label: "New voting center",
            children: null,
            url: ""
          }
        ] , url: ""},
        { id: "Voting-office", icon: "how_to_vote", label: "Voting office", children:[
          {
            id: "voting-office-list",
            icon: "list",
            label: "Voting office list",
            children: null,
            url: ""
          },
          {
            id: "add-voting-office",
            icon: "add",
            label: "Voting office",
            children: null,
            url: ""
          }
        ] , url: ""},
        { id: "voting-results", icon: "summarize", label: "Voting result", children:[
          {
            id: "consult-voting-result",
            icon: "visibility",
            label: "Consult results",
            children: null,
            url: ""
          },
          {
            id: "insert-result",
            icon: "edit",
            label: "Insert a vote result",
            children: null,
            url: ""
          }
        ] , url: ""},
        { id: "Settings", icon: "settings", label: "Settings", children: null  ,url: ""},
        { id: "Logout", icon: "logout", label: "Log Out", children: null ,url: "" },
      ];
    case "ENROLLEUR":
      menuItems = [
        { id: "Menu", icon: "keyboard_double_arrow_left", label: null, children: null ,url: "" },
        { id: "Dashboard", icon: "dashboard", label: "Dashboard", children: null ,url: "" },
        { id: "users", icon: "group", label: "Enrolled electors", children:[
          {
            id: "CreateUsers",
            icon: "person_add",
            label: "Add electors",
            children: null,
            url: ""
          },
          {
            id: "user-list",
            icon: "people",
            label: "Registered electors",
            children: null,
            url: ""
          }
        ] , url: ""},
        { id: "Settings", icon: "settings", label: "Settings", children: null  ,url: ""},
        { id: "Logout", icon: "logout", label: "Log Out", children: null ,url: "" },
      ];
    case "SCRUTATEUR":
      menuItems = [
        { id: "Menu", icon: "keyboard_double_arrow_left", label: null, children: null ,url: "" },
        { id: "Dashboard", icon: "dashboard", label: "Dashboard", children: null ,url: "" },
        { id: "voting-results", icon: "summarize", label: "Voting result", children:[
          {
            id: "consult-voting-result",
            icon: "visibility",
            label: "Consult office results",
            children: null,
            url: ""
          },
          {
            id: "insert-result",
            icon: "edit",
            label: "Edit office result",
            children: null,
            url: ""
          }
        ] , url: ""},
        { id: "Settings", icon: "settings", label: "Settings", children: null  ,url: ""},
        { id: "Logout", icon: "logout", label: "Log Out", children: null ,url: "" },
      ];
    case "SUPERVISEUR":
      menuItems = [
        { id: "Menu", icon: "keyboard_double_arrow_left", label: null, children: null ,url: "" },
        { id: "Dashboard", icon: "dashboard", label: "Dashboard", children: null ,url: "" },
        { id: "users", icon: "group", label: "Users", children:[
          {
            id: "CreateUsers",
            icon: "person_add",
            label: "Create Users",
            children: null,
            url: ""
          },
          {
            id: "user-list",
            icon: "people",
            label: "Registered people",
            children: null,
            url: ""
          }
        ] , url: ""},
        { id: "Settings", icon: "settings", label: "Settings", children: null  ,url: ""},
        { id: "Logout", icon: "logout", label: "Log Out", children: null ,url: "" },
      ];
    
      break;
  
    default:
      menuItems = [
        { id: "Menu", icon: "keyboard_double_arrow_left", label: null, children: null ,url: "" },
        { id: "Dashboard", icon: "dashboard", label: "Dashboard", children: null ,url: "" },
        { id: "users", icon: "group", label: "Users", children:[
          {
            id: "CreateUsers",
            icon: "person_add",
            label: "Create Users",
            children: null,
            url: ""
          },
          {
            id: "user-list",
            icon: "people",
            label: "Registered people",
            children: null,
            url: ""
          }
        ] , url: ""},
        { id: "voting-centers", icon: "apartment", label: "Voting centers", children:[
          {
            id: "center-list",
            icon: "list",
            label: "Voting centers list",
            children: null,
            url: ""
          },
          {
            id: "add-voting-centers",
            icon: "add",
            label: "New voting center",
            children: null,
            url: ""
          }
        ] , url: ""},
        { id: "Voting-office", icon: "how_to_vote", label: "Voting office", children:[
          {
            id: "voting-office-list",
            icon: "list",
            label: "Voting office list",
            children: null,
            url: ""
          },
          {
            id: "add-voting-office",
            icon: "add",
            label: "Voting office",
            children: null,
            url: ""
          }
        ] , url: ""},
        { id: "voting-results", icon: "summarize", label: "Voting result", children:[
          {
            id: "consult-voting-result",
            icon: "visibility",
            label: "Consult results",
            children: null,
            url: ""
          },
          {
            id: "insert-result",
            icon: "edit",
            label: "Insert a vote result",
            children: null,
            url: ""
          }
        ] , url: ""},
        { id: "Settings", icon: "settings", label: "Settings", children: null  ,url: ""},
        { id: "Logout", icon: "logout", label: "Log Out", children: null ,url: "" },
      ];
  }
  

  

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
