import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import categoriesReducer from './categoriesSlice';
import cartReducer from './cartSlice';
import filterReducer from './filterSlice';
import paginationReducer from './paginationSlice';

const rootReducer = combineReducers({
    products: productsReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    filter: filterReducer,
    pagination: paginationReducer,
});

export function setupStore() {
    return configureStore({
        reducer: rootReducer
    })
};


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']