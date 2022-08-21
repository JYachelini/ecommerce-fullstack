import React from 'react';
import { ProductInterface } from '../Interfaces/products.interface';

function Product({
  id,
  imageURL,
  name,
  price,
  description,
  category,
  subcategory,
}: ProductInterface) {
  const user = {
    name: 'yache',
    isAdmin: false,
  };
  return (
    <>
      <article id={id} className="product">
        <div className="product_image">
          <img src={imageURL} alt={name} />
        </div>
        <div className="product_info">
          <span className="product_info-name">{name}</span>
          <span className="product_info-description">{description}</span>
          <span className="product_info-price">{price}</span>
        </div>
        <div className="product_add">
          <button>Agregar</button>
        </div>
        {user.isAdmin ? (
          <div className="product_edit">
            <button>Editar</button>
          </div>
        ) : null}
      </article>
    </>
  );
}

export default Product;
