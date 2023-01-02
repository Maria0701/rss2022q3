import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store";

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

export function getNumItems(state: RootState) {
    let numItems = 0;

    for (let id in state.cart.items) {
        numItems += state.cart.items[id];
    }
    return numItems;
}

export const getMemoizedNumItems = createSelector(
    (state: RootState) => state.cart.items,
    (items) => {
        let numItems = 0;

        for (let id in items) {
            numItems += items[id];
        }
        return numItems;
    }
)