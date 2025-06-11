

import ChatApp from './home page/chat';
// import ChatWindow from './home page/chat';
import CreateAccount from './login page/createacc';
import ChangePassword from './login page/forgetpassword';
import LoginForm from './login page/login';
import OTP from './login page/otp';
// import img from './images';


// import Group from './home page/group';


import { BrowserRouter, Routes, Route } from "react-router-dom";




function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />}/>
         
          <Route path="/otp" element={<OTP />} />
          <Route path="/createacc" element={<CreateAccount />} />
          <Route path="/forgetpassword" element={<ChangePassword />} />
          <Route path="/chat" element={<ChatApp />} />
           {/* <Route path="/img" element={<img.jpg />} />  */}
          {/* <Route path="/group" element={<Group />} /> */}
          

           {/* <Route path="/chat" element={<ChatWindow/>} /> */}
          
        
      </Routes>
    </BrowserRouter>
      
        
      
    </div>
  );
}

export default App;
