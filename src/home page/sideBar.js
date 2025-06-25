// import React from 'react';
import GroupCreationModal from './createGroup';

 import React, { useEffect, useState } from "react";

const Sidebar = ({
  name,
  image,
  chatList,
  // toggleMenu,
  openChat,
  // showMenu,
  setIsCreatingGroup,
  setTheme,
  opengroupchat,
  grouplist

  
 
}) => {
   const [search, setSearch] = useState("");
    const [showMenu, setShowMenu] = useState();
   const Filteruser = chatList.filter((user)=> user.Name.toLowerCase().includes(search.toLowerCase()))
    const FilterGroup = grouplist.filter((group)=> group.group_name.toLowerCase().includes(search.toLowerCase()))
   console.log("searchinputvalue",search);
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
  const toggleMenu = () => {
  console.log("Toogle_Menu");
 setShowMenu(!showMenu);
 
 };


  return (
<nav className="sidebar">
<header className="sidebar-header">
        <div className="profile-container">
        
     <img src={image} alt="Profile"  id ="pic" className="profile" />
         <div className="myprofile">
            <h3 id ="name">{name}</h3>
            </div>
              <div className="menu-container">
          <button className="menu-button" onClick={toggleMenu}>⋮</button>
          {showMenu && (
            <ul className='dropdown-menu'>
              <li onClick={()=>setIsCreatingGroup(true)}>New Group</li>
              <li onClick={handleLogout}>Logout</li>
              <li onClick={switchToDarkMode}>Dark Mode</li>
              <li onClick={switchToLightMode}>Light Mode</li>
            </ul>
          )}
        </div>
        </div>
      
        <input type="text" id="search-input" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
      
      </header>

      <ul id="chat-list">
        {Filteruser.map((user,index) => (
     <li key={index} className="chat-members" onClick={()=> openChat(user)} >
            <img src={user.images} alt={"profile pic"} className="profile" />
            <div className="chat-info"> 
            
            <h2>{user.Name}</h2>
            </div>
          </li>
        ))}
        {FilterGroup.map((group, index) => (
 <li key={index} className="chat-members" onClick={() => opengroupchat(group)}>
 <img src={""} alt="profile pic" className="profile" />
 <div className="chat-info">
 <h2 >{group.group_name}</h2>
 </div>
 </li>
 ))}
 </ul>
</nav>
  );
};

export default Sidebar;
