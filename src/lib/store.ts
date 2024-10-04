import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/lib/features/cart/cartSlice';
import authReducer from '@/lib/features/auth/authSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            cartReducer,
            authReducer,
        },
    })
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];