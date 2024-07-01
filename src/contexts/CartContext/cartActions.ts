import { Product } from '../../utils/interface/types';

export interface CartAction {
  type: 'ADD_ITEM' | 'REMOVE_ITEM' | 'CLEAR_CART';
  payload?: Product | Product[];
}

export const addItem = (product: Product): CartAction => ({
  type: 'ADD_ITEM',
  payload: product,
});

export const removeItem = (product: Product): CartAction => ({
  type: 'REMOVE_ITEM',
  payload: product,
});

export const clearCart = (): CartAction => ({
  type: 'CLEAR_CART',
});
