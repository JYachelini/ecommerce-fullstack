import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context/Context';
import { ProductInterface } from '../Interfaces/products.interface';

interface ProductInCart {
  product: ProductInterface;
  imgShow: boolean;
  valueUnitShow: boolean;
  totalEachShow: boolean;
}

function ProductInCart({
  product,
  imgShow,
  valueUnitShow,
  totalEachShow,
}: ProductInCart) {
  const { removeProduct } = useContext(Context);
  return (
    <article id={product._id}>
      {imgShow ? (
        <div className="cart_items-image_wrapper">
          <Link to={`/product/${product._id}`} key={product._id}>
            <img src={product.imageURL} alt={product.name} />
          </Link>
        </div>
      ) : null}

      <div className="cart_items-info">
        <div>
          <h3>
            <span>{product.quantity}</span> {product.name}
          </h3>
          {valueUnitShow ? <span>Unidad: ${product.price}</span> : null}
        </div>
        <div>
          {totalEachShow ? (
            <h4>Total: ${product.price! * product.quantity!}</h4>
          ) : null}
          <button
            onClick={() => {
              removeProduct(product);
            }}
          >
            Eliminar del carrito
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductInCart;
