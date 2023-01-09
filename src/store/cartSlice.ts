import { createSelector, createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState} from "./store";
import { checkout } from "../jsons/fakes";

export interface ICartItem {
    id: number,
    quantity: number,
    price: number,
}

export interface CartState {
    items: ICartItem[],
    checkoutState: CheckoutState,
    errorMessage: string,
}


export const checkoutThunk = createAsyncThunk('cart/checkout', 
    async(_, thunkAPI) =>{
        const state = thunkAPI.getState() as RootState;
        const items = state.cart.items;
        const response = await checkout(items);
        return response;
    }
)

const initialState:CartState ={
    items: [],
    checkoutState: 'Ready',
    errorMessage: '',
}

type CheckoutState = 'Loading' | 'Ready' | 'error';

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<{id: number, count: number, price: number}>) {
            const id = action.payload.id;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += action.payload.count;
            } else {
                state.items.push({
                    id: id,
                    quantity: action.payload.count,
                    price: action.payload.price,
                })
            }
        },
        removeFromCard(state, action:PayloadAction<number>) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateQuantity(state, action: PayloadAction<{id: number, quantity: number}>) {
            const {id, quantity} = action.payload;
            state.items.find(item => item.id === id)!.quantity = quantity;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkoutThunk.pending, (state) => {
                state.checkoutState = 'Loading';
                return
            })
            .addCase(checkoutThunk.fulfilled, (state, action: PayloadAction<{success: boolean}>) => {
                const {success} = action.payload;
                if (success) {
                    state.checkoutState = 'Ready';
                    state.items = [];
                } else {
                    state.checkoutState = 'error';
                }
            })
            .addCase(checkoutThunk.rejected, (state, action) => {
                state.checkoutState = 'error';
                state.errorMessage = action.error.message || '';
            })
    },
});


export const {addToCart, removeFromCard, updateQuantity} = cartSlice.actions;
export default cartSlice.reducer;

export function getNumItems(state: RootState) {
    return state.cart.items.reduce((res, curr) => res + curr.quantity, 0)
};

export const getMemoizedNumItems = createSelector(
    (state: RootState) => state.cart.items,
    (items) => items.reduce((res, curr) => res + curr.quantity, 0)
);

export const getTotalPrice = createSelector(
    (state: RootState) => state.cart.items,
    (state: RootState) => state.products.initialProducts,
    (items, initialProducts) => items.reduce((result, current) => result + current.quantity*current.price, 0).toFixed(2),
)