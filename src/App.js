

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
         
          
        
      </Routes>
    </BrowserRouter>
      {/* <div className="text-red-400">Hello world</div> */}
      
        
      
    </div>
  );
}

export default App;
