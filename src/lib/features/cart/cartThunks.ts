import { CartProduct } from './cartSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addToCart, removeFromCart } from './cartSlice';

export const addToCartAsync = createAsyncThunk('cart/addToCart', async (product: CartProduct, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;

    try {
        const res = await fetch('https://fakestoreapi.com/carts/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        if (!res.ok) throw new Error('Failed to add cart.');

        dispatch(addToCart(product));
    } catch (err) {
        console.error(err);
        throw new Error('Failed to add cart.');
    }

});

export const removeFromCartAsync = createAsyncThunk('cart/removeFromCart', async (productId: number, thunkAPI) => {
    const dispatch = thunkAPI.dispatch;

    try {
        const res = await fetch(`https://fakestoreapi.com/carts/${productId}`, {
            method: 'DELETE',
        });

        if (!res.ok) throw new Error('Failed to remove from cart.');

        dispatch(removeFromCart(productId));
    } catch (err) {
        console.error(err);
        throw new Error('Failed to remove from cart.');
    }
});