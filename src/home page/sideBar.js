import React from 'react';
import GroupCreationModal from './createGroup';

// import React, { useEffect, useState } from "react";

const Sidebar = ({
  name,
  image,
  chatList,
  toggleMenu,
  openChat,
  showMenu,
  
 
}) => {
  //  const [showMenu, setShowMenu] = useState(); 
//   const toggleMenu = () => {
//  setShowMenu(!showMenu);
 
//  };
  return (
<div className="sidebar">
<header className="sidebar-header">
        <div className="profile-container">
     <img src={image} alt="Profile" className="profile" />
         <div className="myprofile">
            <h3 id ="name">{name}</h3>
            </div>
        </div>
        <div className="menu-container">
          <button className="menu-button" onClick={toggleMenu}>⋮</button>
          {/* {showMenu && <GroupCreationModal/> } */}
        </div>
      </header>

      <div className="chat-list">
        <h4>Users</h4>
        {chatList.map((user) => (
     <div key={user.id} className="chat-members" onClick={ openChat(user)} >
            <img src={user.image} alt={"profile pic"} className="profile" />
            <h2>{user.name}</h2>
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default Sidebar;
