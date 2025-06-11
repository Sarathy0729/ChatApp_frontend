import EmojiPicker from 'emoji-picker-react';
import React from 'react';
// import React, { useEffect, useState } from "react";
const EmojiPickerContainer = ({ onEmojiClick }) => (
  <div className="emoji-container">
        <EmojiPicker onEmojiClick={onEmojiClick} />
  </div>
);

export default EmojiPickerContainer;

// const emoji = ()=>{
//      const [showEmojiPicker, setShowEmojiPicker] = useState();
//      return{
        
//          <div className="emojiicon">
//          <>
//          {showEmojiPicker && <EmojiPicker onEmojiClick={onEmojiClick} />}
//          <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
//          </>
//          </div>
         
//      }
// }