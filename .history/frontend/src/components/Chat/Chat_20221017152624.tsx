import React, { useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { Context } from '../Context/Context';
import { Chat } from '../Interfaces/chat.interface';
import MessageInput from './MessageInput';
import Messages from './Messages';

function Chat() {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<Chat[]>([]);
  const { user } = useContext(Context);

  const send = (value: string) => {
    socket?.emit('message', {
      message: value,
      author: {
        id: user!._id,
        username: user!.username,
      },
    });
  };

  useEffect(() => {
    const newSocket = io('http://localhost:8001');
    setSocket(newSocket);
  }, [setSocket]);

  const messageListener = (message: Chat) => {
    setMessages([...messages, message]);
  };

  useEffect(() => {
    socket?.on('message', messageListener);
    return () => {
      socket?.off('message', messageListener);
    };
  }, [messageListener]);

  return (
    <div>
      <MessageInput send={send} />
      <Messages messages={messages} />
    </div>
  );
}

export default Chat;
