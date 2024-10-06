import { Product } from '@/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type WishlistState = {
    wishlists: Product[]
}

const initialState: WishlistState = {
    wishlists: [],
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action: PayloadAction<Product>) => {
            state.wishlists.push(action.payload);
        },
        removeFromWishlist: (state, action: PayloadAction<number>) => {

        },
    }
})

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;