import React, { useState } from 'react';
import './chat.css';
// import {  Link } from "react-router-dom";

const ChangePassword = () => {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = () => {
    const payload = { email, newPassword };

    fetch('http://localhost:3005/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
        window.location.href = 'http://localhost:3000';
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className='login'>
    <div className="container">
      <div className="fm">
        <label className="lb" htmlFor="email">
          <i className="fa-solid fa-user"></i> Email
        </label>
        <input type="email" id="email" name="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <div className="fm">
        <label className="lb" htmlFor="oldPassword"> Old Password </label>
        <input type="password" id="oldPassword" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required/>
      </div>

      <div className="fm">
        <label className="lb" htmlFor="newPassword">New Password </label>
        <input type="password" id="newPassword"  placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
      </div>

      <div className="btn">
        <button type="button" className="button" id="changePassword" onClick={handleChangePassword}>Change Password</button>
      </div>
    </div>
    </div>
  );
};

export default ChangePassword;
