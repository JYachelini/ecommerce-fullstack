import React, { useState } from 'react';

function MessageInput({ send }: { send: (value: string) => void }) {
  const [value, setValue] = useState('');

  return (
    <>
      <input
        type="text"
        placeholder="Escribe un mensaje aqui"
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => send(value)}>Enviar</button>
    </>
  );
}

export default MessageInput;
