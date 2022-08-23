export interface ProductInterface {
  _id: string;
  name: string;
  description: string;
  imageURL: string;
  price: number;
  category: string;
  subcategory: string;
  canEdit?: boolean;
}

export interface categories {
  category: string;
  subcategories: string[];
}
