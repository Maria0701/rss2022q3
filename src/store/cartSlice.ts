import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store";

interface CartItem {
    id: number,
    quantity: number,
}

export interface CartState {
    items: CartItem[]
}

const initialState:CartState ={
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<{id: number, count: number}>) {
            const id = action.payload.id;
            const count = action.payload.count;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += count;
            } else {
                state.items.push({
                    id: id,
                    quantity: count,
                })
            }
        }
    }
});

export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer;

export function getNumItems(state: RootState) {
    return state.cart.items.reduce((res, curr) => res + curr.quantity, 0)
}

export const getMemoizedNumItems = createSelector(
    (state: RootState) => state.cart.items,
    (items) => items.reduce((res, curr) => res + curr.quantity, 0)
)