"use client"
import React, { useState } from "react";
import Image from "next/image";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard"); // Track active menu item
  const [isCollapsed, setIsCollapsed] = useState(false); // Track sidebar state

  const menuItems = [
    { id: "Menu", icon: "/Images/icons8_menu_99px 1.png", label: "Menu" },
    { id: "Dashboard", icon: "/Images/icons8_dashboard_layout_99px 1.png", label: "Dashboard" },
    { id: "HomePage", icon: "/Images/icons8_home_99px 1.png", label: "Home Page" },
    { id: "AllUsers", icon: "/Images/icons8_staff_99px_1 1.png", label: "All Users" },
    { id: "CreateUsers", icon: "/Images/icons8_add_administrator_99px 1.png", label: "Create Users" },
    { id: "VotingCenter", icon: "/Images/icons8_location_99px_1 1.png", label: "Voting Center" },
    { id: "Favorite", icon: "/Images/icons8_rating_99px 1.png", label: "Favorite" },
    { id: "Settings", icon: "/Images/icons8_settings_99px 1.png", label: "Settings" },
    { id: "AdvancedParameters", icon: "/Images/icons8_menu_99px 1.png", label: "ADVANCE PARAMETERS" },
    { id: "AboutElection", icon: "/Images/Info Popup.png", label: "About Election" },
    { id: "LightDarkMode", icon: "/Images/Sun.png", label: "Light/Dark Mode" },
    { id: "Logout", icon: "/Images/Logout Rounded.png", label: "Log Out" },
  ];

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleMenuClick = (id: string) => {
    setActiveItem(id);
  };

  return (
    <div
      className={`flex flex-col gap-y-4 bg-black h-screen ${
        isCollapsed ? "w-20" : "w-72"
      } transition-all duration-300`}
    >
      {/* Toggle Button */}
      <div className="ml-auto mr-4 mt-3 cursor-pointer" onClick={handleToggleSidebar}>
        <Image
          src="/Images/Back To.png"
          alt="Toggle Sidebar"
          width={20}
          height={20}
        />
      </div>

      {/* Menu Items */}
      {menuItems.map((item) => (
        <div
          key={item.id}
          onClick={() => handleMenuClick(item.id)}
          className={`flex items-center ml-4 gap-x-5 p-2 rounded-lg cursor-pointer transition-all duration-300 ${
            activeItem === item.id
              ? "bg-slate-600 text-black"
              : "text-white hover:bg-slate-500"
          }`}
        >
          <Image src={item.icon} alt={`${item.label} Icon`} width={20} height={20} />
          {!isCollapsed && <h1 className="text-bold">{item.label}</h1>}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
