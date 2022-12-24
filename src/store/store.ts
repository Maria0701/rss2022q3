import { configureStore, combineReducers } from '@reduxjs/toolkit'
import productsReducer from './productsSlice'

const rootReducer = combineReducers({
    products: productsReducer
});

export function setupStore() {
    return configureStore({
        reducer: rootReducer
    })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']