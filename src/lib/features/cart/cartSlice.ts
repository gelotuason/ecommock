import { Product } from '@/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartProduct = {
	product: Product
	quantity: number
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
				state.products.push(action.payload);
			} else {
				state.products[existingProduct].quantity += 1;
			}
		},
		removeFromCart: (state, action: PayloadAction<number>) => {
			const updatedCartProducts = state.products.filter(product => product.product.id !== action.payload);
			state.products = updatedCartProducts;
		},
		// updateQuantity: (state, action: PayloadAction<{ productId: number, quantity: number }>) => {
		// 	const { productId, quantity } = action.payload;
		// 	const product = state.products.find(item => item.product.id === productId);

		// 	if (product) {
		// 		product.quantity = quantity
		// 	}
		// },
		incrementQuantity: (state, action: PayloadAction<number>) => {
			const product = state.products.find(product => product.product.id === action.payload);

			if (product) {
				product.quantity++;
			}
		},
		decrementQuantity: (state, action: PayloadAction<number>) => {
			const product = state.products.find(product => product.product.id === action.payload);

			if (product && product.quantity !== 0) {
				product.quantity--;
			}
		},
	},
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;