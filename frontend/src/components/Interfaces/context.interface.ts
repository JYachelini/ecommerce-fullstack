import { categories, ProductInterface } from './products.interface';
import { UserInterface } from './user.interface';

export interface context {
  user: UserInterface | null;

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
