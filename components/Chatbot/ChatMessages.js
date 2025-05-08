
import React from 'react';
import './ChatMessages.css';

function ChatMessages({ messages }) {
  return (
    <div className="chat-container">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message ${message[0] === 'user' ? 'user-message' : 'assistant-message'}`}
        >
          <p className="message-content">{message[1]}</p>
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;