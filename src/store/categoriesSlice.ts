import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { baseURL } from './productsActions';

interface CategoriesState {
    loading: boolean;
    error: string;
    categories: string[];
}

const initialState: CategoriesState = {
    loading: false,
    error: '',
    categories: [],
    
};

export const fetchCategoriesThunk = createAsyncThunk(
    'products/fetchcategories',
    async () => {
        try {
            const response = await fetch(`${baseURL}products/categories`)
            .then(res => res.json());
            return response;
        } catch (err) {
            return err;
        }
    }
)

export const CategoriesSlice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers: {
        
    }, extraReducers: (builder) => {
        builder
         .addCase(fetchCategoriesThunk.pending, (state) => {
             state.loading = true;
             state.error = '';
         })
         .addCase(fetchCategoriesThunk.fulfilled, (state, action:PayloadAction<string[]>) => {
             state.categories = action.payload;
             state.loading = false;
             state.error = '';
         })
         .addCase(fetchCategoriesThunk.rejected, (state) => {
             state.loading = false;
             state.error = 'Error';
         })
    }
});



export default CategoriesSlice.reducer;