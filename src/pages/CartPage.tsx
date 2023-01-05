import React from "react";
import { CountOfProduct } from "../components/countOfProduct/CountOfProduct";
import { H1Elt } from "../components/h1/H1";
import { useAppSelector, useAppDispatch } from "../hooks/reducer";
import { getTotalPrice, removeFromCard, updateQuantity, checkoutThunk } from "../store/cartSlice";
import './cart-page.css'

export function CartPage() {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.products.initialProducts);
    const items = useAppSelector((state) => state.cart.items);
    const errorMessage = useAppSelector(state => state.cart.errorMessage);

    const totalPrice = useAppSelector(getTotalPrice);
    const checkoutState = useAppSelector(state => state.cart.checkoutState)
    const removeFromCardFn = (id:number) => dispatch(removeFromCard(id));


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
                <H1Elt eltClass="catalog__h1" text='Cart'/>
                <table className={`cart__table ${checkoutState}`}>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map(({id, quantity}) =>(
                                <tr key={id}>
                                    <td>{products[id].title}</td>
                                    <td>{products[id].price}</td>
                                    <td><input 
                                        type="number" 
                                        defaultValue={quantity} 
                                        name="quantity"
                                        className="product__count cart__count"
                                        onBlur={(e) => quantityChangeHandler(e, id)}
                                        /></td>
                                    <td>{quantity * products[id].price}</td>
                                    <td><button className="btn cart__btn" onClick={() => removeFromCardFn(id)}>x</button></td>
                                </tr>
                            ))
                        }
                        <tr>
                            <td colSpan={2}></td>
                            <td className="cart__total" colSpan={2}>Total: {totalPrice}</td>
                        </tr>
                    </tbody>
                </table>
                <form className="cart__form" onSubmit={checkoutHandler}>
                    {checkoutState === 'error' && errorMessage ? <p>{errorMessage}</p> : null}
                    <button className="btn btn--main" type='submit'>Checkout</button>
                </form>
            </div>
        </>
    )
}