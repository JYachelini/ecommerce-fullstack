import React, { useContext } from 'react';
import { Context } from '../Context/Context';
import { ProductInterface } from '../Interfaces/products.interface';
import Product from '../Product/Product';

function ProductList() {
  const {
    products,
    actual_page,
    setActualPage,
    limit,
    setLimit,
    last_page,
    total_items,
  } = useContext(Context);

  const prevPage = async () => {
    if (actual_page === 1) return;
    else setActualPage(actual_page - 1);
  };

  const nextPage = async () => {
    if (actual_page === last_page) return;
    setActualPage(actual_page + 1);
  };

  return (
    <>
      {products ? (
        <>
          <div className="products_list">
            {products.map((product: ProductInterface, index: number) => {
              return (
                <Product
                  key={index}
                  description={product.description}
                  id={product.id}
                  imageURL={product.imageURL}
                  name={product.name}
                  price={product.price}
                  category={product.category}
                  subcategory={product.subcategory}
                />
              );
            })}
          </div>
          <div className="products_pages">
            <button className="products_list-btn_prev" onClick={prevPage}>
              Prev
            </button>
            <button className="products_lsit-btn_next" onClick={nextPage}>
              Next
            </button>
            <span>
              Page {actual_page} of {last_page}
            </span>
            <span>Total items {total_items}</span>
          </div>
        </>
      ) : (
        <p>Esperando productos</p>
      )}
    </>
  );
}

export default ProductList;
