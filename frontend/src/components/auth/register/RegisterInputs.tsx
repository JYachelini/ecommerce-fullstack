import React, { useState } from 'react';
import SvgErrors from './SvgErrors';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';

interface PropsRegisterInputs {
  type: string;
  name: string;
  placeholder: string;
  value: string | undefined;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
  required: boolean;
  setPhone?: any;
}

function RegisterInputs(props: PropsRegisterInputs) {
  const { handleChange, setPhone, errorMessage, ...inputProps } = props;
  const [focused, setFocused] = useState<boolean>(false);

  const handleFocus = () => {
    setFocused(true);
  };

  if (inputProps.name === 'phone') {
    return (
      <span className="register_form-input_wrapper">
        <PhoneInput
          defaultCountry="AR"
          placeholder={inputProps.placeholder}
          name={inputProps.name}
          type={inputProps.type}
          required={inputProps.required}
          value={inputProps.value}
          onChange={setPhone}
          onBlur={handleFocus}
          data-focused={focused}
        />
        {focused ? (
          <div
            className={`${
              inputProps.value
                ? `${isValidPhoneNumber(inputProps.value) ? '' : 'errorPhone'}`
                : 'errorPhone'
            }`}
          >
            <SvgErrors error={errorMessage} />
          </div>
        ) : null}
      </span>
    );
  }
  return (
    <span className="register_form-input_wrapper">
      <input
        {...inputProps}
        onChange={handleChange}
        onBlur={handleFocus}
        onFocus={() => {
          inputProps.name === 'confirmPassword' && setFocused(true);
        }}
        data-focused={focused.toString()}
      />
      <SvgErrors error={errorMessage} />
    </span>
  );
}

export default RegisterInputs;
