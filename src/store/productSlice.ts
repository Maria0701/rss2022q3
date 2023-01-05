import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISingleProduct } from "../models/models";
import { baseURL } from "./productsActions";

interface IProductState {
    loading: boolean,
    error: string,
    product: ISingleProduct,
}


const initialState: IProductState= {
    loading: false,
    error: '',
    product: {
        id: 0,
        title: '',
        description: '',
        price: 0,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        brand: '',
        category: '',
        thumbnail: '',
        images: [],
    },
};

export const fetchSingleProduct = createAsyncThunk(
    'products/fetchproduct',
    async (id: number) => {
        //const state = thunkAPI.getState() as RootState;
        try {
            const response = await fetch(`${baseURL}products/${id}`)
            .then(res => res.json());
            return response;
        } catch (err) {
            return err;
        }
        
    }
)


export const productSlice = createSlice ({
    name: 'products',
    initialState: initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
         .addCase(fetchSingleProduct.pending, (state) => {
             state.loading = true;
             state.error = '';
         })
         .addCase(fetchSingleProduct.fulfilled, (state, action:PayloadAction<ISingleProduct>) => {
             state.product = action.payload;
             state.loading = false;
             state.error = '';
         })
         .addCase(fetchSingleProduct.rejected, (state, action) => {
             state.loading = false;
             state.error = 'Error';
         })
    }
});

export default productSlice.reducer;