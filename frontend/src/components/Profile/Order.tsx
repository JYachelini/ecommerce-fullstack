import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CartInterfaceDB } from '../Interfaces/cart.interface';

interface PropsOrder {
  order: CartInterfaceDB;
  admin: boolean;
}

function Order({ order, admin = false }: PropsOrder) {
  const [seeProducts, setSeeProducts] = useState<boolean>(false);
  const [displayUser, setDisplayUser] = useState<boolean>(false);

  const handleProducts = () => {
    setSeeProducts(!seeProducts);
  };

  const handleUser = () => {
    setDisplayUser(!displayUser);
  };

  return (
    <div className="order">
      <div className="order-info">
        <div className="order-id">
          <h3>Orden {order._id}</h3>
        </div>
        <div className="order-details">
          <span className="order-status">
            Estado:{' '}
            <span
              className={order.status == 'In process.' ? 'process' : 'done'}
            >
              {order.status == 'In process.' ? 'En proceso.' : 'Completada.'}
            </span>
          </span>
          <span className="order-quantity">Items: {order.totalQuantity}</span>
          <span className="order-price">Precio: ${order.totalPrice}</span>
        </div>
        <div className="order-products_wrapper">
          <button onClick={handleProducts} className="order-button_products">
            {seeProducts ? 'Tapar productos' : 'Mostrar productos'}
          </button>
          {seeProducts ? (
            <div className="order-products">
              {order.products.map((product) => {
                return (
                  <Link
                    to={`/product/${product._id}`}
                    key={product._id}
                    className="order-products_each"
                  >
                    {product.quantity} {product.name}
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
      {admin ? (
        <div className="order-user_info">
          <button onClick={handleUser}>
            {displayUser ? 'Ocultar usuario' : 'Mostrar usuario'}
          </button>
          {displayUser ? (
            <>
              <span>
                User ID: <strong>{order.userId}</strong>
              </span>
              <span>
                Usuario: <strong>{order.userUsername}</strong>
              </span>
              <span>
                Telefono: <strong>{order.userPhone}</strong>
              </span>
              <span>
                Email: <strong>{order.userEmail}</strong>
              </span>
              <span>
                Direccion: <strong>{order.userAddress}</strong>
              </span>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default Order;
