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
            const response = await fetch(`${baseURL}products?limit=${limit}&skip=${skip}&select=title,price,thumbnail,rating,id,brand,category`)
            .then(res => res.json());
            return response;
        } catch (err) {
            return err;
        }
        
    }
)

const filterItems = (items:IProductCard[], direction:string): IProductCard[] => {
    let res:IProductCard[] = [];
    switch(direction) {
        case 'cheap':
            res = [...items].sort((a, b) => a.price - b.price);
            break;
        case 'expensive':
            res =  [...items].sort((a, b) => b.price - a.price);
            break;
        case 'az':
            res = [...items].sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'za':
            res = [...items].sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 'default':
            res =  [...items];
            break;
        case '':
            res =  [...items];
            break;
    }

    return res
}

export const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        filterByPrice(state, action: PayloadAction<{min: number, max: number, cats: string[], direction: string}>) {
            if (action.payload.cats.length > 0) {
                state.filteredProducts = filterItems(state.initialProducts.filter(item => action.payload.min < item.price && action.payload.max > item.price && action.payload.cats.includes(item.category)), action.payload.direction);
            } else {
                state.filteredProducts = filterItems(state.initialProducts.filter(item => action.payload.min < item.price && action.payload.max > item.price), action.payload.direction);
            }
            state.numOfProds = state.filteredProducts.length;
        },
        paginateFiltered(state, action: PayloadAction<{limit: number, skip: number}>) {
            state.products = [...state.filteredProducts].slice(action.payload.limit, action.payload.skip);
        }
    }, extraReducers: (builder) => {
       builder
        .addCase(fetchProductsThunk.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(fetchProductsThunk.fulfilled, (state, action:PayloadAction<{products:IProductCard[], total: number}>) => {
            state.products = action.payload.products;
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


export const {filterByPrice, paginateFiltered} = productsSlice.actions;

export default productsSlice.reducer;

export function getMinMax(state: RootState) {
    return getHighestAndLowest(state.products.initialProducts);
}

export const getMemoizedMinMax = createSelector(
    (state: RootState) => state.products.initialProducts,
    (initialProducts) => getHighestAndLowest(initialProducts)
);
