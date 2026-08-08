import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/Product';

interface WishlistState {
  items: Product[];
}

const getWishlistFromStorage = (): Product[] => {
  try {
    const storedWishlist = localStorage.getItem('wishlist');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  } catch (error) {
    console.error('Wishlist localStorage-dan oxunmadı:', error);
    return [];
  }
};

const initialState: WishlistState = {
  items: getWishlistFromStorage(),
};

const saveWishlistToStorage = (items: Product[]): void => {
  try {
    localStorage.setItem('wishlist', JSON.stringify(items));
  } catch (error) {
    console.error('Wishlist localStorage-a yazılmadı:', error);
  }
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,

  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find(
        item => item.id === action.payload.id
      );

      if (!exists) {
        state.items.push(action.payload);
        saveWishlistToStorage(state.items);
      }
    },

    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        item => item.id !== action.payload
      );

      saveWishlistToStorage(state.items);
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;