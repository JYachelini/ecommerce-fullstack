import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

function Chat() {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>();

  const send = (value: string) => {
    socket?.emit('message', value);
  };

  useEffect(() => {
    const newSocket = io('http://localhost:8001');
  }, []);

  return <div>Chat</div>;
}

export default Chat;
