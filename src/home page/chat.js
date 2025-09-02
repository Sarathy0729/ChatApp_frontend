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
 const [grouplist , setgrouplist]= useState([]);
 const [selectedGroup, setSelectedGroup] = useState();
 const [chatwallpaper,setchatwallpaper]=useState([]);
 const [groupwallpaper,setgroupwallpaper]=useState([])
 const [group_members,setgroupmembers]=useState();
 const[grouppic,setgrouppic]=useState();
 const [group_ID,setGroupID]=useState();
 const [groupMessages, setGroupMessages] = useState([]);
 const sender_id = localStorage.getItem("checkid");
 const [receiver_id, setReceiverId] = useState();
 const [image, setImages] = useState(localStorage.getItem("checkimage"));
 const [Is_info,setIs_info]= useState();
 const [filelist,setfilelist]=useState();
 
 
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
  fetch(`http://localhost:3005/getwallpaper?sender_id=${sender_id}&receiver_id=${receiver_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        setchatwallpaper(data[0].char_window_wallpaper);
      } else {
        setchatwallpaper(""); 
      }
    })
    .catch((err) => {
      console.error("Error fetching private wallpaper:", err);
      setchatwallpaper(""); 
    });
}, [selectedUser]);


  useEffect(()=>{
   fetch(`http://localhost:3005/getgroupwallpaper?group_id=${group_ID}`,{
  method:"GET",
   headers: {
 "Content-Type": "application/json",
 },
 })
 .then((response) => response.json())
 .then((data) => {
  if(data.length >0){
    setgroupwallpaper(data[0].chat_window_wallpaper);
  }
  else{
    setgroupwallpaper("");
  }
 })

 },[selectedGroup])

// useEffect(() => {

// fetch(`http://localhost:3005/messages?sender_id=${sender_id}&receiver_id=${receiver_id}`, {
// method: "GET",
// headers: {
// "Content-Type": "application/json",
// },
// },)
// .then((response) => response.json())
// .then((data) => {
// if (Array.isArray(data)) {
// const sortedMessages = data.sort((a, b) => new Date(a.sent_at) - new Date(b.sent_at));
// setMessages(sortedMessages);
 
// } else {
// console.error("Unexpected data format:", data);
// setMessages([]);
// }
// })
// .catch((error) => console.error("Error fetching messages:", error));
 
// }, [messages]);

// useEffect(()=>{
// fetch(`http://localhost:3005/group-messages?group_id=${group_ID}`, {
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
  setIs_info(!Is_info);
  if(selectedGroup){
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
  fetch("http://localhost:3005/block-user",{
    method:"Post",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({sender_id,receiver_id})
  })
  .then((response)=>response.json())
  .then((data)=>{
    if(data.sucess){
      console.log("user is blocked")
    }
  })
 console.log("Block clicked");
 };

 const handleUnBlock = ()=>{
  console.log("unblocked-user")
  fetch("http://localhost:3005/unblock-user",{
    method:"Post",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({sender_id,receiver_id})
  })
  .then((response)=>response.json())
  .then((data)=>{
    if(data.sucess){
      console.log("user is unblocked")
    }
  })
 }

