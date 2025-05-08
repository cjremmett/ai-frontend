import React from 'react';
import './InputArea.css';

function InputArea({ inputEnabled, handleSendMessage })
{
  return (
    <div className="input-area">
        <input
        type="text"
        placeholder="Type your message..."
        onKeyDown={(e) => {
            if (e.key === 'Enter' && inputEnabled) {
            handleSendMessage(e.target.value);
            e.target.value = '';
            }
        }}
        />
        <button
        onClick={() => {
            const input = document.querySelector('.input-area input');
            handleSendMessage(input.value);
            input.value = '';
        }}
        disabled={!inputEnabled}
        className={!inputEnabled ? 'send-button-disabled' : ''}
        >
        {!inputEnabled ? 'Sending...' : 'Send'}
        </button>
    </div>
  );
}

export default InputArea;