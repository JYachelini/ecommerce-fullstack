import { useContext } from 'react';
import { Context } from '../Context/Context';
import { IChat } from '../Interfaces/chat.interface';

function Messages({ messages }: { messages: IChat[] }) {
  const { user } = useContext(Context);

  return (
    <div className="chat-wrapper">
      {messages.length < 0 ? (
        <span>Escribí un mensaje para empezar la conversación.</span>
      ) : (
        messages.map((message, index) => (
          <div
            className={`chat-message-wrapper ${
              user?._id === message.author.id ? 'owner' : ''
            }`}
          >
            <div key={index} className="chat-message ">
              <p
                className="chat-message_author
                    "
              >
                {message.author.username}
              </p>
              <span className="chat-message_text">{message.message}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Messages;
