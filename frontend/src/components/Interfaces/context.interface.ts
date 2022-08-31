import { CartInterface } from './cart.interface';
import { categories, ProductInterface } from './products.interface';
import { UserDecoded } from './token.interface';

export interface context {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  cart: CartInterface;
  setCart: any;
  productsCart: Set<ProductInterface>;
  addProduct: (product: ProductInterface) => void;

  products: ProductInterface[];
  setProducts: React.Dispatch<React.SetStateAction<ProductInterface[]>>;

  productId: string | undefined;
  setProductId: React.Dispatch<React.SetStateAction<string | undefined>>;
  productName: string | undefined;
  setProductName: React.Dispatch<React.SetStateAction<string | undefined>>;

  actual_page: number;
  setActualPage: React.Dispatch<React.SetStateAction<number>>;

  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;

  last_page: number;
  setLastPage: React.Dispatch<React.SetStateAction<number>>;

  total_items: number;
  setTotalItems: React.Dispatch<React.SetStateAction<number>>;

  queryCategory: string | null;
  querySubcategory: string | null;

  categories: categories[];
  setCategories: React.Dispatch<React.SetStateAction<categories[]>>;

  subcategoriesToView: string[];
  setSubcategoriesToView: React.Dispatch<React.SetStateAction<string[]>>;

  access_token: string | any;
  setAccessToken: string | any;
  refresh_token: string | any;
  setRefreshToken: string | any;
  user: UserDecoded | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserDecoded | undefined>>;
}
