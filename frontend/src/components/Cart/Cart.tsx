import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context/Context';

function Cart({
  btnContinue = true,
  imgShow = true,
  totalEachShow = true,
  valueUnitShow = true,
}) {
  const { cart, productsCart, access_token } = useContext(Context);
  return (
    <div className="cart_view">
      {productsCart.size > 0 ? (
        <>
          <div className="cart_items">
            {[...productsCart].map((product) => {
              return (
                <Link to={`/product/${product._id}`} key={product._id}>
                  <article id={product._id}>
                    {imgShow ? (
                      <div className="cart_items-image_wrapper">
                        <img src={product.imageURL} alt={product.name} />
                      </div>
                    ) : null}

                    <div className="cart_items-info">
                      <div>
                        <h3>
                          <span>{product.quantity}</span> {product.name}
                        </h3>
                        {valueUnitShow ? (
                          <span>Unidad: ${product.price}</span>
                        ) : null}
                      </div>
                      {totalEachShow ? (
                        <h4>Total: ${product.price! * product.quantity!}</h4>
                      ) : null}
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
          <div className="cart_info">
            {btnContinue ? (
              <Link to={`${access_token ? '/cart/order' : '/register'}`}>
                Continuar con el pedido
              </Link>
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
