import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IModalState2 {
    isHidden2: boolean,
    count: number,
    title: string,
    price: number
}


const initialState: IModalState2 = {
    isHidden2: false,
    count: 0,
    title: '',
    price: 0
};


export const modalSlice2 = createSlice ({
    name: 'modal2',
    initialState: initialState,
    reducers: {
        showModal2(state, action: PayloadAction<IModalState2>) {
            state.isHidden2 = action.payload.isHidden2;
            state.count = action.payload.count
            state.title = action.payload.title;
            state.price = action.payload.price;
        },
        hideModal2(state, action: PayloadAction<{isHidden2: boolean}>) {
            state.isHidden2 = action.payload.isHidden2;
        },
    },
});


export const {showModal2, hideModal2} = modalSlice2.actions;

export default modalSlice2.reducer;