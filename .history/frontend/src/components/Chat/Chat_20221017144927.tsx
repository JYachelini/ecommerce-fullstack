import React, { useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { Context } from '../Context/Context';
import MessageInput from './MessageInput';
import Messages from './Messages';

function Chat() {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);
  const { user } = useContext(Context);

  const send = (value: string) => {
    socket?.emit('message', value);
  };

  useEffect(() => {
    const newSocket = io('http://localhost:8001');
    setSocket(newSocket);
  }, [setSocket]);

  const messageListener = (message: string) => {
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
