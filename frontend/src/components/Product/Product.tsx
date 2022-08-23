import React from 'react';
import { ProductInterface } from '../Interfaces/products.interface';

function Product({
  _id,
  imageURL,
  name,
  price,
  description,
  category,
  subcategory,
  canEdit,
}: ProductInterface) {
  const user = {
    name: 'yache',
    isAdmin: false,
  };
  return (
    <>
      <article id={_id} className="product">
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
          {canEdit ? <button>Editar</button> : null}
        </div>
      </article>
    </>
  );
}

export default Product;
