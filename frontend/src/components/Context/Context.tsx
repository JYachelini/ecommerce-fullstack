import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { context } from '../Interfaces/context.interface';
import { categories, ProductInterface } from '../Interfaces/products.interface';
import { useQuery } from '../CustomHooks/queryParams';
import {
  axiosResponseCategories,
  axiosResponseProducts,
} from '../Interfaces/axiosResponse.interface';
import { useLocalStorage } from '../CustomHooks/useLocalStorage';

const INITIAL_STATE_PRODUCTS: ProductInterface[] = [];

export const Context = createContext<context>({} as context);
export default function ContextProvider({ children }: any) {
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
            ...product,
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
  // Token

  const [access_token, setAccessToken] = useLocalStorage('access_token', '');

  return (
    <Context.Provider
      value={{
        // user,
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
        access_token,
        setAccessToken,
      }}
    >
      {children}
    </Context.Provider>
  );
}
