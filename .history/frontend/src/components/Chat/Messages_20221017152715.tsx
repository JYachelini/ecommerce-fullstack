import React from 'react';
import { IChat } from '../Interfaces/chat.interface';

function Messages({ messages }: { messages: IChat[] }) {
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <p>{message.author.username}</p>
          <span>{message.message}</span>
        </div>
      ))}
    </div>
  );
}

export default Messages;
