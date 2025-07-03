 import React, { useEffect, useState } from "react";
import "./chatstyle.css";
import EmojiPicker from 'emoji-picker-react';
import Sidebar from "./sideBar";
import GroupCreationModal from "./createGroup";
import Info from './info'
import { FaFileImage } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa";


const ChatApp = () => {
 const [name, setName] = useState(localStorage.getItem("checkname"));
 const [chatList, setChatList] = useState([]);
 const [selectedUser, setSelectedUser] = useState();
 const [message, setMessage] = useState("");
 const [messages, setMessages] = useState([]);
 const [showEmojiPicker, setShowEmojiPicker] = useState();
 const [showOptionsMenu, setShowOptionsMenu] = useState(); 
 const [theme, setTheme] = useState();
 const [isCreatingGroup, setIsCreatingGroup] = useState();
 const [groupMembers, setGroupMembers] = useState([]);
 const [groupName, setGroupName] = useState("");
 const [window_wallpaper, setWallpaper] = useState('');
 const [grouplist , setgrouplist]= useState([]);
 const [selectedGroup, setSelectedGroup] = useState();
 const [group_members,setgroupmembers]=useState();
const[grouppic,setgrouppic]=useState();
 const [group_ID,setGroupID]=useState();
const [groupMessages, setGroupMessages] = useState([]);
const sender_id = localStorage.getItem("checkid");
const [receiver_id, setReceiverId] = useState();
const [image, setImages] = useState(localStorage.getItem("checkimage"));
const [Is_info,setIs_info]= useState();



useEffect(() => {
 fetch("http://localhost:3005/user-profile", {
 method: "GET",
 headers: {
 "Content-Type": "application/json",
 },
 })
 .then((response) => response.json())
 .then((data) => setChatList(data))
  fetch(`http://localhost:3005/group-info?user_id=${sender_id}`, {
 method: "GET",
 headers: {
 "Content-Type": "application/json",
 },
 })
 .then((response) => response.json())
 .then((data) => setgrouplist(data))
 .catch((error) => console.error("Error fetching user profile:", error));
 }, []);

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
 
}, [messages]);

useEffect(()=>{
fetch(`http://localhost:3005/group-messages?group_id=${group_ID}`, {
method: "GET",
headers: {
"Content-Type": "application/json",
},
})
.then((response) => response.json())
.then((data) => {
if (Array.isArray(data)) {
const sortedMessages = data.sort((a, b) => new Date(a.sent_at) - new Date(b.sent_at));
console.log("msg",sortedMessages);
setGroupMessages(sortedMessages);
 
} else {
console.error("Unexpected data format:", data);
setGroupMessages([]);
}
})
.catch((error) => console.error("Error fetching group messages:", error));

},[groupMessages]);

