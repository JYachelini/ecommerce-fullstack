import { useState } from 'react';

function MessageInput({ send }: { send: (value: string) => void }) {
  const [value, setValue] = useState('');

  return (
    <div className="chat-send">
      <input
        type="text"
        placeholder="Escribe un mensaje aqui"
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={() => send(value)}>Enviar</button>
    </div>
  );
}

export default MessageInput;
