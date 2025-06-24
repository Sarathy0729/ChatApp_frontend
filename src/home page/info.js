import React, { useEffect, useState } from "react";


const Info = ({
    selectedGroup,
    selectedUser, 
    Is_info,  
    group_members  
 
}) => {
  console.log("selectedgroup",selectedGroup);
  const[addUsers,setAddUsers]=useState();
  const[addgroupMembers,setaddgroupMembers]=useState([]);
   console.log("addusers923292829482398",addgroupMembers);
  const[allUsers,setAllUsers]=useState();
  console.log("allUsers",allUsers);
  const [groupMembersinfo,setgroupMembersinfo]=useState(group_members );

  console.log("Helloworld",groupMembersinfo);
    console.log("hsdlnvldkvnljkdf",selectedGroup);

      useEffect(() => {
    setgroupMembersinfo(group_members );
     fetch("http://localhost:3005/user-profile")
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, [group_members]);



    const handleAddMembers = ()=>{
      setAddUsers(!addUsers) 
      console.log("Add Members"); 
      
    }
    const addMembers =()=>{
      const groupname = selectedGroup.group_name;
      const id = selectedGroup.id;
     const groupdata ={id,addgroupMembers,groupname}
     console.log("groupdata",groupdata);
      fetch("http://localhost:3005/addMembers",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(groupdata),
      })     
        .then((response)=> response.json())
        .then((data)=>{
          if(data.success){
              
            console.log("add member successfully");
          }
          else{
            console.log("error");
          }
        })

    }
    const handleRemoveMembers =(group)=>{
        console.log("remove.id",group);
        const group_id = selectedGroup.id;
        // console.log("user_id",group_id);
        
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
    setgroupMembersinfo(data)
 console.log("Removed succefully");
 console.log("helloconsole");

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

{selectedGroup && groupMembersinfo && groupMembersinfo.length > 0 && (
      <div>
        <h4>Group: {selectedGroup.group_name}</h4>
        <h3><button onClick={()=>{handleAddMembers()}}>+Add</button></h3>
        <ul>
          {groupMembersinfo.map((group, index) => (
            <li key={index}>
              <img src={group.images || ""} alt="Member Profile" width="40" height="40" />
              <span>{group.Name}</span> <span><button onClick={()=>{handleRemoveMembers(group.user_id)}}>Remove</button></span>
            </li>
          ))}
        </ul>
      </div>
    )}
    {selectedGroup && addUsers &&(
      <div>
        <ul>
        {allUsers.map((user,index)=>(
          <li key={index}   >
            <label>
           
          <input type="checkbox"  value={user.id}  onChange={(e) => {
              const userId = e.target.value;
              if (e.target.checked) {

                 setaddgroupMembers([...addgroupMembers, userId]);
               
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
        <button onClick={addMembers}>Submit</button>
      </div>
    )}
     
 </div>
 }
  </div>

  );
};

export default Info;



