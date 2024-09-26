import { Product } from '@/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartProduct = {
	product: Product
	quantity?: number
}

type CartState = {
	// userId: number | null
	products: CartProduct[]
}

const initialState: CartState = {
	// userId: null,
	products: [],
}

// const addCartAsync = createAsyncThunk('cart/addCart', async () => {
// 	try {
// 		const res = await fetch('https://fakestoreapi.com/carts/', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify(postData.cart),
// 		});
// 	} catch (err) {
// 		console.error(err);
// 		throw new Error('Failed to add cart.');
// 	}
// });

// TODO: refactor quantity scope

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartProduct>) => {
			const existingProduct = state.products.findIndex(product => product.product.id === action.payload.product.id);

			if (existingProduct === -1) {
				state.products.push({ ...action.payload, quantity: 1 });
			} else {
				if (state.products[existingProduct].quantity) {
					if (action.payload.quantity) {
						state.products[existingProduct].quantity += action.payload.quantity;
					} else {
						state.products[existingProduct].quantity += 1;
					}
				}
			}
		}
	},
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;