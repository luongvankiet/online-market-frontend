import { ICategory } from "./Category";

export interface IProduct {
  id?: 2;
  name?: string;
  description?: string;
  quantity?: number;
  status?: string;
  status_name?: string;
  status_color?: any;
  product_code?: string;
  product_sku?: string;
  regular_price?: number;
  sale_price?: number;
  unit?: string;
  category_id?: number;
  category?: ICategory;
  image?: any;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
}
