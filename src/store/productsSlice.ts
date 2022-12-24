import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IFilter, IProductCard } from '../models/models'

interface ProductsState {
    loading: boolean;
    error: string;
    products: IProductCard[];
    productsCurrent: IProductCard[];
}

const initialState: ProductsState = {
    loading: false,
    error: '',
    products: [],
    productsCurrent:[],
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
            state.productsCurrent = action.payload;
            state.products = action.payload;
        },
        productsFetchError(state, action: PayloadAction<Error>) {
            state.loading = false;
            state.error = action.payload.message;
        },
        productsFilter(state, action: PayloadAction<IFilter>) {
            state.products = state.productsCurrent
                .filter(product => {
                    if (action.payload.categories.length === 0) return product;
                    return action.payload.categories.includes(product.category)
                })
                /*.filter(product => (product.price >= action.payload.min) && (action.payload.max > product.price));*/
        }
    }
});

export const {
    productsFetching,
    productsFetchSuccess,
    productsFetchError,
    productsFilter,
} = productsSlice.actions;

export default productsSlice.reducer;