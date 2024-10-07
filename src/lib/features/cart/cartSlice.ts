import { Product } from '@/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartProduct = {
	product: Product
	quantity: number
}

export type AlertState = {
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
			const existingProduct = state.products.find(cartProduct => cartProduct.product.id === action.payload.product.id);

			if (existingProduct !== undefined) {
				existingProduct.quantity++;
			} else {
				state.products.push(action.payload);
			}

			state.alert = {
				message: 'Successfully added to cart ✅',
				productName: action.payload.product.title
			};
		},
		removeFromCart: (state, action: PayloadAction<number>) => {
			const selectedProduct = state.products.find(cartProduct => cartProduct.product.id === action.payload);
			const updatedCartProducts = state.products.filter(cartProduct => cartProduct.product.id !== action.payload);

			if (updatedCartProducts && selectedProduct) {
				state.products = updatedCartProducts;
				state.alert = {
					message: 'Removed from cart ⛔',
					productName: selectedProduct.product.title
				}
			}
		},
		updateCartProduct: (state, action: PayloadAction<CartProduct>) => {
			const selectedProduct = state.products.find(cartProduct => cartProduct.product.id === action.payload.product.id);

			if (selectedProduct) {
				selectedProduct.quantity = action.payload.quantity;
				state.alert = {
					message: 'Item updated ✅',
					productName: selectedProduct.product.title
				}
			}
		},
		incrementQty: (state, action: PayloadAction<number>) => {
			const selectedProduct = state.products.find(cartProduct => cartProduct.product.id === action.payload);

			if (selectedProduct) selectedProduct.quantity++;
		},
		decrementQty: (state, action: PayloadAction<number>) => {
			const selectedProduct = state.products.find(cartProduct => cartProduct.product.id === action.payload);

			if (selectedProduct) selectedProduct.quantity -= 1;
		},
		setCartAlert: (state, action: PayloadAction<AlertState>) => {
			state.alert = action.payload;
		},
		clearCartAlert: (state) => {
			state.alert = {
				message: null,
				productId: null,
				productName: null,
			}
		}
	},
});

export const { addToCart, removeFromCart, updateCartProduct, incrementQty, decrementQty, setCartAlert, clearCartAlert } = cartSlice.actions;

export default cartSlice.reducer;