
import './ChatMessagesView.css';
import classNames from 'classnames';
import { MessageToDisplay } from './ChatWindow';

export default function ChatWindow({ messages }: { messages: MessageToDisplay[] }) {
  const messagesList = messages.map( (message) => 
    <div key={ message.key } className={message.isSystemMessage ? "SystemMessage" : "UserMessage"}>{ message.content }</div>
  );

  return (
    <>
      <div className = "MessagesView">
        { messagesList }
      </div>
    </>
  );
}
