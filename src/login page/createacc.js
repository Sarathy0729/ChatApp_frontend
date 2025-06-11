
import React, { useState } from 'react';
import './chat.css';

function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(localStorage.getItem('passvalue'));
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(''); 
  
  console.log("name",name); 
  console.log("email",email);
  console.log("password",password);
  console.log("confirmpassword",confirmPassword);
  console.log("images",image);

  const validateSignupForm = () => {
    let isValid = true;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      isValid = false;
      alert("Password does not meet the required criteria.");
    }

    if (password !== confirmPassword) {
      isValid = false;
      alert("Passwords do not match.");
    }

    if (isValid) {
      const payload = { name, email, password , image };
      console.log("payload",payload);

      fetch('http://localhost:3005/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then((data) => {
          alert(data);
            window.location.href = 'http://localhost:3000/';
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Error signing up: ' + error.message);
        });
    }

    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateSignupForm();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("file",file);
    const reader = new FileReader();
    console.log("reader",reader);

    reader.onloadend = () => {
      console.log("reader.result",reader.result);
      setImage(reader.result); 
    };

    if (file) {
      console.log("file1",file);
      reader.readAsDataURL(file); 
    }
  };

  return (
    <div className="container">
      <h3>Signup</h3>
      <form id="signupForm" onSubmit={handleSubmit}>
        <div className="fm">
          <label className="lb" htmlFor="images">Upload Profile Image</label>
          <input type="file" id="images"   name="images"  accept="image/*"   onChange={handleImageChange} />
        </div>
        <div className="fm">
          <label className="lb" htmlFor="name"> UserName</label>
          <input type="text" id="name"  name="name" placeholder="Enter name"  required   value={name}   onChange={(e) => setName(e.target.value)}  />
        </div>
        <div className="fm">
          <label className="lb" htmlFor="email"> Email</label>
          <input  type="email"  id="signupEmail"   name="email"   placeholder="Enter email"   disabled   value={email}  />
        </div>
        <div className="fm">
          <label className="lb" htmlFor="password"> Password</label>
          <input  type="password"  id="signupPassword"  name="password"   placeholder="Enter Password"   required   value={password}   onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="fm">
          <label className="lb" htmlFor="confirmPassword"> Confirm Password</label>
          <input  type="password"  id="confirmPassword"   name="confirmPassword"   placeholder="Confirm Password"    required  value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value)}  />
        </div>
        <div className="btn">
          <button type="submit" id="signup" className="button">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default CreateAccount;


       