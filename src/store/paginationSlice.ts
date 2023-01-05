import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface PaginationState {
    currentPage: number,
    totalPages: number,
    goodsPerPage: number
}

const initialState:PaginationState = {
    currentPage: 1,
    totalPages: 1,
    goodsPerPage: 15,
}


const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        changePage(state, action:PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        changeNumberOfPages(state, action:PayloadAction<number>) {
            state.totalPages = action.payload;
        },
        changeGoodsPerPage(state, action: PayloadAction<number>) {
            state.goodsPerPage = action.payload;
        }
    }
});

export const {changePage, changeNumberOfPages, changeGoodsPerPage} = paginationSlice.actions;
export default paginationSlice.reducer;

export function getSkipped(state: RootState) {
    console.log((state.pagination.currentPage - 1) * state.pagination.goodsPerPage);
    return (state.pagination.currentPage - 1) * state.pagination.goodsPerPage;
};