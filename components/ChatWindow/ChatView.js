import React from 'react';
import './ChatView.css';

function ChatView({ messages }) {
  return (
    <div className="chat-window">
      <div className="message-list">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
          >
            <div className="message-content">{message.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatView;