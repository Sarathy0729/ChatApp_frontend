import React from 'react';
const chatWindow =({
    
})=>{
    return(
         <div className="chat-window">
         {(selectedUser || selectedGroup) && (
         <>
         <div className="chat-header">
         <img src={selectedUser ? selectedUser.images : ''} alt="profile" className="profile" id="chat-header-image" />
         <h2 id="chat-header-name">{selectedUser ? selectedUser.name : selectedGroup.group_name}</h2>
         <button className="options-button" onClick={toggleOptionsMenu}>⋮</button>
         {showOptionsMenu && (
         <ul className="options-menu">
         {selectedUser && (
         <>
         <li onClick={handleClearChat}>Clear Chat</li>
         <li onClick={handleBlockUser}>Block</li>
         
         <li onClick={() => document.getElementById("wallpaperInput").click()}> Wallpaper</li>
         <input type="file" id="wallpaperInput" style={{ display: 'none' }} accept="image/*" onChange={handleChangeWallpaper}/>
         <li onClick={handleReport}>Report</li>
         </>
         
         )}
         {selectedGroup && (
         <>
         <li onClick={handleClearChat}>Clear Group Chat</li>
         <li onClick={() => document.getElementById("wallpaperInput").click()}> Wallpaper</li>
         <input type="file" id="wallpaperInput" style={{ display: 'none' }} accept="image/*" onChange={handleChangeWallpaper}/>
         <li onClick={handleReport}>Report</li>
         </>
         )}
         </ul>
         )}
         </div>
         <div className="chat-messages" id="chat-messages" style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover' }}>
         {(selectedUser ? messages : groupMessages).map((msg, index) => (
         <div key={index} className={`message ${msg.sender_id === sender_id ? 'message-sent' : 'message-received'}`}>
          {groupMessages && <span id="msg-name">{msg.Name}</span>}<p>{msg.message_text}</p>
         <span className="message-time">{formatDate(msg.sent_at)}</span>
         {/* {msg.sender_id === sender_id && (
         <span className="message-status">
         {msg.is_read ? '✔✔' : '✔'}
         </span>
         )} */}
         </div>
         ))}
         </div>
         </>
         )}
         <div className="chat-input">
         <label htmlFor="file" className="emoji">
         <img src={""} alt="file" id="icon"/>
         </label>
         <input type="file" id="file" onChange={(e) => {}} />
         <input type="text" id="message-input" placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} />
         <button id="send-button" onClick={sendMessage}>Send</button>
         <div className="emojiicon">
         {showEmojiPicker && <EmojiPicker onEmojiClick={onEmojiClick} />}
         {/* {showEmojiPicker && <EmojiPickerContainer onEmojiClick={handleEmojiClick} />} */}
          <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button> 
         </div>
         
         </div>
         
        
        </div>
    )
}