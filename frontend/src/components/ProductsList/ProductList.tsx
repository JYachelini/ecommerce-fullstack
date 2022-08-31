import { useContext, useEffect, useState } from 'react';
import { Context } from '../Context/Context';
import { ProductInterface } from '../Interfaces/products.interface';
import Loading from '../Loading/Loading';
import Product from '../Product/Product';

interface PropsProductList {
  hasPermissions?: boolean;
}

function ProductList({ hasPermissions = false }: PropsProductList) {
  const {
    products,
    actual_page,
    setActualPage,
    limit,
    setLimit,
    last_page,
    total_items,
    loading,
    setLoading,
    setProductId,
  } = useContext(Context);

  const firstPage = () => {
    setActualPage(1);
  };

  const lastPage = () => {
    setActualPage(last_page);
  };

  const prevPage = () => {
    if (actual_page === 1) return;
    else setActualPage(actual_page - 1);
  };

  const nextPage = () => {
    if (actual_page === last_page) return;
    setActualPage(actual_page + 1);
  };

  useEffect(() => {
    if (products) setLoading(false);
  }, []);

  const handleProductId = (e: any) => {
    const { value } = e.target;
    setProductId(value);
  };

  return (
    <>
      {products ? (
        <>
          {loading ? (
            <Loading />
          ) : (
            <div className="products_list">
              {products.map((product: ProductInterface) => {
                return (
                  <Product
                    product={product}
                    key={product._id}
                    hasPermissions={hasPermissions}
                  />
                );
              })}
            </div>
          )}

          <div className="products_pages">
            <div className="product_pages-btn_wrapper">
              <button className="product_pages-btn first" onClick={firstPage}>
                {`<<`}
              </button>
              <button className="product_pages-btn prev" onClick={prevPage}>
                {`<`}
              </button>
              <button
                className="product_pages-btn next_page"
                onClick={nextPage}
              >
                {`>`}
              </button>
              <button className="product_pages-btn last" onClick={lastPage}>
                {`>>`}
              </button>
            </div>
            <span>
              Page {actual_page} of {last_page}
            </span>
            <span>Total items {total_items}</span>
          </div>
          {hasPermissions ? (
            <>
              <input
                type="text"
                placeholder="Buscar por ID de producto"
                onChange={handleProductId}
              />
            </>
          ) : null}
        </>
      ) : (
        <p>No hay productos</p>
      )}
    </>
  );
}

export default ProductList;
