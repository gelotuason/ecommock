import { Product } from '@/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

type CartProduct = {
	product: Product
	quantity: number
}

type AlertState = {
	productName: string | null
	productId: number | null
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
		productName: null,
		productId: null,
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

// TODO: change toast to shadcn toast component

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartProduct>) => {
			const existingProduct = state.products.findIndex(product => product.product.id === action.payload.product.id);

			if (existingProduct === -1) {
				state.products.push(action.payload);
				toast.success('Successfully added to cart')
			} else {
				toast('Item already in the cart.')
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
					state.alert = {
						productName: product.product.title,
						productId: product.product.id
					}
				} else {
					product.quantity -= 1
				}
			}
		},
		setAlert: (state, action: PayloadAction<AlertState>) => {
			state.alert = action.payload;
		},
		clearAlert: (state) => {
			state.alert = { productName: null, productId: null };
		}
	},
});

export const { addToCart, removeFromCart, incrementQty, decrementQty, setAlert, clearAlert } = cartSlice.actions;

export default cartSlice.reducer;