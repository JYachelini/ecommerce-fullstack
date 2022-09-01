import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context/Context';
import ProductInCart from './ProductInCart';

function Cart({
  btnContinue = true,
  imgShow = true,
  totalEachShow = true,
  valueUnitShow = true,
}) {
  const { cart, productsCart, access_token, clearCart } = useContext(Context);
  return (
    <div className="cart_view">
      {productsCart.size > 0 ? (
        <>
          <div className="cart_items">
            {Array.from(productsCart.values()).map((product) => {
              return (
                <ProductInCart
                  key={product._id}
                  product={product}
                  imgShow={imgShow}
                  totalEachShow={totalEachShow}
                  valueUnitShow={valueUnitShow}
                />
              );
            })}
          </div>
          <div className="cart_info">
            {btnContinue ? (
              <>
                <Link to={`${access_token ? '/cart/order' : '/register'}`}>
                  Continuar con el pedido
                </Link>
                <button onClick={clearCart}>Limpiar carrito</button>
              </>
            ) : null}
            <span>
              Total: <strong>${cart.totalPrice}</strong>
            </span>
          </div>
        </>
      ) : (
        <>
          <span>Todavía no hay productos en el carrito</span>
        </>
      )}
    </div>
  );
}

export default Cart;
