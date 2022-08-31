import { createContext, useEffect, useState } from 'react';
import { context } from '../Interfaces/context.interface';
import { categories, ProductInterface } from '../Interfaces/products.interface';
import { useQuery } from '../CustomHooks/queryParams';
import { useLocalStorage } from '../CustomHooks/useLocalStorage';
import { CartInterface } from '../Interfaces/cart.interface';
import { UserDecoded } from '../Interfaces/token.interface';

const INITIAL_STATE_PRODUCTS: ProductInterface[] = [];
export const INITIAL_STATE_CART: CartInterface = {
  products: [],
  totalPrice: 0,
  totalQuantity: 0,
};

export const Context = createContext<context>({} as context);
export default function ContextProvider({ children }: any) {
  const [loading, setLoading] = useState<boolean>(true);
  // Cart
  const [cart, setCart] = useLocalStorage('cart', INITIAL_STATE_CART);

  const productsCart: Set<ProductInterface> = new Set(cart.products);

  useEffect(() => {
    let cartPrice = 0;
    productsCart.forEach((product) => {
      const productTotalPrice = product.quantity! * product.price!;
      cartPrice += productTotalPrice;
    });
    setCart({ ...cart, totalPrice: cartPrice });
  }, [cart.products]);

  const addProduct = (product: ProductInterface) => {
    product.quantity = 1;
    delete product.stock;
    if (productsCart.has(product)) {
      const values = productsCart.values();
      const temp = [...values].find((el) => el._id == product._id);
      temp!.quantity! += 1;
      productsCart.delete(product);
      productsCart.add(temp!);
    } else {
      productsCart.add(product);
    }
    const quantityCart = cart.totalQuantity;
    setCart({
      products: [...productsCart],
      totalQuantity: quantityCart + 1,
    });
  };

  // Products
  const [products, setProducts] = useState<ProductInterface[]>(
    INITIAL_STATE_PRODUCTS,
  );

  // Pages of products
  const [actual_page, setActualPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [last_page, setLastPage] = useState<number>(1);
  const [total_items, setTotalItems] = useState<number>(0);
  const [productId, setProductId] = useState<string>();
  const [productName, setProductName] = useState<string>();

  let query = useQuery();
  let queryCategory = query.get('category');
  let querySubcategory = query.get('subcategory');

  useEffect(() => {
    setActualPage(1);
  }, [queryCategory]);

  // Category of products
  const [categories, setCategories] = useState<categories[]>([]);
  const [subcategoriesToView, setSubcategoriesToView] = useState<string[]>([]);

  // Token

  const [access_token, setAccessToken] = useLocalStorage('access_token', null);
  const [refresh_token, setRefreshToken] = useLocalStorage(
    'refresh_token',
    null,
  );
  const [user, setUser] = useState<UserDecoded>();

  return (
    <Context.Provider
      value={{
        loading,
        setLoading,
        cart,
        setCart,
        productsCart,
        productId,
        setProductId,
        productName,
        setProductName,
        addProduct,
        products,
        setProducts,
        actual_page,
        setActualPage,
        limit,
        setLimit,
        last_page,
        setLastPage,
        total_items,
        setTotalItems,
        queryCategory,
        querySubcategory,
        categories,
        setCategories,
        subcategoriesToView,
        setSubcategoriesToView,
        access_token,
        setAccessToken,
        refresh_token,
        setRefreshToken,
        user,
        setUser,
      }}
    >
      {children}
    </Context.Provider>
  );
}
