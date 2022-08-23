import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserInterfaceRegister } from '../../Interfaces/user.interface';
import RegisterInputs from './RegisterInputs';
import 'react-phone-number-input/style.css';
import {
  axiosResponseRegisterError,
  axiosResponseRegisterSuccess,
} from '../../Interfaces/axiosResponse.interface';

const INITIAL_STATE_REGISTER: UserInterfaceRegister = {
  name: '',
  username: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

function register() {
  const [registerValues, setRegisterValues] = useState<UserInterfaceRegister>(
    INITIAL_STATE_REGISTER,
  );
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);

  useEffect(() => {
    const { email, confirmPassword, name, password, phone, username } =
      registerValues;
    if (email && confirmPassword && name && password && phone && username) {
      setIsDisabledSubmit(false);
    } else {
      setIsDisabledSubmit(true);
    }
  }, [registerValues]);

  const [phone, setPhone] = useState<string>();

  useEffect(() => {
    setRegisterValues({ ...registerValues, ['phone']: phone });
  }, [phone]);

  const inputs = [
    {
      id: 1,
      name: 'name',
      type: 'text',
      placeholder: 'Nombre',
      errorMessage: 'Entre 3 y 16 caracteres y solo letras.',
      pattern: '^[A-Za-z]{3,16}$',
      required: true,
    },
    {
      id: 2,
      name: 'username',
      type: 'text',
      placeholder: 'Usuario',
      errorMessage:
        'Entre 3 y 16 caracteres, no se permiten caracteres especiales.',
      pattern: '^[A-Za-z0-9]{3,16}$',
      required: true,
    },
    {
      id: 3,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'Email invalido.',
      required: true,
    },
    {
      id: 4,
      name: 'phone',
      type: 'text',
      placeholder: 'Telefono de contacto',
      errorMessage: 'Numero invalido.',
      required: true,
    },
    {
      id: 5,
      name: 'password',
      type: 'password',
      placeholder: 'Contraseña',
      errorMessage:
        'Entre 6 y 32 caracteres. 1 Letra, 1 numero y 1 caracter especial.',
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}`,
      required: true,
    },
    {
      id: 6,
      name: 'confirmPassword',
      type: 'password',
      placeholder: 'Confirmar contraseña',
      errorMessage: 'Las contraseñas no son iguales.',
      pattern: registerValues.password,
      required: true,
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterValues({ ...registerValues, [name]: value });
  };

  const [isRegistered, setIsRegistered] = useState<string | null>(null);

  const submitAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/register', registerValues, {
        withCredentials: true,
      })
      .then(({ data }: axiosResponseRegisterSuccess) => {
        if (data._id) {
          window.location.href = '/login';
        } else {
          setIsRegistered('Error inesperado');
        }
      })
      .catch(({ response }: axiosResponseRegisterError) => {
        console.log(response.data);
        if (response.data.error === 'Email already exist.') {
          setIsRegistered('El Email ya existe.');
        } else if (response.data.error === 'User already exist.') {
          setIsRegistered('El usuario ya existe.');
        } else {
          setIsRegistered('Error inesperado');
        }
      });
  };

  return (
    <div className="register">
      <h2>Crear cuenta</h2>
      {isRegistered !== null ? <span>{`${isRegistered}`}</span> : null}
      <form onSubmit={submitAccount} className="register_form">
        {inputs.map((input) => {
          if (input.name === 'phone')
            return (
              <RegisterInputs
                key={input.id}
                {...input}
                value={phone}
                setPhone={setPhone}
              />
            );
          return (
            <RegisterInputs
              key={input.id}
              {...input}
              value={registerValues[input.name as keyof UserInterfaceRegister]}
              handleChange={handleChange}
            />
          );
        })}

        <div className="register_submit">
          <button disabled={isDisabledSubmit}>Crear</button>
          <Link to="/login">Ya tenes cuenta? Ingresa acá</Link>
        </div>
      </form>
    </div>
  );
}

export default register;
