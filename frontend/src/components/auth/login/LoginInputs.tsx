import React from 'react';

interface Props {
  name: string;
  placeholder: string;
  type: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function LoginInputs(props: Props) {
  const { handleChange, ...inputProps } = props;
  return (
    <span>
      <input {...inputProps} onChange={handleChange} />
    </span>
  );
}

export default LoginInputs;
