import React, { useState } from 'react';
import io, { Socket } from 'socket.io-client';

function Chat() {
  const [socket, setSocket] = useState<Socket>();

  return <div>Chat</div>;
}

export default Chat;
