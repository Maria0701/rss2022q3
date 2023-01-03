import React from "react";
import { H1Elt } from "../components/h1/H1";
import { useAppSelector, useAppDispatch } from "../hooks/reducer";
import { getTotalPrice, removeFromCard, updateQuantity, checkoutThunk } from "../store/cartSlice";

export function CartPage() {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.products.products);
    const items = useAppSelector((state) => state.cart.items);
    const errorMessage = useAppSelector(state => state.cart.errorMessage);
    
    const totalPrice = useAppSelector(getTotalPrice);
    const checkoutState = useAppSelector(state => state.cart.checkoutState)
    const removeFromCardFn = (id:number) => dispatch(removeFromCard(id))
    const quantityChangeHandler = (e: React.FocusEvent<HTMLInputElement>, id: number) => {
        const quantity = Number(e.target.value) || 0;
        dispatch(updateQuantity({id, quantity}));
    }


    function checkoutHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatch(checkoutThunk());
    }

    return (
        <>
            <div className="container cart__container">
                <H1Elt eltClass="catalog__h1" />
                <table className={`cart__table ${checkoutState}`}>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map(({id, quantity}) =>(
                                <tr key={id}>
                                    <td>{products[id].title}</td>
                                    <td><input 
                                        type="number" 
                                        defaultValue={quantity} 
                                        name="quantity"
                                        onBlur={(e) => quantityChangeHandler(e, id)}
                                        /></td>
                                    <td>{quantity * products[id].price}</td>
                                    <td><button onClick={() => removeFromCardFn(id)}>x</button></td>
                                </tr>
                            ))
                        }
                        <tr>
                            <td rowSpan={4}>Total: {totalPrice}</td>
                        </tr>
                    </tbody>
                </table>
                <form onSubmit={checkoutHandler}>
                    {checkoutState === 'error' && errorMessage ? <p>{errorMessage}</p> : null}
                    <button type='submit'>Checkout</button>
                </form>
            </div>
        </>
    )
}