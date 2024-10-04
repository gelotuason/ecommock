import { Product } from '@/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartProduct = {
	product: Product
	quantity: number
}

type AlertState = {
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
					message: 'Successfully added to cart ✅',
					productName: action.payload.product.title
				};
			} else {
				state.alert = {
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
					message: 'Removed from cart ⛔',
					productName: selectedProduct.product.title
				}
			}
		},
		updateCartProduct: (state, action: PayloadAction<CartProduct>) => {
			const selectedProduct = state.products.find(product => product.product.id === action.payload.product.id);

			if (selectedProduct) {
				selectedProduct.quantity = action.payload.quantity;
				state.alert = {
					message: 'Item updated ✅',
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

			if (product) product.quantity -= 1;
		},
		setAlert: (state, action: PayloadAction<AlertState>) => {
			state.alert = action.payload;
		},
		clearAlert: (state) => {
			state.alert = {
				message: null,
				productId: null,
				productName: null,
			}
		}
	},
});

export const { addToCart, removeFromCart, updateCartProduct, incrementQty, decrementQty, setAlert, clearAlert } = cartSlice.actions;

export default cartSlice.reducer;