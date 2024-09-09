import instance from './api'; 
import { IProduct, ApiResponse } from '../types/products.type';

const ProductService = {
  getProducts: async (page: number): Promise<ApiResponse> => { 
    try {
      const response = await instance.get('/products/', {
        params: { page } 
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  getProductById: async (productId: string): Promise<IProduct> => {
    try {
      const response = await instance.get(`/products/${productId}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw error;
    }
  },

  createProduct: async (product: Omit<IProduct, 'id'>): Promise<IProduct> => {
    try {
      const response = await instance.post('/products/', product);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  updateProduct: async (productId: string, product: Partial<IProduct>): Promise<IProduct> => {
    try {
      const response = await instance.put(`/products/${productId}/`, product);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  deleteProduct: async (productId: string): Promise<void> => {
    try {
      await instance.delete(`/products/${productId}/`);
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },
};

export default ProductService;
