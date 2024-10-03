import { Product } from '@/lib/types';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export type CartProduct = {
	product: Product
	quantity: number
}

type Alert = 'add' | 'remove' | 'confirmation' | null

type AlertState = {
	type: Alert
	message?: string | null
	productId?: number | null
	productName?: string | null
}

type CartState = {
	// userId: number | null
	products: CartProduct[]
	alert: AlertState
}

const initialState: CartState = {
	// userId: null,
	products: [],
	alert: {
		type: null,
		message: null,
		productId: null,
		productName: null,
	}
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartProduct>) => {
			const existingProduct = state.products.findIndex(product => product.product.id === action.payload.product.id);

			if (existingProduct === -1) {
				state.products.push(action.payload);
				state.alert = {
					type: 'add',
					message: 'Successfully added to cart ✅',
					productName: action.payload.product.title
				};
			} else {
				state.alert = {
					type: 'add',
					message: 'Item already in the cart',
					productName: action.payload.product.title
				};
			}
		},
		removeFromCart: (state, action: PayloadAction<number>) => {
			const selectedProduct = state.products.find(product => product.product.id === action.payload);
			const updatedCartProducts = state.products.filter(product => product.product.id !== action.payload);

			if (updatedCartProducts && selectedProduct) {
				state.products = updatedCartProducts;
				state.alert = {
					type: 'remove',
					message: 'Removed from cart ⛔',
					productName: selectedProduct.product.title
				}
			}

		},
		incrementQty: (state, action: PayloadAction<number>) => {
			const product = state.products.find(product => product.product.id === action.payload);

			if (product) product.quantity++;
		},
		decrementQty: (state, action: PayloadAction<number>) => {
			const product = state.products.find(product => product.product.id === action.payload);

			if (product) {
				if (product.quantity === 1) {
					state.alert = {
						type: 'confirmation',
						productId: product.product.id,
						productName: product.product.title,
					}
				} else {
					product.quantity -= 1;
				}
			}
		},
		setAlert: (state, action: PayloadAction<AlertState>) => {
			state.alert = action.payload;
		},
		clearAlert: (state) => {
			state.alert = {
				type: null,
				message: null,
				productId: null,
				productName: null,
			}
		}
	},
});

export const { addToCart, removeFromCart, incrementQty, decrementQty, setAlert, clearAlert } = cartSlice.actions;

export default cartSlice.reducer;