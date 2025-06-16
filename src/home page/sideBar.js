// import React from 'react';
import GroupCreationModal from './createGroup';

 import React, { useEffect, useState } from "react";

const Sidebar = ({
  name,
  image,
  chatList,
  toggleMenu,
  openChat,
  showMenu,
  setIsCreatingGroup,
  setTheme,
  opengroupchat,
  grouplist

  
 
}) => {
  console.log("name",name);
   const switchToDarkMode = () => {
 setTheme('dark');
 };
  const switchToLightMode = () => {
 setTheme('light');
 };
   const handleLogout =() =>{
 localStorage.clear(); 
 window.location.href = 'http://localhost:3000/'; 
};
 const handleSetting =() =>{console.log("Hello")};
//  const [isCreatingGroup,setisCreatingGroup]=useState(false);
//  console.log("createGroup",isCreatingGroup);
    // const [showMenu, setShowMenu] = useState(false); 

  return (
<nav className="sidebar">
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
          {showMenu && (
            <ul className='dropdown-menu'>
              <li onClick={()=>setIsCreatingGroup(true)}>New Group</li>
              {/* <li onClick={handleSetting}>Settings</li> */}
              <li onClick={handleLogout}>Logout</li>
              <li onClick={switchToDarkMode}>Dark Mode</li>
              <li onClick={switchToLightMode}>Light Mode</li>
            </ul>
          )}
        </div>
        <input type="text" id="search-input" placeholder="Search" />
      </header>

      <ul id="chat-list">
        {chatList.map((user,index) => (
     <li key={index} className="chat-members" onClick={()=> openChat(user)} >
            <img src={user.images} alt={"profile pic"} className="profile" />
            <div className="chat-info"> 
            
            <h2>{user.Name}</h2>
            </div>
          </li>
        ))}
        {grouplist.map((group, index) => (
 <li key={index} className="chat-members" onClick={() => opengroupchat(group)}>
 <img src={''} alt="profile pic" className="profile" />
 <div className="chat-info">
 <h2>{group.group_name}</h2>
 </div>
 </li>
 ))}
        
        
      </ul>

     
    </nav>
  );
};

export default Sidebar;
