import React from 'react';
import './ChatSelectorPane.css';

function ChatSelectorPane({ chats, selectedChat, handleNewChat, handleSelectChat }) {
  return (
    <div className="chat-selector-pane">
      <button onClick={handleNewChat} className="new-chat-button">New Chat</button>
      {chats.map((chat) => (
        <div
          key={chat.chatid}
          className={`chat-item ${selectedChat === chat.chatid ? 'selected' : ''}`}
          onClick={() => handleSelectChat(chat.chatid)}
        >
          {chat.ticker} - {chat.quarter}
        </div>
      ))}
    </div>
  );
}

export default ChatSelectorPane;
