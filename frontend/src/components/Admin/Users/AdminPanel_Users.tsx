import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context/Context';
import { axiosResponseAdminUsersSuccess } from '../../Interfaces/axiosResponse.interface';
import { UserInterface } from '../../Interfaces/user.interface';
import UserList from './UserList';

function AdminPanel_Users() {
  const { access_token } = useContext(Context);
  const [users, setUsers] = useState<UserInterface[]>();
  const [limit, setLimit] = useState<number>(5);
  const [actual_page, setActualPage] = useState<number>(1);
  const [last_page, setLastPage] = useState<number>(0);
  const [total_items, setTotalItems] = useState<number>(0);
  const [err, setErr] = useState();
  const config = {
    headers: { Authorization: `Bearer ${access_token}` },
    withCredentials: true,
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/users?limit=${limit}&page=${actual_page}`,
        config,
      )
      .then(({ data }: axiosResponseAdminUsersSuccess) => {
        setUsers(data.users);
        setLastPage(data.last_page);
        setTotalItems(data.total_items);
      })
      .catch((err) => {
        setErr(err);
      });
  }, [actual_page]);

  const prevPage = async () => {
    if (actual_page === 1) return;
    else setActualPage(actual_page - 1);
  };

  const nextPage = async () => {
    if (actual_page === last_page) return;
    setActualPage(actual_page + 1);
  };

  return (
    <div>
      {err ? <span>{err}</span> : null}
      {users ? (
        <ul>
          {users.map((user) => {
            return <UserList key={user._id} {...user} />;
          })}
        </ul>
      ) : null}
      <div>
        <button onClick={prevPage}>Prev</button>
        <button onClick={nextPage}>Next</button>
      </div>
      <div>
        <span>
          Pagina {actual_page} de {last_page!}
        </span>
        <span>Usuarios totales: {total_items!}</span>
      </div>
    </div>
  );
}

export default AdminPanel_Users;
