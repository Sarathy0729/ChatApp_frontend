import React from 'react';

const Message = ({
    //  msg,
    //  isSender, 
    //  formatDate 
    }) => (
  <div className={`message ${isSender ? "sent" : "received"}`}>
    {/* <p>{msg.message_text || msg.text}</p>
    <span>{formatDate(msg.sent_at)}</span> */}
  </div>
);

export default Message;