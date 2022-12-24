import { AppDispatch } from './store';
import {categoriesFetching,
    categoriesFetchSuccess,
    categoriesFetchError
} from './categoriesSlice';

const baseURL = 'https://dummyjson.com/';

export const fetchCategories = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(categoriesFetching())
            const response = await fetch(`${baseURL}products/categories`)
                .then(res => res.json());
            dispatch(categoriesFetchSuccess(response))
        } catch (e) {
            categoriesFetchError(e as Error)
        } 
    }
}

