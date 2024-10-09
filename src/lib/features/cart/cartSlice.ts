import { Product } from '@/lib/types';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export type CartProduct = Product & {
	quantity: number
}

export type NotificationState = {
	message?: string | null
	productId?: number | null
	productName?: string | null
}

type CartState = {
	// userId: number | null
	products: CartProduct[]
	status: 'idle' | 'pending' | 'success' | 'failed'
	notification: NotificationState
	error: string | null
}

const initialState: CartState = {
	// userId: null,
	products: [],
	status: 'idle',
	notification: {
		message: null,
		productId: null,
		productName: null,
	},
	error: null,
}

// TODO: add userId

export const addToCart = createAsyncThunk('cart/addToCart', async (product: CartProduct, thunkAPI) => {
	try {
		const res = await fetch('https://fakestoreapi.com/carts/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(product),
		});

		if (!res.ok) return thunkAPI.rejectWithValue('Something went wrong. Please try again.');

		return product;
	} catch (err) {
		console.error(err);
		return thunkAPI.rejectWithValue('Something went wrong. Please try again.');
	}
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId: number, thunkAPI) => {
	try {
		const res = await fetch(`https://fakestoreapi.com/carts/${productId}`, {
			method: 'DELETE',
		});

		if (!res.ok) return thunkAPI.rejectWithValue('Something went wrong. Please try again.');

		return productId;
	} catch (err) {
		console.error(err);
		return thunkAPI.rejectWithValue('Something went wrong. Please try again.');
	}
});

export const updateCartProduct = createAsyncThunk('cart/updateCartProduct', async (cartProduct: CartProduct, thunkAPI) => {
	try {
		const res = await fetch(`https://fakestoreapi.com/carts/${cartProduct.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId: 1,
				date: Date.now(),
				products: [{ productId: cartProduct.id, quantity: cartProduct.quantity }]
			}),
		});

		if (!res.ok) return thunkAPI.rejectWithValue('Something went wrong. Please try again.');

		return cartProduct;
	} catch (err) {
		console.error(err);
		return thunkAPI.rejectWithValue('Something went wrong. Please try again.');
	}
});

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCartAlert: (state, action: PayloadAction<NotificationState>) => {
			state.notification = action.payload;
		},
		clearMessages: (state) => {
			state.notification = {
				message: null,
				productId: null,
				productName: null,
			};

			state.error = null;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(addToCart.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(addToCart.fulfilled, (state, action: PayloadAction<CartProduct>) => {
				state.status = 'success';

				const existingProduct = state.products.find(cartProduct => cartProduct.id === action.payload.id);

				if (existingProduct !== undefined) {
					existingProduct.quantity++;
				} else {
					state.products.push(action.payload);
				}

				state.notification = {
					message: 'Successfully added to cart ✅',
					productName: action.payload.title
				};
			})
			.addCase(addToCart.rejected, (state, action: PayloadAction<string | unknown>) => {
				state.status = 'failed';
				state.error = action.payload as string;
			})
			.addCase(removeFromCart.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(removeFromCart.fulfilled, (state, action: PayloadAction<number>) => {
				state.status = 'success';

				const selectedProduct = state.products.find(cartProduct => cartProduct.id === action.payload);
				const updatedCartProducts = state.products.filter(cartProduct => cartProduct.id !== action.payload);

				if (updatedCartProducts && selectedProduct) {
					state.products = updatedCartProducts;
					state.notification = {
						message: 'Removed from cart ⛔',
						productName: selectedProduct.title
					}
				}
			})
			.addCase(removeFromCart.rejected, (state, action: PayloadAction<string | unknown>) => {
				state.status = 'failed';
				state.error = action.payload as string;
			})
			.addCase(updateCartProduct.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(updateCartProduct.fulfilled, (state, action: PayloadAction<CartProduct>) => {
				state.status = 'success';

				const selectedProduct = state.products.find(cartProduct => cartProduct.id === action.payload.id);

				if (selectedProduct) {
					selectedProduct.quantity = action.payload.quantity;
					state.notification = {
						message: 'Item updated ✅',
						productName: selectedProduct.title
					}
				}
			})
	}
});

export const { setCartAlert, clearMessages } = cartSlice.actions;

export default cartSlice.reducer;