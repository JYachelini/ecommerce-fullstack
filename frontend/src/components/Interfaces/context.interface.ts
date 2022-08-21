import { ProductInterface } from './products.interface';

export interface context {
  products: ProductInterface[];

  actual_page: number;
  setActualPage: React.Dispatch<React.SetStateAction<number>>;

  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;

  last_page: number;

  total_items: number;

  categories: categories[];

  subcategoriesToView: string[];
  setSubcategoriesToView: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface axiosResponseProducts {
  data: {
    products: ProductInterface[];
    actual_page: number;
    total_items: number;
    last_page: number;
  };
}

export interface axiosResponseCategories {
  data: {
    categories: categories[];
  };
}

export interface categories {
  category: string;
  subcategories: string[];
}
