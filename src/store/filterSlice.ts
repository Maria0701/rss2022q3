import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFilterState {
    filterCategories: string[],
    minPrice: number,
    maxPrice: number,
    sorting: string,
    isFiltered: boolean,
};


const initialState: IFilterState = {
    filterCategories: [],
    minPrice: 0,
    maxPrice: 0,
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
        changeSorting(state, action:PayloadAction<string>) {
            state.sorting = action.payload;
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

export const {changeMinPrice, changeMaxPrice, changeCategoriesArr, clearFilter, changeSorting, setFiltered} = filterSlice.actions;
export default filterSlice.reducer;
