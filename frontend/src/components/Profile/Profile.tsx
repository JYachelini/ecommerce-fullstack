import { useContext, useEffect, useState } from 'react';
import { Context } from '../Context/Context';
import { useAxios } from '../CustomHooks/useAxios';
import { axiosUpdateUser } from '../Interfaces/axiosResponse.interface';
import Loading from '../Loading/Loading';
import EditField from './EditField';
import ProfileNavbar from './ProfileNavbar';
import UpdateUser from './UpdateUser';

interface userValues {
  username?: string;
  name?: string;
  email?: string;
  phone?: string;
}

interface INITIAL_USER {
  username: string;
  name: string;
  email: string;
  phone: string;
}

function Profile() {
  const { user, setLoading, loading } = useContext(Context);
  const { _id, name, username, email, phone, address } = user!;
  useEffect(() => {
    setLoading(false);
  }, []);

  const api = useAxios();

  const INITIAL_USER = {
    username,
    name,
    email,
    phone,
  };

  const [initialUser, setInitialUser] = useState<INITIAL_USER>(INITIAL_USER);
  const [userValues, setUserValues] = useState<userValues>({});

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    if (value == initialUser[name as keyof INITIAL_USER]) {
      setUserValues((current) => {
        const copy = { ...current };
        delete copy[name as keyof userValues];
        return copy;
      });
    } else {
      setUserValues({ ...userValues, [name]: value });
    }
  };

  const inputs = [
    {
      id: 1,
      name: 'username',
      type: 'text',
      placeholder: 'Usuario',
    },
    {
      id: 2,
      name: 'name',
      type: 'text',
      placeholder: 'Nombre',
    },
    {
      id: 3,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
    },
    {
      id: 4,
      name: 'phone',
      type: 'text',
      placeholder: 'Telefono',
    },
  ];

  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();

  const handleEdit = () => {
    setEnableEdit(!enableEdit);
  };

  const handleUpdateUser = () => {
    try {
      setLoading(true);
      api
        .put(`/user/${_id}`, { ...userValues })
        .then(({ data }: axiosUpdateUser) => {
          console.log(data);
          setLoading(false);
          setMessage(
            'Actualizado correctamente. Para ver los cambios, vuelva a ingresar.',
          );
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.data === 'Email exist.')
            setMessage('El email ya existe.');
          if (err.response.data === 'Username exist.')
            setMessage('El usuario ya existe.');
        });
    } catch (error) {
      setLoading(false);

      return error;
    }
  };

  return (
    <div className="profile_wrapper">
      <ProfileNavbar />
      {loading ? (
        <Loading />
      ) : (
        <div className="profile">
          {message ? <span className="message">{message}</span> : null}
          <h2 className="profile-title">
            Tu información <EditField handleEdit={handleEdit} />
            <span>ID: {_id}</span>
          </h2>
          <div className="profile_values">
            {inputs.map((input) => {
              return (
                <UpdateUser
                  key={input.id}
                  {...input}
                  defaultValue={initialUser[input.name as keyof userValues]}
                  handleChange={handleChange}
                  enableEdit={enableEdit}
                />
              );
            })}
            {enableEdit ? (
              <div className="profile_edit-buttons">
                <button
                  onClick={() => {
                    setEnableEdit(false);
                  }}
                >
                  Cancelar
                </button>
                <button onClick={handleUpdateUser}>Guardar</button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
