import { Product } from '@/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CartProduct = {
	product: Product
	quantity: number
}

type RemoveAlert = {
	productId: number | null
	productName: string | null
}

type AlertsState = {
	remove: RemoveAlert
	added: string | null
}

type CartState = {
	// userId: number | null
	products: CartProduct[]
	alerts: AlertsState
}

const initialState: CartState = {
	// userId: null,
	products: [],
	alerts: {
		remove: { productId: null, productName: null },
		added: null,
	}
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

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartProduct>) => {
			const existingProduct = state.products.findIndex(product => product.product.id === action.payload.product.id);

			if (existingProduct === -1) {
				state.products.push(action.payload);
				state.alerts.added = '✅ Successfully added to cart';
			} else {
				state.alerts.added = 'Item already in the cart.';
			}
		},
		removeFromCart: (state, action: PayloadAction<number>) => {
			const updatedCartProducts = state.products.filter(product => product.product.id !== action.payload);

			state.products = updatedCartProducts;
		},
		incrementQty: (state, action: PayloadAction<number>) => {
			const product = state.products.find(product => product.product.id === action.payload);

			if (product) product.quantity++;
		},
		decrementQty: (state, action: PayloadAction<number>) => {
			const product = state.products.find(product => product.product.id === action.payload);

			if (product) {
				if (product.quantity === 1) {
					state.alerts.remove = {
						productId: product.product.id,
						productName: product.product.title,
					}
				} else {
					product.quantity -= 1;
				}
			}
		},
		setRemoveAlert: (state, action: PayloadAction<RemoveAlert>) => {
			state.alerts.remove = action.payload;
		},
		clearAlert: (state) => {
			state.alerts.remove = { productId: null, productName: null }
			state.alerts.added = null;
		}
	},
});

export const { addToCart, removeFromCart, incrementQty, decrementQty, setRemoveAlert, clearAlert } = cartSlice.actions;

export default cartSlice.reducer;