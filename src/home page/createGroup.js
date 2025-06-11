
import React from 'react';

const GroupCreationModal = ({
  groupName,
  setGroupName,
  groupMembers,
  chatList,
  setGroupMembers,
  onSubmit,
}) => (
  <div className="group-creation-modal">
    <h2>Create New Group</h2>
    <input type="text" placeholder="Enter group name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
    <div>
      {chatList.map((user) => (
        <label key={user.id}>
           
          <input type="checkbox"  value={user.id}  onChange={(e) => {
              const userId = e.target.value;
              if (e.target.checked) {
               
              } else {
               
              }
              setGroupMembers(updated);
            }}
          />
          {user.name}
        </label>
      ))}
    </div>
    <button onClick={onSubmit}>Create Group</button>
  </div>
);

export default GroupCreationModal;