import { useContext, useEffect } from 'react';
import { Context } from '../Context/Context';
import { useAxios } from '../CustomHooks/useAxios';
import {
  axiosResponseCategories,
  axiosResponseProducts,
} from '../Interfaces/axiosResponse.interface';
import { categories, ProductInterface } from '../Interfaces/products.interface';
import { DecodedToken } from '../Interfaces/token.interface';
import jwt_decode from 'jwt-decode';
import { useLocation } from 'react-router-dom';

function FetchFunctions({ children }: any) {
  const {
    actual_page,
    setActualPage,
    limit,
    queryCategory,
    querySubcategory,
    setLastPage,
    setTotalItems,
    setProducts,
    setCategories,
    access_token,
    setUser,
    setLoading,
    productId,
  } = useContext(Context);
  const api = useAxios();

  useEffect(() => {
    setLoading(true);
    api
      .get(
        `/products?page=${actual_page}&limit=${limit}${
          queryCategory ? `&category=${queryCategory}` : ''
        }${querySubcategory ? `&subcategory=${querySubcategory}` : ''}${
          productId ? `&id=${productId}` : ''
        }`,
      )
      .then(({ data }: axiosResponseProducts) => {
        const filteredProducts: ProductInterface[] = [];
        data.products.forEach((product: ProductInterface) => {
          const productInfo: ProductInterface = { ...product };
          filteredProducts.push(productInfo);
        });
        setLastPage(data.last_page);
        setTotalItems(data.total_items);
        setProducts(filteredProducts);
        setLoading(false);
        if (actual_page > data.last_page) {
          setActualPage(1);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [actual_page, limit, queryCategory, querySubcategory, productId]);

  useEffect(() => {
    api
      .get(`/products/categories`)
      .then(({ data }: axiosResponseCategories) => {
        const filteredCategories: categories[] = [];
        data.categories.forEach((category) => {
          filteredCategories.push(category);
        });
        setCategories(filteredCategories);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (access_token) {
      const decoded: DecodedToken = jwt_decode(access_token);
      setUser(decoded);
    }
  }, [access_token]);

  return <>{children}</>;
}

export default FetchFunctions;
