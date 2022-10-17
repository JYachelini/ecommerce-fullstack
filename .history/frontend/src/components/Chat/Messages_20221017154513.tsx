import React from 'react';
import { IChat } from '../Interfaces/chat.interface';

function Messages({ messages }: { messages: IChat[] }) {
  return (
    <>
      {messages.map((message, index) => (
        <div key={index} className="chat-message">
          <p className="chat-message_author">{message.author.username}</p>
          <span className="chat-message_text">{message.message}</span>
        </div>
      ))}
    </>
  );
}

export default Messages;
