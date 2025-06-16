import React, { useState } from 'react';
import axios from 'axios';
import './chat.css';
import { Link } from "react-router-dom";

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
    <div className="container">
      <h3> Chat App</h3>

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
  );
}

export default LoginForm;
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './chat.css';

// function LoginForm() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     const { email, password } = formData;

//     // Optional basic validation
//     if (!email || !password) {
//       alert("Both email and password are required.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL || 'http://localhost:3005'}/login`,
//         { email, password },
//         {
//           headers: { 'Content-Type': 'application/json' }
//         }
//       );

//       const data = response.data;

//       if (data.message === "Login successful") {
//         // Save user info to localStorage
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("checkname", data.name);
//         localStorage.setItem("checkid", data.id);
//         localStorage.setItem("checkimage", data.images);

//         alert("Login successful!");
//         navigate("/chat");
//       } else {
//         alert("Login failed: " + data.message);
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("An error occurred during login. Please try again.");
//     }
//   };

//   return (
//     <div className="container">
//       <h3>Chat App</h3>
//       <form onSubmit={handleLogin} id="loginForm">
//         <div className="fm">
//           <label htmlFor="email" className="lb">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             placeholder="Enter email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="fm">
//           <label htmlFor="password" className="lb">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             placeholder="Enter password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="links">
//           <p>Don't have an account? <Link to="/otp">Sign Up</Link></p>
//           <Link to="/forgetpassword">Forgot Password?</Link>
//         </div>

//         <div className="btn">
//           <button type="submit" className="button">Login</button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default LoginForm;

