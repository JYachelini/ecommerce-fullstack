import React, { useState } from 'react';

function MessageInput({ send }: { send: () => void }) {
  const [value, setValue] = useState('');
  return (
    <>
      <input type="text" placeholder="Escribe un mensaje aqui" />
      <button onClick={() => send(value)}></button>
    </>
  );
}

export default MessageInput;
