
'use client';

import './ChatWindow.css';
import ChatMessagesView from './ChatMessagesView';

import React, { useState, useEffect } from 'react';
import ChatInputBox from './ChatInputBox';
import io from 'socket.io-client'; // Import the socket.io client library

// Establish a socket connection to the server at the specified URL
const URL = 'https://cjremmett.com';
const socket = io.connect(URL, {path: "/flask/socket.io"});


export default function ChatWindow() {
  const [userId, setUserId] = useState('');
  const [messagesToDisplay, setMessagesToDisplay] = useState([]);
  const [userInputButtonIsDisabled, setUserInputButtonIsDisabled] = useState(false);

  useEffect(() => {
    async function populateUserId() {
      const response = await fetch('https://cjremmett.com/flask/ai-tools/get-new-userid');
      const responseJson = await response.json();
      setUserId(responseJson.userid);
    }
    
    if(userId === '')
    {
      populateUserId();
    }

    // Listen for incoming messages via WebSocket
    socket.on('server_message', (data) => {
      try {
        console.log('Incoming socket.io message: ' + String(data));
        console.log(messagesToDisplay);
        const message = JSON.parse(data); // Parse the JSON message
        setMessagesToDisplay((prevMessages) => [
          ...prevMessages,
          { key: prevMessages.length, content: message.message, isSystemMessage: message.isSystemMessage },
        ]);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });

    // Cleanup the WebSocket listener on component unmount
    return () => {
      socket.off('server_message');
    };
  }, [socket, messagesToDisplay])

  async function handleSubmit(event) {
    //messagesSnapshot.push({key: messagesSnapshot.length, content: userInput.value, isSystemMessage: false });
    event.preventDefault();
    setUserInputButtonIsDisabled(true);

    const form = event.target;
    const userInput = form.elements.namedItem("userInput");
    
    socket.timeout(5000).emit('user_message', {'userid': userId, 'message': userInput.value}, () => {
      userInput.value = '';
      setUserInputButtonIsDisabled(false);
    });

    console.log('Sent websocket message.');
  }

  return (
    <>
      <div className="TestText">{ userId }</div>
      <ChatMessagesView messages={ messagesToDisplay } />
      <ChatInputBox handleSubmit={ handleSubmit } userInputButtonIsDisabled={ userInputButtonIsDisabled }/>
    </>
  );
}
