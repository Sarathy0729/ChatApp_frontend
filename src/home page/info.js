import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdAttachEmail } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";


const Info = ({
    selectedGroup,
    selectedUser, 
    Is_info,  
    group_members  
 
}) => {
  console.log("selectedgroup",selectedGroup);
  const[addUsers,setAddUsers]=useState();
  // console.log("conditioncheck",addUsers);
  const[addgroupMembers,setaddgroupMembers]=useState([]);
  //  console.log("addusers923292829482398",addgroupMembers);
  const[allUsers,setAllUsers]=useState();
  // console.log("allUsers",allUsers);
  const [groupMembersinfo,setgroupMembersinfo]=useState(group_members );
  console.log("groupMembers23232",groupMembersinfo);

  // console.log("Helloworld1234",groupMembersinfo);
  //   console.log("hsdlnvldkvnljkdf",selectedGroup);

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
              setAddUsers(false) 
              
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
    setgroupMembersinfo(null)
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
  <ul className="list">
  <li ><img src={selectedUser.images } alt="Profile-Pic" className="user-info-pro" />

  </li>
  <li className="user-info"> <span className="icon"> <CgProfile /> </span><strong>{selectedUser.Name}</strong></li>
  <li className="user-info"> <span className="icon"> <MdAttachEmail /> </span> {selectedUser.gmail}</li>
  <li className="user-info"> <span className="icon"> <IoIosCreate /> </span> {selectedUser.create_at}</li>
  
  </ul> 
}

{selectedGroup && groupMembersinfo && groupMembersinfo.length > 0 && (
      <div>
        <h4 className="GroupName">Group: {selectedGroup.group_name}</h4>
        <button onClick={()=>{handleAddMembers()}}><IoPersonAddOutline /></button>
        <ul className="list">
          {groupMembersinfo.map((group, index) => (
            <li key={index}>
              <img src={group.images || ""} alt=" Profile" width="40" height="40" />
              <span>{group.Name}</span> <span><button onClick={()=>{handleRemoveMembers(group.user_id)}}>Remove</button></span>
            </li>
          ))}
        </ul>
      </div>
    )}
    { addUsers && selectedGroup &&(
      <div>
        <ul className="">
        {allUsers.map((user,index)=>(
          <li key={index} className="chat-members"  >
            <label>
           
          <input type="checkbox" className="addusers" value={user.id}  onChange={(e) => {
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



