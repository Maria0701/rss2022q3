import { AppDispatch } from './store';
import {productsFetching,
    productsFetchSuccess,
    productsFetchError
} from './productsSlice';

export const baseURL = 'https://dummyjson.com/';

export const fetchProducts = (limit = 10, skip = 0) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(productsFetching())
            const response = await fetch(`${baseURL}products?limit=${limit}&skip=${skip}`)
                .then(res => res.json());
            dispatch(productsFetchSuccess(response.products))
        } catch (e) {
            productsFetchError(e as Error)
        } 
    }
}

export const searchProducts = (searchRequest: string) => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(productsFetching())
            const response = await fetch(`${baseURL}products/search?q=${searchRequest}`)
                .then(res => res.json());
            dispatch(productsFetchSuccess(response.products))
        } catch (e) {
            productsFetchError(e as Error)
        } 
    }
}