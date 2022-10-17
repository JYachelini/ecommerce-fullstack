import { useContext } from 'react';
import { Context } from '../Context/Context';
import { IChat } from '../Interfaces/chat.interface';

function Messages({ messages }: { messages: IChat[] }) {
  const { user } = useContext(Context);

  return (
    <div className="chat-wrapper">
      {messages.map((message, index) => (
        <div className="chat-message-wrapper">
          <div
            key={index}
            className={`chat-message ${
              user?._id === message.author.id ? 'owner' : ''
            }`}
          >
            <p
              className="chat-message_author
            "
            >
              {message.author.username}
            </p>
            <span className="chat-message_text">{message.message}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Messages;