import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFilterState {
    filterCategories: string[],
    minPrice: number,
    maxPrice: number,
    sorting: string,
    isFiltered: boolean,
    minAvailable: number,
    maxAvailable: number,
    brands: string[],
};


const initialState: IFilterState = {
    filterCategories: [],
    brands: [],
    minPrice: 0,
    maxPrice: 0,
    minAvailable: 0,
    maxAvailable: 0,
    sorting: 'default',
    isFiltered: false,
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        changeMinPrice(state, action: PayloadAction<number>) {
            state.minPrice = action.payload;
        },
        changeMaxPrice(state, action: PayloadAction<number>) {
            state.maxPrice = action.payload;
        },
        changeCategoriesArr(state, action:PayloadAction<string>) {
            const category = action.payload;
            if (state.filterCategories.includes(category)) {
                state.filterCategories = state.filterCategories.filter(item => item !== category);
            } else {
                state.filterCategories.push(category);
            }
        },
        changeBrands(state, action:PayloadAction<string>) {
            const brand = action.payload;
            if (state.brands.includes(brand)) {
                state.brands = state.filterCategories.filter(item => item !== brand);
            } else {
                state.brands.push(brand);
            }
        },
        changeSorting(state, action:PayloadAction<string>) {
            state.sorting = action.payload;
        },
        changeMinAvailable(state, action:PayloadAction<number>) {
            state.minAvailable = action.payload
        },
        changeMaxAvailable(state, action:PayloadAction<number>) {
            state.maxAvailable = action.payload
        },
        setFiltered(state, action:PayloadAction<boolean>) {
            state.isFiltered = action.payload;
        },
        clearFilter(state) {
            state.filterCategories = [];
            state.minPrice = 0;
            state.maxPrice = 0;
        }
    }
});

export const {changeMinAvailable, changeMaxAvailable, changeMinPrice, changeMaxPrice, changeCategoriesArr, clearFilter, changeSorting, setFiltered} = filterSlice.actions;
export default filterSlice.reducer;
