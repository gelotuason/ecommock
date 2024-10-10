import { Product } from '@/lib/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { startListening } from '@/app/listenerMiddleware';
import { AppDispatch, RootState } from '@/lib/store';
import { getSearchedProducts } from '@/lib/api/products';

type SearchState = {
    products: Product[]
    search: string
}

const initialState: SearchState = {
    products: [],
    search: '',
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchUpdated: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        searchProductsUpdated: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
    }
});

export const { searchUpdated, searchProductsUpdated } = searchSlice.actions;

export default searchSlice.reducer;

startListening.withTypes<RootState, AppDispatch>()({
    predicate: (action, currentState, previousState) => {
        return currentState.searchReducer.search !== previousState.searchReducer.search;
    },
    effect: async (action, listenerApi) => {
        listenerApi.cancelActiveListeners();
        await listenerApi.delay(200);

        const searchedProducts = await getSearchedProducts(listenerApi.getState().searchReducer.search);

        if (searchedProducts) listenerApi.dispatch(searchProductsUpdated(searchedProducts));
    },
});