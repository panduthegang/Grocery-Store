export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  subCategory: string;
  organic: boolean;
  inStock: boolean;
  unit: string;
  weight: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  imageUrl: string;
  description: string;
}