import { Category } from "./category.model";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  available: boolean;
  image: string;
  createdAt: string;
  categoryId: number;
  category: Category;
}
