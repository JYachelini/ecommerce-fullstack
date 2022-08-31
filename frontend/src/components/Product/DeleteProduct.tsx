import { useContext } from 'react';
import { Context } from '../Context/Context';
import { useAxios } from '../CustomHooks/useAxios';

interface PropsDeleteProduct {
  handleConfirmDelete: (e: any) => void;
  name: string | undefined;
  _id: string | undefined;
}

function DeleteProduct({ handleConfirmDelete, name, _id }: PropsDeleteProduct) {
  const { setLoading, setProducts } = useContext(Context);
  const api = useAxios();

  const deleteProduct = () => {
    try {
      setLoading(true);
      api
        .delete(`http://localhost:8080/products?id=${_id}`)
        .then(() => {
          setProducts((current) =>
            current.filter((product) => {
              return product._id !== _id;
            }),
          );
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="product_delete">
      <div className="product_delete-wrapper">
        <span>¿Seguro que deseas eliminar el producto {name}?</span>
        <div className="product_delete-buttons">
          <button onClick={handleConfirmDelete}>Cancelar</button>
          <button onClick={deleteProduct}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProduct;
