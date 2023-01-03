import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { IProductCard } from '../models/models'
import { baseURL } from './productsActions';

interface ProductsState {
    loading: boolean;
    error: string;
    products: IProductCard[];
    filteredProducts: IProductCard[];
    initialProducts: IProductCard[];
}

const initialState: ProductsState = {
    loading: false,
    error: '',
    products: [],
    filteredProducts:[],
    initialProducts: [],
};

export const fetchProductsThunk = createAsyncThunk(
    'products/fetchproducts',
    async () => {
        try {
            const response = await fetch(`${baseURL }products`)
            .then(res => res.json());
            return response.products;
        } catch (err) {
            return err;
        }
        
    }
)

export const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        filterByCategories(state, action:PayloadAction<string[]>) {
            if (action.payload.length !== 0) {
                state.products = state.filteredProducts.filter(item => action.payload.includes(item.category))
            } else {
                state.products = state.filteredProducts;
            }
        },
        filterByPrice(state, action: PayloadAction<{min: number, max: number}>) {
            state.products = state.products.filter(item => action.payload.min < item.price && action.payload.max > item.price);
            state.filteredProducts = state.products.filter(item => action.payload.min < item.price && action.payload.max > item.price);
        }
    }, extraReducers: (builder) => {
       builder
        .addCase(fetchProductsThunk.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(fetchProductsThunk.fulfilled, (state, action:PayloadAction<IProductCard[]>) => {
            state.products = action.payload;
            state.filteredProducts = action.payload;
            state.initialProducts = action.payload;
            state.loading = false;
            state.error = '';
        })
        .addCase(fetchProductsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = 'Error';
        })
    }
});


export const {filterByCategories, filterByPrice} = productsSlice.actions;

export default productsSlice.reducer;

