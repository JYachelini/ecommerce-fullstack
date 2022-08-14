import React, { useContext } from 'react';
import { Context } from '../Context/Contex';
import { ProductInterface } from '../Interfaces/products.interface';
import Product from '../Product/Product';

function ProductList() {
  const { products } = useContext(Context);
  return (
    <div className='products_list'>
      {products ? (
        products.map((product: ProductInterface, index: number) => {
          return (
            <Product
              key={index}
              description={product.description}
              id={product.id}
              imageURL={product.imageURL}
              name={product.name}
              price={product.price}
            />
          );
        })
      ) : (
        <p>Esperando productos</p>
      )}
    </div>
  );
}

export default ProductList;
