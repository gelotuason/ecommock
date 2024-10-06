import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/lib/features/cart/cartSlice';
import authReducer from '@/lib/features/auth/authSlice';
import wishlistReducer from '@/lib/features/wishlist/wishlistSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            cartReducer,
            authReducer,
            wishlistReducer,
        },
    })
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];