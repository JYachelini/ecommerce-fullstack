import React, { useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { Context } from '../Context/Context';
import { IChat } from '../Interfaces/chat.interface';
import MessageInput from './MessageInput';
import Messages from './Messages';

function Chat() {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<IChat[]>([]);
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

  const messageListener = (message: IChat) => {
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
      <Messages messages={messages} />
      <MessageInput send={send} />
    </div>
  );
}

export default Chat;
