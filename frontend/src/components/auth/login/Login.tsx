import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../Context/Context';
import { useAxios } from '../../CustomHooks/useAxios';
import {
  axiosResponseLoginError,
  axiosResponseLoginSuccess,
} from '../../Interfaces/axiosResponse.interface';
import Loading from '../../Loading/Loading';
import LoginInputs from './LoginInputs';

interface LoginValues {
  username: string;
  password: string;
}
const INITIAL_STATE_LOGIN: LoginValues = {
  username: '',
  password: '',
};

function Login() {
  const { setAccessToken, setRefreshToken, loading, setLoading } =
    useContext(Context);
  const api = useAxios();
  const navigate = useNavigate();

  const [loginValues, setLoginValues] =
    useState<LoginValues>(INITIAL_STATE_LOGIN);
  const [errorLogin, setErrorLogin] = useState<string | null>(null);

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

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    api
      .post('/login', loginValues)
      .then(({ data }: axiosResponseLoginSuccess) => {
        if (data.access_token) {
          setAccessToken(data.access_token);
          setRefreshToken(data.refresh_token);
          setTimeout(() => {
            setLoading(false);
            navigate('/');
          }, 1000);
        } else {
          setLoading(false);
          setErrorLogin('Error inesperado.');
        }
      })
      .catch(({ response }: axiosResponseLoginError) => {
        setLoading(false);
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
      {loading ? (
        <Loading />
      ) : (
        <>{errorLogin ? <span>{errorLogin}</span> : null}</>
      )}
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

export default Login;
