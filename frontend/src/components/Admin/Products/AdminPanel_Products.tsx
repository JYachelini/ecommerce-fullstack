import { useContext, useEffect } from 'react';
import { Context } from '../../Context/Context';
import ProductList from '../../ProductsList/ProductList';
function AdminPanel_Products() {
  const { setLimit } = useContext(Context);
  useEffect(() => {
    setLimit(5);
  }, []);

  return (
    <>
      <ProductList hasPermissions={true} />
    </>
  );
}

export default AdminPanel_Products;
