import React, { useState } from 'react';
import './chat.css';


function OTP() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const sendOtp = () => {
    fetch('http://localhost:3005/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.text())
      .then((data) => alert(data))
      .catch((error) => console.error('Error:', error));
  };

  const verifyOtp = () => {
    localStorage.setItem("passvalue", email);
    fetch('http://localhost:3005/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        throw new Error('Invalid OTP');
      })
      .then((data) => {
        alert(data);
        window.location.href = 'http://localhost:3000/createacc';
        
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className='login'>
    <div className="container">
      <h3>
        Verification
      </h3>
      <form id="otpForm" onSubmit={(e) => e.preventDefault()}>
        <div className="fm">
          <label className="lb" htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="fm">
          <label className="lb" htmlFor="otp">EnterOTP</label>
          <input type="text" id="otp" name="otp" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)}/>
        </div>
        <div className="btn">
          
          <button type="button" className="button" onClick={sendOtp}>Send OTP</button>
          <button type="button" className="button" onClick={verifyOtp}>Verify</button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default OTP;

