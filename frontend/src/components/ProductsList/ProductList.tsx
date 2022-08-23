import { useContext } from 'react';
import { Context } from '../Context/Context';
import { ProductInterface } from '../Interfaces/products.interface';
import Product from '../Product/Product';

interface PropsProductList {
  canEdit?: boolean;
}

function ProductList({ canEdit = false }: PropsProductList) {
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
            {products.map((product: ProductInterface) => {
              return (
                <Product {...product} key={product._id} canEdit={canEdit} />
              );
            })}
          </div>
          <div className="products_pages">
            <div className="product_pages-btn_wrapper">
              <button className="product_pages-btn prev" onClick={prevPage}>
                Prev
              </button>
              <button
                className="product_pages-btn next_page"
                onClick={nextPage}
              >
                Next
              </button>
            </div>
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
