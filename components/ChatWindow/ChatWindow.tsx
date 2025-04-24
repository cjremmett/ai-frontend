
'use client';

import './ChatWindow.css';
import ChatMessagesView from './ChatMessagesView';

import React, { useState } from 'react';


export interface MessageToDisplay {
  key: number;
  isUserMessage: boolean;
  isSystemMessage: boolean
  content: string;
}

export default function ChatWindow() {
  const [messagesToDisplay, setMessagesToDisplay] = useState([] as MessageToDisplay[]);

  function handleButtonClick() {
    setMessagesToDisplay([
      { key: 0, isUserMessage: true, isSystemMessage: false, content: "Hello, how are you?" },
      { key: 1, isUserMessage: false, isSystemMessage: true, content: "I'm fine, thank you!" },
      { key: 2, isUserMessage: true, isSystemMessage: false, content: "What can you do?" },
      { key: 3, isUserMessage: false, isSystemMessage: true, content: "I can help you with your questions." }
    ]);
  }

  return (
    <>
      <ChatMessagesView messages={ messagesToDisplay } />
      <button onClick={ handleButtonClick}>Add some messages</button>
    </>
  );
}
