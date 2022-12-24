import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProductCard } from '../models/models'

interface ProductsState {
    loading: boolean;
    error: string;
    products: IProductCard[];
}

const initialState: ProductsState = {
    loading: false,
    error: '',
    products: [],
    
};

export const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        productsFetching(state) {
            state.loading = true
        },
        productsFetchSuccess(state, action: PayloadAction<IProductCard[]>) {
            state.error = '';
            state.loading = false;
            state.products = action.payload
        },
        productsFetchError(state, action: PayloadAction<Error>) {
            state.loading = false;
            state.error = action.payload.message;
        }
    }
});

export const {
    productsFetching,
    productsFetchSuccess,
    productsFetchError
} = productsSlice.actions;

export default productsSlice.reducer;