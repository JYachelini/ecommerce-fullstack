import { useContext } from 'react';
import { Context } from '../Context/Context';
import { IChat } from '../Interfaces/chat.interface';

function Messages({ messages }: { messages: IChat[] }) {
  const { user } = useContext(Context);

  return (
    <>
      {messages.map((message, index) => (
        <div key={index} className="chat-message">
          <p
            className={`chat-message_author ${
              user?._id === message.author.id ? 'owner' : ''
            }`}
          >
            {message.author.username}
          </p>
          <span className="chat-message_text">{message.message}</span>
        </div>
      ))}
    </>
  );
}

export default Messages;
