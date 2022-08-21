import { categories, ProductInterface } from './products.interface';

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
