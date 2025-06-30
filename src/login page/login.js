import React, { useState } from 'react';
import axios from 'axios';
import './chat.css';
import { Link } from "react-router-dom";
import { IoLogoWechat } from "react-icons/io5";


function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("email", email);
    console.log("password", password);

    const payload = { email, password };
    console.log("payload", payload);

    axios.post("http://localhost:3005/login", payload, {
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        const data = response.data;
        if (data.message === "Login successful") {
          alert("Login successful!");
          console.log("loginname",data.name);

          localStorage.setItem("token", data.token);
          localStorage.setItem("checkname", data.name);
           localStorage.setItem("checkid", data.id);
            localStorage.setItem("checkimage", data.images);
            
        window.location.href = 'http://localhost:3000/chat';
        } else {
          alert("Login 5 failed: " + data.message);
          
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <div className='login'>
    <div className="container">
      <h3><span><IoLogoWechat /> </span>Chat App</h3>

      <form id="loginForm" onSubmit={handleSubmit}>
        <div className="fm">
          <label className="lb" htmlFor="email"> Email</label>
          <input type="email" id="email" name="email" placeholder="Enter email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="fm">
          <label className="lb" htmlFor="password"> Password</label>
          <input type="password" id="password" name="password" placeholder="Enter Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <p>Don't have an account?<Link to="/otp">Sign Up</Link></p>
        <div className="btn">
          <button type="submit" className="button">Login</button>
        </div>
       
        <Link to="/forgetpassword">Forgot Password</Link>
    
      </form>
    </div>
    </div>
  );
}

export default LoginForm;
