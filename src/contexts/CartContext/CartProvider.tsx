import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { openDB } from 'idb';
import { CartState, Product } from '../../utils/interface/types';
import { cartReducer, initialState } from './cartReducer';
import { CartAction } from './cartActions';

interface CartContextProps {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const loadCart = async () => {
      const db = await openDB('ShoppingCart', 1, {
        upgrade(db) {
          db.createObjectStore('cart', { keyPath: 'id' });
        },
      });
      const items = await db.getAll('cart');
      items.forEach(item => {
        dispatch({ type: 'ADD_ITEM', payload: item });
      });
    };
    loadCart();
  }, []);

  useEffect(() => {
    const saveCart = async () => {
      const db = await openDB('ShoppingCart', 1);
      const tx = db.transaction('cart', 'readwrite');
      const store = tx.objectStore('cart');
      await store.clear();
      for (const item of Object.values(state.items)) {
        await store.put(item);
      }
      await tx.done;
    };
    saveCart();
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
