import React, { useEffect, useState } from "react";


const Info = ({
    selectedGroup,
    selectedUser, 
    Is_info,
    group_members
 
}) => {
    console.log("hsdlnvldkvnljkdf",selectedGroup);
    const handleAddMembers = ()=>{
       
        
    }
    const handleRemoveMembers =(group)=>{
        console.log("remove.id",group);
        console.log("hello");
         fetch(`http://localhost:3005/remove_members?group_id=${selectedGroup.id}&member_id=${group}`,{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            }      
        })
        .then((response) => response.json())
 .then((data) => {
 if (data.success) {
 console.log("Chat cleared successfully");
 } else {
 console.error("Failed to clear chat:", data.error);
 }
 })
 .catch((error) => console.error("Error clearing chat:", error));
        
    }
    
  return (
  <div>
    {Is_info && <div className = "member-info">
 {selectedUser &&
  <ul>
  <li><img src={selectedUser.images} alt="Profile-Pic"/></li>
  <li>Name      : {selectedUser.Name}</li>
  <li>Email     : {selectedUser.gmail}</li>
  <li>Create_at : {selectedUser.create_at}</li>
  </ul> 
}

{selectedGroup && group_members && group_members.length > 0 && (
      <div>
        <h4>Group: {selectedGroup.group_name}</h4>
        <h3><button onClick={handleAddMembers}>+Add</button></h3>
        <ul>
          {group_members.map((group, index) => (
            <li key={index}>
              <img src={group.images || ""} alt="Member Profile" width="40" height="40" />
              <span>{group.Name}</span> <span><button onClick={()=>{handleRemoveMembers(group.user_id)}}>Remove</button></span>
            </li>
          ))}
        </ul>
      </div>
    )}
     
 </div>
 }
  </div>

  );
};

export default Info;
