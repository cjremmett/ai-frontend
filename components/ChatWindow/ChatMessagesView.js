
import './ChatMessagesView.css';

export default function ChatWindow({ messages }) {
  
  return (
    <>
      <div className = "MessagesView">
        { messages.map((message) => (
          <div key={ message.key } className={message.isSystemMessage ? "SystemMessage" : "UserMessage"}>{ message.content }</div>
        ))}
      </div>
    </>
  );
}
