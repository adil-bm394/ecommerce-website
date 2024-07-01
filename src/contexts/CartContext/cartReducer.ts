import { CartState, Product } from '../../utils/interface/types';

interface CartAction {
  type: 'ADD_ITEM' | 'REMOVE_ITEM' | 'CLEAR_CART';
  payload?: Product | Product[];
}

export const initialState: CartState = {
  items: {},
  total: 0,
};

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      if (Array.isArray(action.payload)) {
        const items = action.payload.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});
        const total = action.payload.reduce((sum, item) => sum + item.price, 0);
        return { items, total };
      } else if (action.payload) {
        const items = { ...state.items, [action.payload.id]: action.payload };
        const total = Object.values(items).reduce((sum, item) => sum + item.price, 0);
        return { items, total };
      }
      return state;
    case 'REMOVE_ITEM':
      if (action.payload && 'id' in action.payload) {
        const { [action.payload.id]: _, ...items } = state.items;
        const total = Object.values(items).reduce((sum, item) => sum + item.price, 0);
        return { items, total };
      }
      return state;
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
};
