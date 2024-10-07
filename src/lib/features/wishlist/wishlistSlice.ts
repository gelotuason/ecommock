import { Product } from '@/lib/types';
import { AlertState } from '../cart/cartSlice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type WishlistState = {
    wishlists: Product[]
    alert: AlertState
}

const initialState: WishlistState = {
    wishlists: [],
    alert: {
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
            state.wishlists.push(action.payload);

            state.alert = {
                message: 'Added to wishlist ✅',
                productName: action.payload.title,
            };
        },
        removeFromWishlist: (state, action: PayloadAction<number>) => {
            const updatedWishlists = state.wishlists.filter(wishlist => wishlist.id !== action.payload);

            state.wishlists = updatedWishlists;
        },
        clearWishlistAlert: (state) => {
            state.alert = {
                message: null,
                productId: null,
                productName: null,
            }
        }
    }
})

export const { addToWishlist, removeFromWishlist, clearWishlistAlert } = wishlistSlice.actions;

export default wishlistSlice.reducer;