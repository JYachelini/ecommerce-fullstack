import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import {
  axiosResponseCategories,
  axiosResponseProducts,
  categories,
  context,
} from '../Interfaces/context.interface';
import { ProductInterface } from '../Interfaces/products.interface';

const INITIAL_STATE_PRODUCTS: ProductInterface[] = [];

export const Context = createContext<context>({} as context);
export default function ContextProvider({ children }: any) {
  const [products, setProducts] = useState<ProductInterface[]>(
    INITIAL_STATE_PRODUCTS,
  );
  const [actual_page, setActualPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [last_page, setLastPage] = useState<number>(0);
  const [total_items, setTotalItems] = useState<number>(0);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/products?page=${actual_page}&limit=${limit}`,
        {
          withCredentials: true,
        },
      )
      .then(({ data }: axiosResponseProducts) => {
        const filteredProducts: ProductInterface[] = [];
        data.products.forEach((product: ProductInterface) => {
          const productInfo: ProductInterface = {
            name: product.name,
            price: product.price,
            description: product.description,
            id: product.id,
            imageURL: product.imageURL,
          };
          filteredProducts.push(productInfo);
        });
        setLastPage(data.last_page);
        setTotalItems(data.total_items);
        setProducts(filteredProducts);
      });
  }, [actual_page, limit]);

  const [categories, setCategories] = useState<categories[]>([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/products/categories`, {
        withCredentials: true,
      })
      .then(({ data }: axiosResponseCategories) => {
        const filteredCategories: categories[] = [];
        data.categories.forEach((category) => {
          filteredCategories.push(category);
        });
        setCategories(filteredCategories);
      });
  }, []);

  const [subcategoriesToView, setSubcategoriesToView] = useState<string[]>([
    'Baby',
    'Men',
    'Women',
  ]);

  return (
    <Context.Provider
      value={{
        products,
        actual_page,
        setActualPage,
        limit,
        setLimit,
        last_page,
        total_items,
        categories,
        subcategoriesToView,
        setSubcategoriesToView,
      }}
    >
      {children}
    </Context.Provider>
  );
}
