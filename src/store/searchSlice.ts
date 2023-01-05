import { createSlice, PayloadAction, createAsyncThunk, } from '@reduxjs/toolkit'
import { ISearchProduct } from '../models/models'
import { baseURL } from './productsActions';

interface searchState {
    loading: boolean;
    error: string;
    searched: ISearchProduct[];
    totalSearched: number;
}

const initialState: searchState = {
    loading: false,
    error: '',
    searched: [],
    totalSearched: 0,
};

export const searchProducts = createAsyncThunk(
    'products/fetchsearched',
    async (request: string) => {
        try {
            const response = await fetch(`${baseURL}products/search?q=${request}&select=title,price,id`)
            .then(res => res.json());
            return response;
        } catch (err) {
            return err;
        }
        
    }
)


export const searchSlice = createSlice({
    name: 'search',
    initialState: initialState,
    reducers: {
    }, extraReducers: (builder) => {
       builder
        .addCase(searchProducts.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(searchProducts.fulfilled, (state, action:PayloadAction<{products:ISearchProduct[], total: number}>) => {
            state.searched = action.payload.products;
            state.totalSearched = action.payload.total;
            state.loading = false;
            state.error = '';
        })
        .addCase(searchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = 'Error';
        })
    }
});

export default searchSlice.reducer;