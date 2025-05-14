import React from 'react';
import './ChatSelectorPane.css';
import classNames from 'classnames';

function ChatSelectorPane({ chats, selectedChat, handleSelectChat }) {
  for(const chat of chats)
  {
    console.log(chat);
  }

  function getChatPaneClasses(chat)
  {
    let classes = 'chat-item';
    // if(chat.id === 'newchat')
    // {
    //   classes += ' new-chat-item';
    // }
    // if(selectedChat === chat.id)
    // {
    //   //classes += ' selected';
    // }
    return classes;
  }

   return (
    <div className="chat-selector-pane">
      {chats.map((chat) => (
        <div
          key={chat.chatid}
          //className={`chat-item ${selectedChat === chat.chatid ? 'selected' : ''}`}
          className={ getChatPaneClasses(chat) }
          onClick={() => handleSelectChat(chat.chatid)}
        >
          {`${chat.id !== 'newchat' ? chat.ticker + ' - ' + chat.quarter : 'New Chat'}`}
        </div>
      ))}
    </div>
  );
}

export default ChatSelectorPane;
