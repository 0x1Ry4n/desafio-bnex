export interface IProduct {
  id: string;
  name: string;
  description: string;
  value: number;
}

export type CreateProductData = Omit<IProduct, "id">;

export type UpdateProductData = Omit<Partial<IProduct>, "id">;

export interface IProductsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IProduct[];
}

export interface IPagination {
  count: number;
  num_pages: number;
  current_page: number;
  next_page: number | null;
  previous_page: number | null;
}

export interface ApiResponse {
  message: string;
  products: IProductsResponse;
  pagination: IPagination;
}
