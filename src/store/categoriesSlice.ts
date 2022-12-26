import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

export const CategoriesSlice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers: {
        categoriesFetching(state) {
            state.loading = true
        },
        categoriesFetchSuccess(state, action: PayloadAction<string[]>) {
            state.error = '';
            state.loading = false;
            state.categories = action.payload
        },
        categoriesFetchError(state, action: PayloadAction<Error>) {
            state.loading = false;
            state.error = action.payload.message;
        }
    }
});

export const {
    categoriesFetching,
    categoriesFetchSuccess,
    categoriesFetchError
} = CategoriesSlice.actions;

export default CategoriesSlice.reducer;