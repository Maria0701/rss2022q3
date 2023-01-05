import { createSlice, PayloadAction, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { getHighestAndLowest } from '../hooks/get-lowest-and-highest';
import { IProductCard } from '../models/models'
import { baseURL } from './productsActions';
import { RootState } from './store';

interface ProductsState {
    loading: boolean;
    error: string;
    products: IProductCard[];
    filteredProducts: IProductCard[];
    initialProducts: IProductCard[];
    numOfProds: number;
}

const initialState: ProductsState = {
    loading: false,
    error: '',
    products: [],
    filteredProducts:[],
    initialProducts: [],
    numOfProds: 0,
};

export const fetchProductsThunk = createAsyncThunk(
    'products/fetchproducts',
    async ({limit, skip}: {limit: number, skip:number}, thunkAPI) => {
        //const state = thunkAPI.getState() as RootState;
        try {
            const response = await fetch(`${baseURL}products?limit=${limit}&skip=${skip}&select=title,price,thumbnail,price,rating,id,brand,category`)
            .then(res => res.json());
            return response;
        } catch (err) {
            return err;
        }
        
    }
)

export const fetchProductsThunkPerPage = createAsyncThunk(
    'products/fetchproducts/paginate',
    async ({limit, skip}: {limit: number, skip:number}, thunkAPI) => {
        //const state = thunkAPI.getState() as RootState;
        try {
            const response = await fetch(`${baseURL}products?limit=${limit}&skip=${skip}&select=title,price,thumbnail,price,rating,id,brand,category`)
            .then(res => res.json());
            return response;
        } catch (err) {
            return err;
        }
        
    }
)

export const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        filterByPrice(state, action: PayloadAction<{min: number, max: number, cats: string[]}>) {
            if (action.payload.cats.length > 0) {
                state.products = state.filteredProducts.filter(item => action.payload.min < item.price && action.payload.max > item.price && action.payload.cats.includes(item.category));
            } else {
                state.products = state.filteredProducts.filter(item => action.payload.min < item.price && action.payload.max > item.price);
            }
        },
        sortProducts(state, action: PayloadAction<string>) {
            if (action.payload === 'cheap') {
                state.products = state.products.sort((a, b) => a.price - b.price);
                state.filteredProducts = [...state.initialProducts].sort((a, b) => a.price - b.price);
            }
            if (action.payload === 'expensive') {
                state.products = state.products.sort((a, b) => b.price - a.price);
                state.filteredProducts = [...state.initialProducts].sort((a, b) => b.price - a.price);
            }
            if (action.payload === 'az') {
                state.products = state.products.sort((a, b) => a.title.localeCompare(b.title));
                state.filteredProducts = [...state.initialProducts].sort((a, b) => a.title.localeCompare(b.title));
            }
            if (action.payload === 'za') {
                state.products = state.products.sort((a, b) => b.title.localeCompare(a.title));
                state.filteredProducts = [...state.initialProducts].sort((a, b) => b.title.localeCompare(a.title));
            }
            if (action.payload === 'default') {
                state.products = state.initialProducts;
            }
        }
    }, extraReducers: (builder) => {
       builder
        .addCase(fetchProductsThunk.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(fetchProductsThunk.fulfilled, (state, action:PayloadAction<{products:IProductCard[], total: number}>) => {
            state.products = action.payload.products;
            state.filteredProducts = action.payload.products;
            state.initialProducts = action.payload.products;
            state.numOfProds = action.payload.total;
            state.loading = false;
            state.error = '';
        })
        .addCase(fetchProductsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = 'Error';
        })
        .addCase(fetchProductsThunkPerPage.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(fetchProductsThunkPerPage.fulfilled, (state, action:PayloadAction<{products:IProductCard[], total: number}>) => {
            state.products = action.payload.products;
            state.loading = false;
            state.error = '';
        })
        .addCase(fetchProductsThunkPerPage.rejected, (state, action) => {
            state.loading = false;
            state.error = 'Error';
        })
    }
});


export const {filterByPrice, sortProducts} = productsSlice.actions;

export default productsSlice.reducer;

export function getMinMax(state: RootState) {
    return getHighestAndLowest(state.products.initialProducts);
}

export const getMemoizedMinMax = createSelector(
    (state: RootState) => state.products.initialProducts,
    (initialProducts) => getHighestAndLowest(initialProducts)
);
