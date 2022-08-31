import { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context/Context';
import { useAxios } from '../../CustomHooks/useAxios';
import { axiosResponseAdminUsersSuccess } from '../../Interfaces/axiosResponse.interface';
import { UserInterface } from '../../Interfaces/user.interface';
import Loading from '../../Loading/Loading';
import UserList from './UserList';

function AdminPanel_Users() {
  const [users, setUsers] = useState<UserInterface[]>();
  const [limit, setLimit] = useState<number>(10);
  const [actual_page, setActualPage] = useState<number>(1);
  const [last_page, setLastPage] = useState<number>(0);
  const [total_items, setTotalItems] = useState<number>(0);
  const [err, setErr] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>();
  const { loading, setLoading } = useContext(Context);
  const api = useAxios();

  useEffect(() => {
    setLoading(true);
    api
      .get(
        `http://localhost:8080/users?limit=${limit}&page=${actual_page}${
          userId ? `&userId=${userId}` : ''
        }`,
      )
      .then(({ data }: axiosResponseAdminUsersSuccess) => {
        setUsers(data.users);
        setLastPage(data.last_page);
        setTotalItems(data.total_items);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setErr(err.response.data.message);
      });
  }, [actual_page, userId, limit]);

  const prevPage = () => {
    if (actual_page === 1) return;
    else setActualPage(actual_page - 1);
  };

  const nextPage = () => {
    if (actual_page === last_page) return;
    setActualPage(actual_page + 1);
  };

  const handleUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserId(value);
  };

  return (
    <div className="admin_dashboard-users_wrapper">
      {err ? <span>{err}</span> : null}
      {loading ? (
        <Loading />
      ) : (
        <div className="admin_dashboard-users">
          {users?.map((user) => {
            return <UserList key={user._id} user={user} />;
          })}
        </div>
      )}
      <div className="buttons_wrapper">
        <button onClick={prevPage} className="prev">
          Prev
        </button>
        <button onClick={nextPage} className="next">
          Next
        </button>
      </div>
      <span className="pages">
        Pagina {actual_page} de {last_page!}
      </span>
      <span className="total_items">Usuarios totales: {total_items!}</span>
      <input
        type="text"
        placeholder="Buscar por ID de usuario"
        onChange={handleUserId}
      />
    </div>
  );
}

export default AdminPanel_Users;
