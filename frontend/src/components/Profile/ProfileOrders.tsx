import { useContext, useEffect, useState } from 'react';
import { Context } from '../Context/Context';
import { useAxios } from '../CustomHooks/useAxios';
import { axiosOrders } from '../Interfaces/axiosResponse.interface';
import { CartInterfaceDB } from '../Interfaces/cart.interface';
import Loading from '../Loading/Loading';
import Order from './Order';
import ProfileNavbar from './ProfileNavbar';

function ProfileOrders() {
  const { user, loading, setLoading } = useContext(Context);
  const [orders, setOrders] = useState<CartInterfaceDB[]>();
  const [actual_page, setActualPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalItems, setTotalITems] = useState<number>(0);
  const [last_page, setLastPage] = useState<number>(0);
  const api = useAxios();

  useEffect(() => {
    setLoading(true);
    api
      .get(`/cart?userId=${user?._id}&page=${actual_page}&limit=${limit}`)
      .then(({ data }: axiosOrders) => {
        setOrders(data.orders);
        setTotalITems(data.total_items);
        setLastPage(data.last_page);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [user, actual_page, limit]);

  const prevPage = async () => {
    if (actual_page === 1) return;
    else setActualPage(actual_page - 1);
  };

  const nextPage = async () => {
    if (actual_page === last_page) return;
    setActualPage(actual_page + 1);
  };

  return (
    <div className="profile_wrapper">
      <ProfileNavbar />
      <div className="profile_orders-wrapper">
        <button
          className={`prev-button ${actual_page === 1 ? 'inactive' : ''}`}
          onClick={prevPage}
        >
          Prev
        </button>

        {loading ? (
          <Loading />
        ) : (
          <div className="profile_orders">
            {orders ? (
              <>
                {orders.map((order) => {
                  return <Order key={order._id} order={order} />;
                })}
              </>
            ) : null}
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
    </div>
  );
}

export default ProfileOrders;
