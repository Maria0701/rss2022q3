import { AppDispatch } from './store';
import {productsFetching,
    productsFetchSuccess,
    productsFetchError
} from './productsSlice';

const baseURL = 'https://dummyjson.com/';

export const fetchProducts = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(productsFetching())
            const response = await fetch(`${baseURL}products`)
                .then(res => res.json());
            dispatch(productsFetchSuccess(response.products))
        } catch (e) {
            productsFetchError(e as Error)
        } 
    }
}