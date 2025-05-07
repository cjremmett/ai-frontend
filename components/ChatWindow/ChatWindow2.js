'use client';

import React, { useState, useRef, useEffect } from 'react';
import './ChatWindow2.css';
import io from 'socket.io-client';

// Establish a socket connection to the server at the specified URL
const URL = 'https://cjremmett.com';
const socket = io.connect(URL, {path: "/flask/socket.io"});

function ChatWindow2() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userInputButtonIsEnabled, setUserInputButtonIsEnabled] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();

    // Listen for incoming messages via WebSocket
    socket.on('earnings_call_inquiry', (data) => {
      try {
        console.log('Incoming socket.io message: ' + String(data));
        console.log(messages);
        const message = JSON.parse(data);
        setMessages((prevMessages) => [
          ...prevMessages,
          { key: prevMessages.length, content: message.message, role: message.role },
        ]);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });

    // Cleanup the WebSocket listener on component unmount
    return () => {
      socket.off('earnings_call_inquiry');
    };
  }, [socket, messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      let messageContent = newMessage.trim();
      setNewMessage('');
      setUserInputButtonIsEnabled(false);
      
      socket.timeout(5000).emit('earnings_call_inquiry', {
        'userid': 'dummy2',
        'chatid': 'dummy2', 
        'message': {
          'ticker': 'AMZN',
          'year': 2025,
          'quarter': 1,
          'content': messageContent
        }
      }, () => {
        setUserInputButtonIsEnabled(true);
        console.log('Sent websocket message.');
      });
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
        <button onClick={handleSendMessage} className="send-button" disabled={ !userInputButtonIsEnabled }>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWindow2;