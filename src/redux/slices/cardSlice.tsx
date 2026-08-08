import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* ===TYPES === */

export interface CartItem {
  id: string | number;
  productName: string;
  imgUrl: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface CartState {
  cartItems: CartItem[];
  totalAmount: number;
  totalQuantity: number;
}

/* ====INITIAL STATE ===*/

let initialState: CartState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartString = localStorage.getItem("cart");
if (cartString !== null) {
  initialState = JSON.parse(cartString) as CartState;
}

/* ===SLICE ===*/

const cardSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      state.totalQuantity += 1;

      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          imgUrl: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity += 1;
        existingItem.totalPrice += newItem.price;
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    deleteItem: (state, action: PayloadAction<string | number>) => {
      const id = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.id === id
      );

      if (existingItem) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== id
        );
        state.totalQuantity -= existingItem.quantity;
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

/* ===EXPORTS ===*/

export const cartActions = cardSlice.actions;
export default cardSlice.reducer;
