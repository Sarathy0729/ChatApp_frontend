import React, { useEffect, useState } from "react";


const Info = ({
    selectedGroup,
    selectedUser, 
    Is_info,
    group_members
 
}) => {
  const[add,setAdd]=useState()
  console.log(add);
    console.log("hsdlnvldkvnljkdf",selectedGroup);
    const handleAddMembers = ()=>{
      setAdd(!add)       
        
    }
    const handleRemoveMembers =(group)=>{
        console.log("remove.id",group);
        const group_id = selectedGroup.id;
        console.log("user_id",group_id);
        console.log("hello");
         fetch(`http://localhost:3005/remove_member`,{
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
             body: JSON.stringify({group_id , group }),  

        })
        .then((response) => response.json())
 .then((data) => {
 if (data.success) {
 console.log("Removed succefully");

 } else {
 console.log("Failed to Remove Members:", data.error);
 }
 })
 .catch((error) => console.log("Error clearing chat:", error));
        
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
