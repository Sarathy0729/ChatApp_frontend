
import React,{useState} from 'react';
import { MdGroups } from "react-icons/md";

const GroupCreationModal = ({
  groupName,
  setGroupName,
  groupMembers,
  chatList,
  setGroupMembers,
  sender_id,
  setIsCreatingGroup,
 
}) => {
  const [image, setImage] = useState(''); 
   const handleCreateGroup = () => {
 if (!groupName || groupMembers.length === 0) {
 alert("Please enter a group name and select members.");
 return;
 }
 
 const groupData = {
 groupName,
 groupMembers,
 createdBy: sender_id,
 image
 };
 
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
 alert("Group created successfully");
 
 setIsCreatingGroup(false);
 setGroupName("");
 setGroupMembers([]);
} else {
 console.error("Failed to create group:", data.error);
 }
 })
 .catch((error) => console.error("Error creating group:", error));
 };
 const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log("reader.result",reader.result);
      setImage(reader.result); 
    };

    if (file) {
      reader.readAsDataURL(file); 
    }
  };
  return(
  <div className="group-creation-modal">
    <h2>Create New Group</h2>
     
    <input type="text" placeholder="Enter group name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
     <input type="file" id="images"   name="images"  accept="image/*"   onChange={handleImageChange} />
      <ul className="user-selection-list">
      {chatList.map((user) => (
        
        <li key={user.id}>
          <label>
           
          <input type="checkbox"  value={user.id}  onChange={(e) => {
              const userId = e.target.value;
              if (e.target.checked) {
                setGroupMembers([...groupMembers, userId]);
               
              } else {
               
              }
              
            }}
          />
          <img src={user.images } className="gprofile" /> 
          {user.Name}
          </label>
        </li>
      ))}
    
    </ul>
    <button onClick={handleCreateGroup}>Create Group</button>
    <button onClick={() => setIsCreatingGroup(false)}>Cancel</button>
  </div>
  )
};

export default GroupCreationModal;