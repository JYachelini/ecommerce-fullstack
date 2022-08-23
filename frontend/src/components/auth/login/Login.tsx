import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../Context/Context';
import {
  axiosResponseLoginError,
  axiosResponseLoginSuccess,
} from '../../Interfaces/axiosResponse.interface';
import LoginInputs from './LoginInputs';

interface LoginValues {
  username: string;
  password: string;
}
const INITIAL_STATE_LOGIN: LoginValues = {
  username: '',
  password: '',
};

function login() {
  const navigate = useNavigate();
  const { setAccessToken } = useContext(Context);

  const [loginValues, setLoginValues] =
    useState<LoginValues>(INITIAL_STATE_LOGIN);

  const handleChangeLoginValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginValues({ ...loginValues, [name]: value });
  };

  const inputs = [
    {
      id: 1,
      name: 'username',
      placeholder: 'Usuario',
      type: 'text',
      required: true,
    },
    {
      id: 2,
      name: 'password',
      placeholder: 'Contraseña',
      type: 'password',
      required: true,
    },
  ];

  const [errorLogin, setErrorLogin] = useState<string | null>(null);

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/login', loginValues, {
        withCredentials: true,
      })
      .then(({ data }: axiosResponseLoginSuccess) => {
        if (data.access_token) {
          setAccessToken(data.access_token);
          navigate('/');
        } else {
          setErrorLogin('Error inesperado');
        }
      })
      .catch(({ response }: axiosResponseLoginError) => {
        if (response.data.error === 'User not found.') {
          setErrorLogin('Usuario no encontrado.');
        } else if (response.data.error === 'Wrong password.') {
          setErrorLogin('Contraseña incorrecta.');
        } else {
          setErrorLogin('Error inesperado.');
        }
      });
  };

  return (
    <div className="login">
      <h2>Ingresar</h2>
      {errorLogin ? <span>{errorLogin}</span> : null}
      <form className="login-form" onSubmit={login}>
        {inputs.map((input) => {
          return (
            <LoginInputs
              {...input}
              value={loginValues[input.name as keyof LoginValues]}
              key={input.id}
              handleChange={handleChangeLoginValues}
            />
          );
        })}
        <div className="login-form-btn_wrapper">
          <button>Ingresar</button>
          <Link to="/register">Crearse una cuenta</Link>
        </div>
      </form>
    </div>
  );
}

export default login;
