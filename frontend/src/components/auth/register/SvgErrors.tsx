import { useState } from 'react';

interface errors {
  error: string;
}

function SvgErrors(props: errors) {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <div className="error">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => {
          setModal(true);
        }}
        onMouseLeave={() => {
          setModal(false);
        }}
      >
        <path d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
      </svg>
      {modal ? <span>{props.error}</span> : null}
    </div>
  );
}

export default SvgErrors;
