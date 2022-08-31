export interface ProductInterface {
  _id?: string;
  name?: string;
  description?: string;
  imageURL?: string;
  price?: number;
  category?: string;
  subcategory?: string;
  stock?: number;
  canEdit?: boolean;
  canAdd?: boolean;
  quantity?: number;
}

export interface categories {
  category: string;
  subcategories: string[];
}
