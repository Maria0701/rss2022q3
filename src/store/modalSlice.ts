import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISingleProduct } from "../models/models";

interface IModalState {
    isHidden: boolean,
    prodId: number,
}


const initialState: IModalState = {
    isHidden: false,
    prodId: 0,
};


export const modalSlice = createSlice ({
    name: 'modal',
    initialState: initialState,
    reducers: {
        showModal(state, action: PayloadAction<{isHidden: boolean, id: number}>) {
            state.isHidden = action.payload.isHidden;
            state.prodId = action.payload.id;
        },
        hideModal(state, action: PayloadAction<boolean>)  {
            state.isHidden = action.payload;
            state.prodId = 0;
        },
    },
});


export const {showModal, hideModal} = modalSlice.actions;

export default modalSlice.reducer;