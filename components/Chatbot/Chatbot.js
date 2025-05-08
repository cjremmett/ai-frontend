import React, { useState, useEffect } from 'react';
import './Chatbot.css';
import ChatMessages from './ChatMessages';
import TickerAndQuarterSelector from './TickerAndQuarterSelector';
import InputArea from './InputArea';
import ChatSelelectorPane from './ChatSelectorPane'

function Chatbot() {
  const [messages, setMessages] = useState([]);
    // Should be in the following format:
    //   [
    //     [
    //         "user",
    //         "Some user question."
    //     ],
    //     [
    //         "assistant",
    //         "Some AI response."
    //     ]
    //   ]

  const [currentTicker, setCurrentTicker] = useState('');
  const [currentQuarter, setCurrentQuarter] = useState('');
  const [selectorsEnabled, setSelectorsEnabled] = useState(true);
  const [inputEnabled, setInputEnabled] = useState(true);
  const [userid, setUserid] = useState('dummy');

  const [chats, setChats] = useState([]);
    // Should be in the following format:
    //   [
    //     {
    //         "userid": "cjr-userid-example",
    //         "chatid": "cjr-chatid-example",
    //         "ticker": "AAPL",
    //         "year": 2025,
    //         "quarter": 1,
    //         "timestamp": 123
    //     },
    //     {
    //         "userid": "cjr-userid-example",
    //         "chatid": "cjr-chatid-example",
    //         "ticker": "AAPL",
    //         "year": 2025,
    //         "quarter": 1,
    //         "timestamp": 123
    //     }
    //   ]

  const [selectedChat, setSelectedChat] = useState('dummy');
  
  useEffect(() => {
    // Uses a dummy chat element to respresent the new chat window
    fetch('https://cjremmett.com/flask/ai-tools/get-chats?userid=' + userid)
      .then(response => response.json())
      .then(data => setChats([{
            "userid": userid,
            "chatid": 'newchat',
            "ticker": "",
            "year": null,
            "quarter": null,
            "timestamp": 0
        },...data]))
  }, []);
    
  useEffect(() => {
    if(selectedChat !== 'newchat')
    {
        fetch('https://cjremmett.com/flask/ai-tools/get-chat-messages?userid=' + userid + '&chatid=' + selectedChat)
        .then(response => response.json())
        .then(data => setMessages(data))
    }
    else
    {
        setMessages([
            [
                "assistant",
                "Please enter a stock ticker and select a quarter. You can ask the AI assistant questions about information contained in the earnings call transcript for the chosen company and quarter, even if the transcript was released subsequent to the AI's knowledge cutoff."
            ]
        ])
    }
  }, [selectedChat]);

  const handleSendMessage = (newMessage) => {
    if (newMessage.trim() && inputEnabled) {
      setInputEnabled(false); // Disable the button
      const userMessage = { role: 'user', content: newMessage };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      // Simulate sending and receiving
      setTimeout(() => {
        const aiResponse = { role: 'assistant', content: `AI response to: ${newMessage}` };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
        setInputEnabled(true); // Re-enable the button
      }, 500);
    }
  };

  const handleNewChat = () => {
    if (currentTicker && currentQuarter) {
      const newChatKey = `${currentTicker}-${currentQuarter}`;
      if (!chats.some(chat => chat.key === newChatKey)) {
        setChats([...chats, { key: newChatKey, ticker: currentTicker, quarter: currentQuarter }]);
      }
      setSelectedChat(newChatKey);
      setMessages([]);
    } else {
      alert('Please enter a stock ticker and select a year and quarter.');
    }
  };

  const handleSelectChat = (chatid) => {
    setSelectedChat(chatid);
  };

  return (
    <div className="chatbot-container">
      <div className="auth-info-pane">
        {/* Authentication and User Info will go here */}
      </div>
      <ChatSelelectorPane 
        chats={ chats } selectedChat={ selectedChat } 
        handleNewChat={ handleNewChat } handleSelectChat={ handleSelectChat }
      />
      <TickerAndQuarterSelector
        currentTicker={ currentTicker } setCurrentTicker={ setCurrentTicker } 
        currentQuarter={ currentQuarter } setCurrentQuarter={ setCurrentQuarter } 
        selectorsEnabled={ selectorsEnabled }
      />
      <div className="message-view-pane">
        <ChatMessages messages={ messages } />
        <InputArea inputEnabled={ inputEnabled } handleSendMessage={ handleSendMessage }/>
      </div>
    </div>
  );
}

export default Chatbot;