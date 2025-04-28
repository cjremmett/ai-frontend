
'use client';

import './ChatWindow.css';
import ChatMessagesView from './ChatMessagesView';

import React, { useState } from 'react';
import ChatInputBox from './ChatInputBox';


export default function ChatWindow() {
  const [messagesToDisplay, setMessagesToDisplay] = useState([]);
  const [userInputButtonIsDisabled, setUserInputButtonIsDisabled] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setUserInputButtonIsDisabled(true);
    let messagesSnapshot = messagesToDisplay;

    const form = event.target;
    const userInput = form.elements.namedItem("userInput");
    
    messagesSnapshot.push({key: messagesSnapshot.length, content: userInput.value, isSystemMessage: false });
    setMessagesToDisplay(messagesSnapshot);
    userInput.value = '';

    const url = 'https://cjremmett.com/flask/ai-tools/get-dummy-message';
    const response = await fetch(url);
    if(response.ok) {
      const body = await response.json();
      messagesSnapshot.push({ key: messagesSnapshot.length, content: body.message, isSystemMessage: true })
      setMessagesToDisplay(messagesSnapshot);
    }
    else {
      console.error('Error fetching data:', response.statusText);
    }

    setUserInputButtonIsDisabled(false);
  }

  return (
    <>
      <ChatMessagesView messages={ messagesToDisplay } />
      <ChatInputBox handleSubmit={ handleSubmit } userInputButtonIsDisabled={ userInputButtonIsDisabled }/>
    </>
  );
}
