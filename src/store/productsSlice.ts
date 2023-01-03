import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { IProductCard } from '../models/models'
import { baseURL } from './productsActions';

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

    }, extraReducers: (builder) => {
       builder
        .addCase(fetchProductsThunk.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(fetchProductsThunk.fulfilled, (state, action:PayloadAction<IProductCard[]>) => {
            state.products = action.payload;
            state.loading = false;
            state.error = '';
        })
        .addCase(fetchProductsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = 'Error';
        })
    }
});


export default productsSlice.reducer;