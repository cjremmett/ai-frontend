import React, { useState, useRef, useEffect } from 'react';
import './ChatWindow2.css'; // Import the CSS file

function ChatWindow2() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! How can I help you today?' },
    { role: 'user', content: 'Hi there!' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { role: 'user', content: newMessage }]);
      setNewMessage('');
      // In a real application, you would send the user message to an API
      // and handle the assistant's response here.
      setTimeout(() => {
        setMessages([
          ...messages,
          { role: 'user', content: newMessage },
          { role: 'assistant', content: 'Thanks for your message!' },
        ]);
      }, 500); // Simulate assistant response
    }
  };

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <ul className="message-list">
        {messages.map((message, index) => (
          <li key={index} className={`message-item ${message.role}`}>
            {message.content}
          </li>
        ))}
        <div ref={messagesEndRef} />
      </ul>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="input-field"
        />
        <button onClick={handleSendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWindow2;