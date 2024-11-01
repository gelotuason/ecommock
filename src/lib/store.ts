import cartReducer from '@/lib/features/cart/cartSlice';
import authReducer from '@/lib/features/auth/authSlice';
import wishlistReducer from '@/lib/features/wishlist/wishlistSlice';
import searchReducer from '@/lib/features/search/searchSlice'
import { configureStore } from '@reduxjs/toolkit';
import { listenerMiddleware } from '@/app/listenerMiddleware';

export const makeStore = () => {
    return configureStore({
        reducer: {
            cartReducer,
            authReducer,
            wishlistReducer,
            searchReducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
    })
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];