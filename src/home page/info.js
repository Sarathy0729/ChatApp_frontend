import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdAttachEmail } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";

const Info = ({
  selectedGroup,
  selectedUser,
  Is_info,
  group_members,
  grouppic,
 
}) => {
  const [image, setImage] = useState('');
  console.log("grouppic",grouppic);
  const [groupImage, setGroupImage] = useState('');
  const [edit, setEdit] = useState(false);
  const [groupEdit, setGroupEdit] = useState(false);
  const [name, setName] = useState('');
  const [groupName, setGroupName] = useState('');
  const [addUsers, setAddUsers] = useState(false);
  const [addGroupMembers, setAddGroupMembers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [groupMembersInfo, setGroupMembersInfo] = useState(group_members);
  console.log("groupMembersInfo; check admin",groupMembersInfo);
  // const is_admin = groupMembersInfo.is_admin;
  // console.log("is_admin",is_admin);
  

   useEffect(() => {
    setGroupMembersInfo(group_members);
    fetch("http://localhost:3005/user-profile")
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, [group_members]);

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'user') setImage(reader.result);
      else if (type === 'group') setGroupImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const saveUserProfile = () => {
    const payload = {
      id: selectedUser.id,
      name,
      image
    };
    setEdit(false);
    fetch("http://localhost:3005/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) console.log("User profile updated.");
        console.log("error");
      });
  };

  const saveGroupProfile = () => {
    const payload = {
      id: selectedGroup.id,
      group_name: groupName,
      group_image: groupImage
    };
    console.log("Grouppayload",payload);
    setGroupEdit(false);
    fetch("http://localhost:3005/updateGroup", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) console.log("Group profile updated.");
      });
  };

  const handleAddMembers = () => {
    setAddUsers(!addUsers)
    
  }

  const addMembers = () => {
    const payload = {
      id: selectedGroup.id,
      groupname: selectedGroup.group_name,
      addgroupMembers: addGroupMembers
    };

    fetch("http://localhost:3005/addMembers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAddGroupMembers([]);
          setAddUsers(false);
          console.log("Members added successfully");
        }
      });
  };

  const handleRemoveMember = (userId) => {
    fetch("http://localhost:3005/remove_member", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ group_id: selectedGroup.id, group: userId })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setGroupMembersInfo(prev =>
            prev.filter((member) => member.user_id !== userId)
          );
        }
      });
  };

  return (
    <div className={`info-panel ${Is_info ? "slide-in" : "slide-out"}`}>
      {Is_info && (
        <div className="member-info">

          {selectedUser && (
            <ul className="list">
              <li>
                <img src={selectedUser.images || " "}  alt="Profile" className="user-info-pro"  />
              </li>
              
              <li className="user-info">
                <span className="icon"><CgProfile size={20} /></span>
                <strong>{selectedUser.Name}</strong>
              </li>
            
              <li className="user-info">
                <span className="icon"><MdAttachEmail /></span>
                {selectedUser.gmail}
              </li>
              <br />
              <li className="user-info">
                <span className="icon">Created:</span>
                {selectedUser.create_at}
              </li>
              <br />
              <button className="update" onClick={() => setEdit(!edit)}>
                Update Profile
              </button>

              {edit &&  (
                <div className="Edit-profile">
                   <label htmlFor="name">Update Name : </label>
                  <input type="text" placeholder="Update your Name" value={name} onChange={(e) => setName(e.target.value)}  />
                  <label htmlFor="file">upload Images :</label>
                  <input  type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'user')}/>
                  <button className="save" onClick={saveUserProfile}>Save</button>
                </div>
              )}
            </ul>
          )}


          {selectedGroup && groupMembersInfo?.length > 0 && (
            <div>
              <div className="group-header">
                 <img src={grouppic || " "} alt="Group" className="group-pic" width="80" />
                <h4 className="GroupName">{selectedGroup.group_name}</h4>
                 
              
              </div>

              <ul className="chat-list">
                {groupMembersInfo.map((member, index) => (
                  <li key={index} className="chat-members">
               <img src={member.images || " "}  alt="Profile" className="profile" width="40" height="40" />
                 <div className="chat-info"> <h2>{member.Name} </h2></div>
                    {/* <button onClick={() => handleRemoveMember(member.user_id)}>
                      Remove
                    </button> */}
          <div id="trash">        
<button className="button-remove" onClick={() => handleRemoveMember(member.user_id)}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 69 14"
    class="svgIcon bin-top"
  >
    <g clip-path="url(#clip0_35_24)">
      <path
        fill="black"
        d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_35_24">
        <rect fill="white" height="14" width="69"></rect>
      </clipPath>
    </defs>
  </svg>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 69 57"
    class="svgIcon bin-bottom"
  >
    <g clip-path="url(#clip0_35_22)">
      <path
        fill="black"
        d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_35_22">
        <rect fill="white" height="57" width="69"></rect>
      </clipPath>
    </defs>
  </svg>
</button>
</div> 
                  </li>
                ))}
                 <button className="update" onClick={() => setGroupEdit(!groupEdit)}>
                  Update Group
                </button>
                  <button  className="add-btn" onClick={handleAddMembers}>
                  <IoPersonAddOutline size={20} />
                </button>
            

              {groupEdit && (
                <div className="Edit-profile">
                  <label htmlFor="name">Update GroupName :</label>
                  <input
                    type="text"
                    placeholder="Update Group Name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                   <label htmlFor="file">Update GroupImage :</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'group')}
                  />
                  <button className="save" onClick={saveGroupProfile}>Save</button>
                </div>
              )}
              </ul>
            </div>
          )}
          

          {addUsers && (
            <div>
              <ul className="Add_Users">
                {allUsers.map((user, index) => {
                  const alreadyInGroup = groupMembersInfo.some(
                    (member) => member.user_id === user.id
                  );

                  return !alreadyInGroup ? (
                    <li key={index} className="chat-members-add">
                      <label>
                        <input type="checkbox" className="addusers" value={user.id}  
                          onChange={(e) => {
                            const userId = e.target.value;
                            if (e.target.checked) {
                              console.log("true");
                              setAddGroupMembers([...addGroupMembers, userId]);
                              
                            } else {
                              console.log("false");
                            }
                          }}
                        />
                        <img src={user.images || ""} className="gprofile" />
                        {user.Name}
                      </label>
                    </li>
                  ) : null;
                })}
              </ul>
              <button onClick={addMembers}>+Add</button>
            </div>
          )}
        </div>

      )}
    </div>
  );
};

export default Info;
