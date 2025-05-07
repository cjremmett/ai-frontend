import React, { useState } from 'react';
import './ChatInput.css';

function ChatInput({ onSendMessage }) {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent newline in textarea
      handleSendMessage();
    }
  };

  return (
    <div className="chat-input-container">
      <textarea
        className="chat-input-textarea"
        placeholder="Type your message..."
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        rows={1} // Start with one row, can grow with content
      />
      <button className="chat-input-button" onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
}

export default ChatInput;