const openChat = (user) => {
setReceiverId(user.id);
 setSelectedUser(user);
 setSelectedGroup(null);
fetch(`http://localhost:3005/messages?sender_id=${sender_id}&receiver_id=${user.id}`, {
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
 
// ----select groupchat------

const opengroupchat = (group) => {
  console.log("groupimages",group.images);
  setgrouppic(group.images);
 setSelectedGroup(group);
 setSelectedUser(null);
 setGroupID(group.id)
 
 fetch(`http://localhost:3005/group-messages?group_id=${group.id}`, {
 method: "GET",
 headers: {
 "Content-Type": "application/json",
 },
 })
 .then((response) => response.json())
 .then((data) => {
 if (Array.isArray(data)) {
 const sortedMessages = data.sort((a, b) => new Date(a.sent_at) - new Date(b.sent_at));
 console.log("msg",sortedMessages);
 setGroupMessages(sortedMessages);
 }
  else {
 console.error("Unexpected data format:", data);
 setGroupMessages([]);
 }
 })
 .catch((error) => console.error("Error fetching group messages:", error));
};

// ------sendMessage-----------------

const sendMessage = () => {
 if (selectedGroup) {

  const newMessage = { message_text: message, sender_id, group_id: selectedGroup.id };
  fetch("http://localhost:3005/send-group-message", {
 method: "POST",
 headers: {
 "Content-Type": "application/json",
 },
 body: JSON.stringify(newMessage),
 })
 .then((response) => response.json())
 .then((data) => {
 if (data.success) {
 fetchGroupMessages(selectedGroup.id);
 setMessage("");
 } else {
 console.error("Failed to send group message:", data.error);
 }
 })
 .catch((error) => console.error("Error sending group message:", error));
} else 
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
const fetchGroupMessages = (group_id) => {
 fetch(`http://localhost:3005/group-messages?group_id=${group_id}`, {
 method: "GET",
 headers: {
 "Content-Type": "application/json",
 },
 })
 .then((response) => response.json())
 .then((data) => {
 if (Array.isArray(data)) {
 const sortedMessages = data.sort((a, b) => new Date(a.sent_at) - new Date(b.sent_at));
 console.log("groupMessage232",sortedMessages);
 setGroupMessages(sortedMessages);
} else {
 console.error("Unexpected data format:", data);
 setGroupMessages([]);
 }
 })
 .catch((error) => console.error("Error fetching group messages:", error));
};
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
 setShowOptionsMenu(false);
 console.log("Chat cleared successfully");
 } else {
 console.error("Failed to clear chat:", data.error);
 }
 })
 .catch((error) => console.error("Error clearing chat:", error));
 
 };

 const handleCleargroupChat =()=>{
  console.log("groupMessages cleared",group_ID);
  fetch("http://localhost:3005/clear-groupmessages",{
    method:"DELETE",
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify({group_ID})
  })
  .then((response)=> response.json())
  .then((data)=>{
    if (data.success){
      setGroupMessages([]);
      setShowOptionsMenu(false);
      console.log("GroupChat cleared successfully");
    }else{
      console.log("Failed to clear chat:")
    }
  })
  .catch((error) => console.error("Error clearing chat:", error));
 }

 const openStatus =()=>{
  console.log("groupmembers",group_members)
  setIs_info(!Is_info);
  if(selectedGroup){
  console.log("selectedGroup is check",selectedGroup.id)
  console.log("checkmembers")
  fetch(`http://localhost:3005/group-members?group_id=${selectedGroup.id}`,{
    method:"GET",
    headers:{
       "Content-Type": "application/json",
      }
    }
)
  .then((response) => response.json())
  .then((data)=>{setgroupmembers(data)})
} 
 }

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
 console.log(" check wallpaper",window_wallpaper);
