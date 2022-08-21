import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { context } from '../Interfaces/context.interface';
import { categories, ProductInterface } from '../Interfaces/products.interface';
import { useQuery } from '../CustomHooks/queryParams';
import {
  axiosResponseCategories,
  axiosResponseProducts,
} from '../Interfaces/axiosResponse.interface';
import { UserInterface } from '../Interfaces/user.interface';

const INITIAL_STATE_PRODUCTS: ProductInterface[] = [];

export const Context = createContext<context>({} as context);
export default function ContextProvider({ children }: any) {
  // User
  const [user, setUser] = useState<UserInterface | null>(null);

  useEffect(() => {
    axios
      .get('http://localhost:8080/user', { withCredentials: true })
      .then(({ data }) => {
        console.log(data);
      })
      .catch(() => {
        console.clear();
      });
  }, []);

  // Products
  const [products, setProducts] = useState<ProductInterface[]>(
    INITIAL_STATE_PRODUCTS,
  );

  // Pages of products
  const [actual_page, setActualPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [last_page, setLastPage] = useState<number>(0);
  const [total_items, setTotalItems] = useState<number>(0);

  let query = useQuery();
  let queryCategory = query.get('category');
  let querySubcategory = query.get('subcategory');

  useEffect(() => {
    setActualPage(1);
  }, [queryCategory]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/products?page=${actual_page}&limit=${limit}${
          queryCategory ? `&category=${queryCategory}` : ''
        }${querySubcategory ? `&subcategory=${querySubcategory}` : ''}`,
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
            category: product.category,
            subcategory: product.subcategory,
          };
          filteredProducts.push(productInfo);
        });
        setLastPage(data.last_page);
        setTotalItems(data.total_items);
        setProducts(filteredProducts);
      });
  }, [actual_page, limit, queryCategory, querySubcategory]);

  // Category of products
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

  const [subcategoriesToView, setSubcategoriesToView] = useState<string[]>([]);

  return (
    <Context.Provider
      value={{
        user,
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
