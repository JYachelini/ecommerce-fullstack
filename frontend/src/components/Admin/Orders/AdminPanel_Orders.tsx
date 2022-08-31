import { useContext, useEffect, useState } from 'react';
import { Context } from '../../Context/Context';
import { useAxios } from '../../CustomHooks/useAxios';
import { axiosOrders } from '../../Interfaces/axiosResponse.interface';
import { CartInterfaceDB } from '../../Interfaces/cart.interface';
import Loading from '../../Loading/Loading';
import Order from '../../Profile/Order';

function AdminPanel_Orders() {
  const api = useAxios();
  const { loading, setLoading } = useContext(Context);
  const [actual_page, setActualPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [last_page, setLastPage] = useState<number>(1);
  const [orders, setOrders] = useState<CartInterfaceDB[]>();
  const [userId, setUserId] = useState<string>();
  const [cartId, setCartId] = useState<string>();
  useEffect(() => {
    setLoading(true);
    api
      .get(
        `/cart?page=${actual_page}&limit=${limit}${
          userId ? `&userId=${userId}` : ''
        }${cartId ? `&cartId=${cartId}` : ''}`,
      )
      .then(({ data }: axiosOrders) => {
        setOrders(data.orders);
        setTotalItems(data.total_items);
        setLastPage(data.last_page);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [userId, cartId, actual_page, limit]);

  const prevPage = async () => {
    if (actual_page === 1) return;
    else setActualPage(actual_page - 1);
  };

  const nextPage = async () => {
    if (actual_page === last_page) return;
    setActualPage(actual_page + 1);
  };

  const handleUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserId(value);
  };

  const handleCartId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCartId(value);
  };

  return (
    <div className="admin_dashboard-orders_wrapper">
      <div className="admin_dashboard-orders_navigation_wrapper">
        <button
          className={`prev-button ${actual_page === 1 ? 'inactive' : ''}`}
          onClick={prevPage}
        >
          Prev
        </button>
        {loading ? (
          <Loading />
        ) : (
          <div className="admin_dashboard-orders">
            {orders?.map((order) => {
              return <Order key={order._id} order={order} admin={true} />;
            })}
          </div>
        )}

        <button
          className={`next-button ${
            actual_page === last_page ? 'inactive' : ''
          }`}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
      <input
        type="text"
        placeholder="Buscar por ID de usuario"
        onChange={handleUserId}
      />
      <input
        type="text"
        placeholder="Buscar por ID de pedido"
        onChange={handleCartId}
      />
    </div>
  );
}

export default AdminPanel_Orders;
