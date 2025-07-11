import React, { useEffect, useState } from "react";
import { MdSettingsSuggest } from "react-icons/md";

const Sidebar = ({
  name,
  image,
  chatList,
  openChat,
  setIsCreatingGroup,
  setTheme,
  opengroupchat,
  grouplist,
  sender_id,
  receiver_id,
  message
}) => {
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState();
  const [lastMessages, setLastMessages] = useState({});
  const [lastGroupMessages, setLastGroupMessages] = useState({});
  console.log("ejncejine",lastGroupMessages

  )


  const Filteruser = chatList.filter((user)=> user.Name.toLowerCase().includes(search.toLowerCase()))
  const FilterGroup = grouplist.filter((group)=> group.group_name.toLowerCase().includes(search.toLowerCase()))
  const switchToDarkMode = () => {
  setTheme('dark');
  setShowMenu(!showMenu);
 };
  const switchToLightMode = () => {
  setTheme('light');
  setShowMenu(!showMenu);
 };
  const handleLogout =() =>{
  localStorage.clear(); 
  window.location.href = 'http://localhost:3000/'; 
};
  const handleSetting =() =>{console.log("Hello")};
  const toggleMenu = () => {
  setShowMenu(!showMenu);
 
 };
useEffect(() => {
  
    const messages = {};

    for (let user of chatList) {
     
        fetch(`http://localhost:3005/last-message?sender_id=${sender_id}&receiver_id=${user.id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        })

        .then(res => res.json())
        .then(data => {
          messages[user.id] = {
            text: data.message_text || "",
            time: data.sent_at || null
          };
          console.log( "messages_id",messages[user.id])
        })
      
    }

    setLastMessages(messages);

}, [chatList, sender_id]);

useEffect(() => {
 
    const messages = {};

    for (let group of grouplist) {
     
        fetch(`http://localhost:3005/last-group-message?group_id=${group.id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        })

        .then(res => res.json())
        .then(data=>{
        messages[group.id] = {
          text: data.message_text || "",
          time: data.sent_at || null
        };
      })
      
    }

    setLastGroupMessages(messages);
  

 
}, [grouplist]);


const formatTime = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
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
          <button className="menu-button" onClick={toggleMenu}><MdSettingsSuggest size={30} /></button>
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
       
     
        <input type="text" id="search-input" placeholder="  🔎 Search..." value={search} onChange={(e) => setSearch(e.target.value)}/>
      </header>

      <ul id="chat-list">
     {Filteruser.map((user, index) => {
  const last = lastMessages[user.id];
  console.log("last",last);

  return (
    <li key={index} className="chat-members" onClick={() => openChat(user)}>
      <img src={user.images} alt="profile pic" className="profile" />
      <div className="chat-info">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>{user.Name}</h2>
          <span style={{ fontSize: "0.8rem", color: "gray" }}>
            {last?.time ? formatTime(last.time) : ""}
          </span>
        </div>
        <p>
          {last?.text
            ? last.text.length > 20
              ? `${last.text.slice(0, 20)}...`
              : last.text
            : "No messages yet"}
        </p>
      </div>
    </li>
  );
})}

        
{FilterGroup.map((group, index) => {
  const last = lastGroupMessages[group.id];

  return (
    <li key={index} className="chat-members" onClick={() => opengroupchat(group)}>
      <img src={group.images || ""} alt="profile pic" className="profile" />
      <div className="chat-info">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>{group.group_name}</h2>
          <span style={{ fontSize: "0.8rem", color: "gray" }}>
            {last?.time ? formatTime(last.time) : ""}
          </span>
        </div>
        <p>
          {last?.text
            ? last.text.length > 20
              ? `${last.text.slice(0, 20)}...`
              : last.text
            : "No messages yet"}
        </p>
      </div>
    </li>
  );
})}

 </ul>
</nav>
  );
};

export default Sidebar;
