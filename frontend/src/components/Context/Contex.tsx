import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { context } from '../Interfaces/context.interface';
import { ProductInterface } from '../Interfaces/products.interface';

const INITIAL_STATE_PRODUCTS: ProductInterface[] = [];

export const Context = createContext<context>({} as context);
export default function ContextProvider({ children }: any) {
  const [products, setProducts] = useState<ProductInterface[]>(
    INITIAL_STATE_PRODUCTS,
  );

  useEffect(() => {
    axios
      .get('http://localhost:8080/products', { withCredentials: true })
      .then((res) => {
        const filteredProducts: ProductInterface[] = [];
        res.data.products.forEach((product: ProductInterface) => {
          const productInfo: ProductInterface = {
            name: product.name,
            price: product.price,
            description: product.description,
            id: product.id,
            imageURL: product.imageURL,
          };
          filteredProducts.push(productInfo);
        });
        setProducts(filteredProducts);
      });
  }, []);

  return <Context.Provider value={{ products }}>{children}</Context.Provider>;
}
