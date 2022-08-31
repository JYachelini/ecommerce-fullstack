import { Fragment, useContext, useState } from 'react';
import { Context } from '../Context/Context';
import { useAxios } from '../CustomHooks/useAxios';
import { ProductInterface } from '../Interfaces/products.interface';

interface EditProduct {
  product: ProductInterface;
  handleEdit: (e: any) => void;
}

function EditProduct({ product, handleEdit }: EditProduct) {
  const inputs = [
    {
      id: 1,
      name: 'name',
      placeholder: 'Nombre',
      type: 'text',
    },
    {
      id: 2,
      name: 'description',
      placeholder: 'Descripcion',
      type: 'text',
    },
    {
      id: 3,
      name: 'imageURL',
      placeholder: 'URL Imagen',
      type: 'text',
    },
    {
      id: 4,
      name: 'category',
      placeholder: 'Categoria',
      type: 'text',
    },
    {
      id: 5,
      name: 'subcategory',
      placeholder: 'Subcategoria',
      type: 'text',
    },
    {
      id: 6,
      name: 'price',
      placeholder: 'Precio',
      type: 'text',
    },
    {
      id: 7,
      name: 'stock',
      placeholder: 'Stock',
      type: 'text',
    },
  ];

  const api = useAxios();
  const { setLoading, setProducts } = useContext(Context);

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

  const initialProduct = {
    name: name,
    description: description,
    imageURL: imageURL,
    category: category,
    subcategory: subcategory,
    price: price,
    stock: stock,
  };

  const [productValues, setProductValues] =
    useState<ProductInterface>(initialProduct);

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setProductValues({ ...productValues, [name]: value });
  };

  const updateProduct = () => {
    try {
      setLoading(true);
      api
        .put(`/products?id=${_id}`, { ...productValues })
        .then(() => {
          setProducts((prevState) => {
            const newState = prevState.map((obj) => {
              if (obj._id === _id) {
                return { ...obj, ...productValues };
              }
              return obj;
            });
            return newState;
          });
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article id={_id} className="product_edit">
      <form className="product_edit-form">
        {inputs.map((input) => {
          return (
            <Fragment key={input.id}>
              <label className="product_edit-label">
                {input.name}
                <input
                  className="product_edit-input"
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                  value={productValues[
                    input.name as keyof ProductInterface
                  ]?.toString()}
                  onChange={handleChange}
                />
              </label>
            </Fragment>
          );
        })}
        <div className="product_edit-buttons">
          <button onClick={handleEdit}>Cancelar</button>
          <button onClick={updateProduct}>Guardar</button>
        </div>
      </form>
    </article>
  );
}

export default EditProduct;
