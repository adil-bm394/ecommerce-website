import axios from 'axios';
import { Product } from '../utils/interface/types';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};
