import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IFilterState {
    filterCategories: string[],
    minPrice: number,
    maxPrice: number,
};


const initialState: IFilterState = {
    filterCategories: [],
    minPrice: 0,
    maxPrice: 0,
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
        clearFilter(state) {
            state.filterCategories = [];
            state.minPrice = 0;
            state.maxPrice = 0;
        }
    }
});

export const {changeMinPrice, changeMaxPrice, changeCategoriesArr, clearFilter} = filterSlice.actions;
export default filterSlice.reducer;