const handleChangeWallpaper = (event) => {
  console.log("event",event)
  const file = event.target.files[0];
  console.log("file--file",file);
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => { 
      fetch("http://localhost:3005/wallpaper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender_id: localStorage.getItem("checkid"),
          wallpaper: e.target.result,
          receiver_id:receiver_id

        }),
      })
      .then((res) => res.json())
      .then((data) => console.log("Wallpaper uploaded:", data));
    };
    reader.readAsDataURL(file); 
  }
};
const handleChangegroupWallpaper = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    console.log("reader=group==",reader);
    reader.onload = (e) => { 
      fetch("http://localhost:3005/groupwallpaper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          group_id: group_ID,
          wallpaper: e.target.result,
        }),
      })
      .then((res) => res.json())
      .then((data) => console.log("Wallpaper uploaded:", data));
    };
    reader.readAsDataURL(file); 
  }
};
const handleReport = () => {
 console.log("Report clicked");
 };
 
  const handleClear =(id)=>{
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
  // const handlefile =(file)=>{
   
  //   const files = file;
  //   console.log("files++files",files);
  //   const reader = new FileReader();
  //   console.log("reader==1",reader);
  //   console.log("receiver_id_fileupload",receiver_id);
  //   // reader.onload = (e)=>{
  //     console.log("its api working");
    
  //   fetch (`http://localhost:3005/file_upload?sender_id=${sender_id}&reciver_id=${receiver_id}&file=${file}`,{
      
  //     method:"post",
  //     headers:{
  //       "Content-Type":"application/json",
  //     },
  //       //    body: JSON.stringify({
  //       //   sender_id: sender_id,
  //       //   wallpaper: file,
  //       //   receiver_id:receiver_id

  //       // }),
  //   })
  //   .then((response)=>response.json())
  //   .then((data)=>console.log("data",data))
  // }y
const handlefile = (selectedFile) => {
  console.log("selectedFile-+-file",selectedFile)
  if (!selectedFile){ 
    console.log("its false selectedfiles",)
    return};

  const reader = new FileReader();
  

  reader.onloadend = () => {
    const base64String = reader.result; 

    console.log("Base64 Data:", base64String); 
    console.log("Receiver ID:", receiver_id);
    console.log("hhhhhhhh");

    fetch(`http://localhost:3005/file_upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender_id: sender_id,
        receiver_id: receiver_id,
        file: base64String, 
        
      }),
    })
      .then((response) => response.json())
      
      
      .then((data) => fetchfile())
      .catch((error) => console.error("Upload Error:", error));
  };


  reader.readAsDataURL(selectedFile);
};

 const fetchfile = ()=>{
  console.log("@#$");
  fetch(`http://localhost:3005/file-fetch?sender_id=${sender_id}&receiver_id=${receiver_id}`,{
    method:"GET",
    headers: {
      "Content-Type":"application/json",
    },
  })
  .then((response)=>response.json())
  .then((data)=> setfilelist(data)
   
  )

 }

  const handleremovewallpaper =()=>{
    fetch("http://localhost:3005/remove_wallpaper",{
      method:"DELETE",
      headers:{"Content-Type":"application/json"},
        body:JSON.stringify({sender_id,receiver_id})
           
    })
        
        .then((response)=>response.json())
        .then((data)=>{
          if(data.sucess){
            setchatwallpaper([]);

          }
          else{
            console.log("cant remove delete")
          }
        })
   
  }
  const handleremovegroupwallpaper = ()=>{
    fetch("http://localhost:3005/remove_groupwallpaper",{
      method:"DELETE",
      headers:{"Content-Type":"application/json"},
        body:JSON.stringify({group_ID})
           
    })
        
        .then((response)=>response.json())
        .then((data)=>{
          if(data.sucess){
            setgroupwallpaper([]);

          }
          else{
            console.log("cant remove delete")
          }
        })

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
    sender_id={sender_id}
    receiver_id={receiver_id}
    group_ID={group_ID}
    message={message}
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
 <li onClick={handleUnBlock}>UnBlock</li>
 <li onClick={() => document.getElementById("wallpaperInput").click()}> Wallpaper</li>
 <input type="file" id="wallpaperInput" style={{ display: 'none' }} accept="image/*" onChange={handleChangeWallpaper}/>
 <li onClick={handleremovewallpaper}>Remove Wallpaper</li>
 </>
 )}
 {selectedGroup && (
 <>
 <li onClick={handleCleargroupChat}>Clear All Group Chat</li>
 <li onClick={() => document.getElementById("wallpaperInput").click()}> Wallpaper</li>
 <input type="file" id="wallpaperInput" style={{ display: 'none' }} accept="image/*" onChange={handleChangegroupWallpaper}/>
 {/* <li onClick={handleExistGroup}>Exist</li> */}
  <li onClick={handleremovegroupwallpaper}>Remove Wallpaper</li>
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
 sender_id={sender_id}
 />
<div className="chat-messages"  style={{ backgroundImage: `url(${(selectedUser ?chatwallpaper:groupwallpaper)})`, backgroundSize: "1000px"}}>
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
 

 <input
  type="file"
  id="file"
  onChange={(e) => handlefile(e.target.files[0])}
/>
 <input type="text" id="message-input" accept=".pdf,.js" placeholder="Type a message..." value={message}  onChange={(e) => setMessage(e.target.value)} />
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








