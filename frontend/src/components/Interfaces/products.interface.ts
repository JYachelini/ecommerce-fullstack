export interface ProductInterface {
  id: string;
  name: string;
  description: string;
  imageURL: string;
  price: number;
  category: string;
  subcategory: string;
}

export interface categories {
  category: string;
  subcategories: string[];
}
