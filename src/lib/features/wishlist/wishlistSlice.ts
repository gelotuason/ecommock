import { Product } from '@/lib/types';
import { NotificationState } from '../cart/cartSlice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// TODO: add user id (check cart state)
// TODO: change wishlists -> products

type WishlistState = {
    products: Product[]
    notification: NotificationState
}

const initialState: WishlistState = {
    products: [],
    notification: {
        message: null,
        productId: null,
        productName: null,
    }
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload);

            state.notification = {
                message: 'Added to wishlist ✅',
                productName: action.payload.title,
            };
        },
        removeFromWishlist: (state, action: PayloadAction<number>) => {
            const updatedWishlists = state.products.filter(product => product.id !== action.payload);

            state.products = updatedWishlists;
        },
        clearWishlistAlert: (state) => {
            state.notification = {
                message: null,
                productId: null,
                productName: null,
            }
        }
    }
})

export const { addToWishlist, removeFromWishlist, clearWishlistAlert } = wishlistSlice.actions;

export default wishlistSlice.reducer;