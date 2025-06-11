 import React, { useEffect, useState } from "react";
import "./chatstyle.css";
import EmojiPicker from 'emoji-picker-react';
// import groupuser from '../images/group.png';


const ChatApp = () => {
 const [name, setName] = useState(localStorage.getItem("checkname"));
 const [chatList, setChatList] = useState([]);
 const [selectedUser, setSelectedUser] = useState();
 const [message, setMessage] = useState("");
 const [messages, setMessages] = useState([]);
 const [showEmojiPicker, setShowEmojiPicker] = useState();
 const [showMenu, setShowMenu] = useState(); 
 const [showOptionsMenu, setShowOptionsMenu] = useState(); 
 const [theme, setTheme] = useState();
 const [isCreatingGroup, setIsCreatingGroup] = useState();
 const [groupMembers, setGroupMembers] = useState([]);
 const [groupName, setGroupName] = useState("");
 const [wallpaper, setWallpaper] = useState('');
 const [grouplist , setgrouplist]= useState([]);
 const [selectedGroup, setSelectedGroup] = useState();
const [groupMessages, setGroupMessages] = useState([]);
const sender_id = localStorage.getItem("checkid");
const [receiver_id, setReceiverId] = useState();
const [image, setImages] = useState(localStorage.getItem("checkimage"));


 useEffect(() => {
 fetch("http://localhost:3005/user-profile", {
 method: "GET",
 headers: {
 "Content-Type": "application/json",
 },
 })
 .then((response) => response.json())
 .then((data) => setChatList(data))
 .catch((error) => console.error("Error fetching user profile:", error));
 }, []);
// -------groupList------
//  useEffect(() => {
//  fetch("http://localhost:3005/group-info", {
//  method: "GET",
//  headers: {
//  "Content-Type": "application/json",
//  },
//  })
//  .then((response) => response.json())
//  .then((data) => setgrouplist(data))
 
//  .catch((error) => console.error("Error fetching user profile:", error));
//  }, []);
 
useEffect(() => {

fetch(`http://localhost:3005/messages?sender_id=${sender_id}&receiver_id=${receiver_id}`, {
method: "GET",
headers: {
"Content-Type": "application/json",
},
},)
.then((response) => response.json())
.then((data) => {
if (Array.isArray(data)) {
const sortedMessages = data.sort((a, b) => new Date(a.sent_at) - new Date(b.sent_at));
setMessages(sortedMessages);
 
} else {
console.error("Unexpected data format:", data);
setMessages([]);
}
})
.catch((error) => console.error("Error fetching messages:", error));
 
}, [ ]);
 






// useEffect(()=>{
// fetch(`http://localhost:3005/group-messages?group_id=${group.id}`, {
// method: "GET",
// headers: {
// "Content-Type": "application/json",
// },
// })
// .then((response) => response.json())
// .then((data) => {
// if (Array.isArray(data)) {
// const sortedMessages = data.sort((a, b) => new Date(a.sent_at) - new Date(b.sent_at));
// console.log("msg",sortedMessages);
// setGroupMessages(sortedMessages);
 
// } else {
// console.error("Unexpected data format:", data);
// setGroupMessages([]);
// }
// })
// .catch((error) => console.error("Error fetching group messages:", error));

// },[groupMessages]);

 const openChat = (user) => {

 setReceiverId(user.id);
 setSelectedUser(user);


 fetch(`http://localhost:3005/messages?sender_id=${sender_id}&receiver_id=${user.id}`, {
 method: "GET",
 headers: {
 "Content-Type": "application/json",
 },
 })
 .then((response) => response.json())
 .then((data) => {
 console.log("data",data);
 if (Array.isArray(data)) {
 const sortedMessages = data.sort((a, b) => new Date(a.sent_at) - new Date(b.sent_at));
 setMessages(sortedMessages);
 } else {
 console.error("Unexpected data format:", data);
 setMessages([]);
 }
 })
 .catch((error) => console.error("Error fetching messages:", error));
 };
 
// ----select groupchat------

// const opengroupchat = (group) => {
//  setSelectedGroup(group);


//  fetch(`http://localhost:3005/group-messages?group_id=${group.id}`, {
//  method: "GET",
//  headers: {
//  "Content-Type": "application/json",
//  },
//  })
//  .then((response) => response.json())
//  .then((data) => {
//  if (Array.isArray(data)) {
//  const sortedMessages = data.sort((a, b) => new Date(a.sent_at) - new Date(b.sent_at));
//  console.log("msg",sortedMessages);
//  setGroupMessages(sortedMessages);
 
//  } else {
//  console.error("Unexpected data format:", data);
//  setGroupMessages([]);
//  }
//  })
//  .catch((error) => console.error("Error fetching group messages:", error));
// };

// ------sendMessage-----------------

const sendMessage = () => {
 
 

//  if (selectedGroup) {
 
//  const newMessage = { message_text: message, sender_id, group_id: selectedGroup.id };
//  console.log("newMessage",newMessage);
 
//  fetch("http://localhost:3005/send-group-message", {
//  method: "POST",
//  headers: {
//  "Content-Type": "application/json",
//  },
//  body: JSON.stringify(newMessage),
//  })
//  .then((response) => response.json())
//  .then((data) => {
//  if (data.success) {
//  fetchGroupMessages(selectedGroup.id);
//  setMessage("");
//  } else {
//  console.error("Failed to send group message:", data.error);
//  }
//  })
//  .catch((error) => console.error("Error sending group message:", error));

//  } else 
 if (selectedUser) {
 
 const newMessage = { text: message, sender_id, receiver_id };

 fetch("http://localhost:3005/send-message", {
 method: "POST",
 headers: {
 "Content-Type": "application/json",
 },
 body: JSON.stringify(newMessage),
 })
 .then((response) => response.json())
 .then((data) => {
 if (data.success) {
 fetchMessages(sender_id, receiver_id);
 setMessage("");
 } else {
 console.error("Failed to send private message:", data.error);
 }
 })
 .catch((error) => console.error("Error sending private message:", error));
 }
};

// --------fetchMessages-------------------------
const fetchMessages = (sender_id, receiver_id) => {
 fetch(`http://localhost:3005/messages?sender_id=${sender_id}&receiver_id=${receiver_id}`, {
 method: "GET",
 headers: {
 "Content-Type": "application/json",
 },
 })
 .then((response) => response.json())
 .then((data) => {
 if (Array.isArray(data)) {
 const sortedMessages = data.sort((a, b) => new Date(a.sent_at) - new Date(b.sent_at));
 setMessages(sortedMessages);
 } else {
 console.error("Unexpected data format:", data);
 setMessages([]);
 }
 })
 .catch((error) => console.error("Error fetching messages:", error));
};


// const fetchGroupMessages = (group_id) => {
//  fetch(`http://localhost:3005/group-messages? group_id=${group_id}`, {
//  method: "GET",
//  headers: {
//  "Content-Type": "application/json",
//  },
//  })
//  .then((response) => response.json())
//  .then((data) => {
//  if (Array.isArray(data)) {
//  console.log("data",data);
//  const sortedMessages = data.sort((a, b) => new Date(a.sent_at) - new Date(b.sent_at));
//  setGroupMessages(sortedMessages);
//  } else {
//  console.error("Unexpected data format:", data);
//  setGroupMessages([]);
//  }
//  })
//  .catch((error) => console.error("Error fetching group messages:", error));
// };
// -------timedate------------------------
 const formatDate = (timestamp) => {
 return new Intl.DateTimeFormat("en-US", {
 hour: "2-digit",
 minute: "2-digit",
 }).format(new Date(timestamp));
 };

 const onEmojiClick = (emojiObject) => {
 setMessage((prevMessage) => prevMessage + emojiObject.emoji);
 };

 const toggleMenu = () => {
 setShowMenu(!showMenu);
 
 };

// -------------createGroup----------
 
 const handleCreateGroup = () => {
 if (!groupName || groupMembers.length === 0) {
 alert("Please enter a group name and select members.");
 return;
 }
 
 const groupData = {
 groupName,
 groupMembers,
 createdBy: sender_id,
 };
 console.log("grouplist",groupData);
 console.log("groupname",groupName);
 console.log("groupmember",groupMembers);
 console.log("createdby",sender_id);
 
 fetch("http://localhost:3005/create-group", {
 method: "POST",
 headers: {
 "Content-Type": "application/json",
 },
 body: JSON.stringify(groupData),
 })
 .then((response) => response.json())
 .then((data) => {
 if (data.success) {
 alert("Group created successfully:", data.groupId);
 
 setIsCreatingGroup(false);
 setGroupName("");
 setGroupMembers([]);

 
 
 } else {
 console.error("Failed to create group:", data.error);
 }
 })
 .catch((error) => console.error("Error creating group:", error));
 };
 
 const handleSetting =() =>{};

 const handleLogout =() =>{
 localStorage.clear(); 
 window.location.href = 'http://localhost:3000/'; 
};

 const toggleOptionsMenu = () => {
 setShowOptionsMenu(!showOptionsMenu);
 };

// -------clearChat---------

 const handleClearChat = () => {
 
 fetch("http://localhost:3005/clear-messages", {
 method: "DELETE",
 headers: {
 "Content-Type": "application/json",
 },
 body: JSON.stringify({ sender_id, receiver_id }),
 })
 .then((response) => response.json())
 .then((data) => {
 if (data.success) {
 
 setMessages([]);
 console.log("Chat cleared successfully");
 } else {
 console.error("Failed to clear chat:", data.error);
 }
 })
 .catch((error) => console.error("Error clearing chat:", error));
 
 };

 const handleBlockUser = () => {
 console.log("Block clicked");
 };

const handleChangeWallpaper = (event) => {
 const file = event.target.files[0];
 if (file) {
 const reader = new FileReader();
 reader.onload = (e) => {
 setWallpaper(e.target.result); 
 };
 reader.readAsDataURL(file);
 }
 };


 const handleReport = () => {
 console.log("Report clicked");
 };
// --------theme--------

 const switchToDarkMode = () => {
 setTheme('dark');
 };

 const switchToLightMode = () => {
 setTheme('light');
 };
// const handleImageChange = (event) => {
// const file = event.target.files[0];
// if (file) {
// const reader = new FileReader();
// reader.onload = () => {
// setImages(reader.result); // Set the image in the state
// // Optionally send the image to the server to update the profile
// updateUserProfileImage(reader.result);
// };
// reader.readAsDataURL(file);
// }
// };



 return (
 <div className={`app-container ${theme}`}>
 <nav className="sidebar">
 <header className="sidebar-header">
 <div className="profile-container">
 <img src={image }alt="Your Profile" className="profile" />
 <div className="myprofile">
 <h3 id="name">{name}</h3>
 </div>
 </div>

 <div className="menu-container">
 <button className="menu-button" onClick={toggleMenu}>⋮</button>
 {showMenu && (
 <ul className="dropdown-menu">
 
 <li onClick={() => setIsCreatingGroup(true)}>New Group</li>


 {isCreatingGroup && (
 <div className="group-creation-modal">
 <h2>Create New Group</h2>
 <input type="text" placeholder="Enter group name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
 <ul className="user-selection-list">
 {chatList.map((user) => (
 <li key={user.id}>
 <label>
 
 <input type="checkbox" value={user.id} onChange={(e) => {
 const userId = e.target.value;
 if (e.target.checked) {
 console.log("check",e.target.checked);
 setGroupMembers([...groupMembers, userId]);
 console.log("groupMembers",userId);
 } else {
 setGroupMembers(groupMembers.filter((id) => id !== userId));
 }
 }}
 />
 <img src={user.images } className="gprofile" />

 {user.name}
 </label>
 </li>
 ))}
 </ul>
 <button onClick={handleCreateGroup}>Create Group</button>
 <button onClick={() => setIsCreatingGroup(false)}>Cancel</button>
 </div>
)} 
 


 <li onClick={handleSetting}>Settings</li>
 <li onClick={handleLogout}>Logout</li>
 
 <li onClick={switchToDarkMode}>Dark Mode</li>
 <li onClick={switchToLightMode}>Light Mode</li>
 </ul>
 )}
 </div>
 
 <input type="text" id="search-input" placeholder="Search" />
 </header>
 <ul id="chat-list">
 {chatList.map((user, index) => (
 <li key={index} className="chat-members" onClick={() => openChat(user)}>
 <img src={user.images} alt="profile pic" className="profile" />
 <div className="chat-info">
 <h2>{user.name}</h2>
 </div>
 </li>
 ))}
 {/* {grouplist.map((group, index) => (
 <li key={index} className="chat-members" onClick={() => opengroupchat(group)}>
 <img src={''} alt="profile pic" className="profile" />
 <div className="chat-info">
 <h2>{group.group_name}</h2>
 </div>
 </li>
 ))} */}
 </ul>
 </nav>
 <div className="chat-window">
 {(selectedUser || selectedGroup) && (
 <>
 <div className="chat-header">
 <img src={selectedUser ? selectedUser.images : ''} alt="profile" className="profile" id="chat-header-image" />
 <h2 id="chat-header-name">{selectedUser ? selectedUser.name : selectedGroup.group_name}</h2>
 <button className="options-button" onClick={toggleOptionsMenu}>⋮</button>
 {showOptionsMenu && (
 <ul className="options-menu">
 {selectedUser && (
 <>
 <li onClick={handleClearChat}>Clear Chat</li>
 <li onClick={handleBlockUser}>Block</li>
 
 <li onClick={() => document.getElementById("wallpaperInput").click()}> Wallpaper</li>
 <input type="file" id="wallpaperInput" style={{ display: 'none' }} accept="image/*" onChange={handleChangeWallpaper}/>
 <li onClick={handleReport}>Report</li>
 </>
 
 )}
 {selectedGroup && (
 <>
 <li onClick={handleClearChat}>Clear Group Chat</li>
 <li onClick={() => document.getElementById("wallpaperInput").click()}> Wallpaper</li>
 <input type="file" id="wallpaperInput" style={{ display: 'none' }} accept="image/*" onChange={handleChangeWallpaper}/>
 <li onClick={handleReport}>Report</li>
 </>
 )}
 </ul>
 )}
 </div>
 <div className="chat-messages" id="chat-messages" style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover' }}>
 {(selectedUser ? messages : groupMessages).map((msg, index) => (
 <div key={index} className={`message ${msg.sender_id === sender_id ? 'message-sent' : 'message-received'}`}>
 <p>{msg.message_text}</p>
 <span className="message-time">{formatDate(msg.sent_at)}</span>
 {/* {msg.sender_id === sender_id && (
 <span className="message-status">
 {msg.is_read ? '✔✔' : '✔'}
 </span>
 )} */}
 </div>
 ))}
 </div>
 </>
 )}
 <div className="chat-input">
 <label htmlFor="file" className="emoji">
 <img src={""} alt="file" id="icon"/>
 </label>
 <input type="file" id="file" onChange={(e) => {}} />
 <input type="text" id="message-input" placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} />
 <button id="send-button" onClick={sendMessage}>Send</button>
 <div className="emojiicon">
 {showEmojiPicker && <EmojiPicker onEmojiClick={onEmojiClick} />}
 <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
 </div>
 
 </div>
 

</div>

 </div>
 );
};
export default ChatApp;


