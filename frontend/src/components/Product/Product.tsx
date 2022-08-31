import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductInterface } from '../Interfaces/products.interface';
import DeleteProduct from './DeleteProduct';
import EditProduct from './EditProduct';

interface PropsProduct {
  hasPermissions?: boolean;
  product: ProductInterface;
}

function Product({ hasPermissions = false, product }: PropsProduct) {
  const {
    _id,
    name,
    description,
    imageURL,
    category,
    subcategory,
    price,
    stock,
  } = product;

  const [edit, setEdit] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const handleDelete = (e: any) => {
    e.preventDefault();
    setConfirmDelete(!confirmDelete);
  };

  const editProduct = (e: any) => {
    e.preventDefault();
    setEdit(!edit);
  };
  return (
    <>
      <article id={_id} className="product">
        <div className="product_image">
          <Link to={`/product/${_id}`}>
            <img src={imageURL} alt={name} />
          </Link>
        </div>
        <div className="product_info">
          <span className="product_info-name">{name}</span>
        </div>
        {hasPermissions ? (
          <div className="product_admin-buttons">
            <button onClick={editProduct}>Editar</button>
            <button onClick={handleDelete}>Eliminar</button>
          </div>
        ) : null}
      </article>
      {edit ? <EditProduct product={product} handleEdit={editProduct} /> : null}
      {confirmDelete ? (
        <DeleteProduct
          handleConfirmDelete={handleDelete}
          name={name}
          _id={_id}
        />
      ) : null}
    </>
  );
}

export default Product;
