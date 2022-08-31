import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../Context/Context';
import { useAxios } from '../CustomHooks/useAxios';
import { ProductInterface } from '../Interfaces/products.interface';

function ProductById() {
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = useState<ProductInterface>();
  const { addProduct } = useContext(Context);
  const api = useAxios();

  useEffect(() => {
    api.get(`http://localhost:8080/products/${id}`).then(({ data }) => {
      setProduct(data.product);
    });
  }, [id]);

  if (product) {
    return (
      <article className="single_product" id={product._id}>
        <div className="single_product-image_wrapper">
          <img
            src={product.imageURL}
            alt={product.name}
            className="single_prodcut-image"
          />
        </div>
        <div className="single_product-details">
          <div className="single_product-details_wrapper">
            <h2 className="single_product-details_title">{product.name}</h2>
            <span className="single_product-details_description">
              {product.description}
            </span>
            <h4 className="single_product-details_price">$ {product.price}</h4>
          </div>
          <button
            onClick={() => {
              addProduct(product);
            }}
          >
            Agregar al carrito
          </button>
          <button>Comprar</button>
        </div>
      </article>
    );
  } else {
    return <span>Cargando producto...</span>;
  }
}

export default ProductById;
