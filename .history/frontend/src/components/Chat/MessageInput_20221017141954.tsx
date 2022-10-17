import React, { useState } from 'react';

function MessageInput() {
  const [value, setValue] = useState('');
  return (
    <>
      <input type="text" placeholder="Escribe un mensaje aqui" />
    </>
  );
}

export default MessageInput;
