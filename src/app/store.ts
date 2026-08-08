import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../redux/slices/cardSlice";
import wishlistSlice from "../redux/slices/wishlistSlice"
import themeSlice from "../redux/slices/themeSlice"
const store = configureStore({
    reducer: {
        cart: cartSlice,
        wishlist: wishlistSlice,
        theme: themeSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