fetch(`http://localhost:3005/wallpaper`,{
  method:"Post",
  headers:{
    "Content-Type":"application/json",
  },
  body : JSON.stringify(window_wallpaper)
})
 .then((response)=> response.json())
 .then((data)=>{console.log("wallpaper upload successfully")})
  };


 const handleReport = () => {
 console.log("Report clicked");
 };
 
  const handleClear =(id)=>{

    console.log("clear_message",id);
    const ID = id;
 fetch(`http://localhost:3005/clear-singlemsg?userid=${ID}`,{
      method:"DELETE",
      headers:{
        "Content-Type": "application/json",
      },
    })
    .then((response)=> response.json())
    .then((data)=>{
      if(data.success){
        console.log("cleared")
         fetchMessages(sender_id, receiver_id);
      }
      else {
 console.error("Failed to clear chat:");
 }
 })
  }
  const handlecleargroupmsg =(id)=>{
    console.log("clearGroupchat",id);
    fetch(`http://localhost:3005/clear-singlegroupmsg?groupid=${id}`,{
      method:"DELETE",
      headers:{
         "Content-Type": "application/json",
      },
    })
        .then((response)=> response.json())
    .then((data)=>{
      if(data.success){
        console.log("cleared")
         fetchGroupMessages(selectedGroup.id);
      }
      else {
 console.error("Failed to clear chat:");
 }
 })
    
  }
  const handlefile =(file)=>{
    console.log("file",file);
  }

 return (
 <div className={`app-container ${theme}`}>
  <Sidebar 
  name={name}
  image={image}
  chatList={chatList}
   setTheme={setTheme}
    openChat={openChat}
    opengroupchat={opengroupchat}
    setIsCreatingGroup={setIsCreatingGroup}
    grouplist={grouplist}  
  />
  {isCreatingGroup && ( <GroupCreationModal
groupName={groupName}
groupMembers={groupMembers}
chatList={chatList}
sender_id={sender_id}
setGroupName={setGroupName}
setGroupMembers={setGroupMembers}
setIsCreatingGroup={setIsCreatingGroup}
 />)}

 <div className="chat-window">
 {(selectedUser || selectedGroup) && (
 <>
 <div className="chat-header">
  <span  className="chat-user" onClick={()=> openStatus()} >
 <img src={selectedUser ? selectedUser.images : selectedGroup.images} alt="profile" className="profile" id="chat-header-image" />
 <h2 id="chat-header-name">{selectedUser ? selectedUser.Name : selectedGroup.group_name}</h2>
 </span>
 <button className="options-button" onClick={toggleOptionsMenu}>⋮</button>
 {showOptionsMenu && (
 <ul className="options-menu">
 {selectedUser && (
 <>
 <li onClick={handleClearChat}>Clear All Chat</li>
 <li onClick={handleBlockUser}>Block</li>
 <li onClick={() => document.getElementById("wallpaperInput").click()}> Wallpaper</li>
 <input type="file" id="wallpaperInput" style={{ display: 'none' }} accept="image/*" onChange={handleChangeWallpaper}/>
 <li onClick={handleReport}>Report</li>
 </>
 )}
 {selectedGroup && (
 <>
 <li onClick={handleCleargroupChat}>Clear All Group Chat</li>
 <li onClick={() => document.getElementById("wallpaperInput").click()}> Wallpaper</li>
 <input type="file" id="wallpaperInput" style={{ display: 'none' }} accept="image/*" onChange={handleChangeWallpaper}/>
 {/* <li onClick={handleExistGroup}>Exist</li> */}
 <li onClick={handleReport}>Report</li>
 </>
 )}
 </ul>
 )}
 </div>
 <Info Is_info={Is_info}
 group_members={group_members}
 selectedGroup={selectedGroup}
 selectedUser={selectedUser}
 grouppic={grouppic}
 />
<div className="chat-messages"  style={{ backgroundImage: `url(${window_wallpaper})`, backgroundSize: 'cover' }}>
 {(selectedUser ? messages : groupMessages).map((msg, index) => (  
 <div key={index} className={`message ${msg.sender_id === sender_id ? 'message-sent' : 'message-received'}`}>
{!selectedUser && <span id="msg-name">{msg.name}</span>}
{selectedUser ? (
      <p onClick={() => handleClear(msg.id)}>{msg.message_text}</p>
    ) : (
      <p onClick={() => handlecleargroupmsg(msg.id)}>{msg.message_text}</p>
    )}
  
 <span className="message-time">{formatDate(msg.sent_at)}</span>
  {/* {msg.sender_id === sender_id && (
 <span className="message-status">
 {msg.is_read ?'✔✔': '✔'}
 </span>
 )}  */}
</div>

 ))}
 </div>
 </>

 )}
 
 <div className="chat-input">
 <label htmlFor="file" className="emoji">
 <span id="fileicon"><FaFileImage size={30} /></span>
 </label>
 <input type="file" id="file" onChange={(e) => {handlefile(e.target)}} />
 <input type="text" id="message-input" placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} />
 <button id="send-button" onClick={sendMessage}>Send</button>
 <span className="emojiicon">
 {showEmojiPicker && <EmojiPicker onEmojiClick={onEmojiClick} />}
  <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button> 
 </span>
 </div>
 </div>
{/* ------chatWindow------- */}
</div>
 );
};
export default ChatApp;


