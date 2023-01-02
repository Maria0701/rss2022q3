import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface CartState {
    items: {
        [productID: string]: number
    }
}

const initialState:CartState ={
    items: {}
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<{id: number, count: number}>) {
            const id = action.payload.id;
            const count = action.payload.count;
            if (state.items[id]) {
                state.items[id] += count;
            } else {
                state.items[id] = count;
            }
        }
    }
});

export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer;