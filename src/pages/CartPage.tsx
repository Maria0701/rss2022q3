import React, { useEffect, useState } from "react";
import { H1Elt } from "../components/h1/H1";
import { useAppSelector } from "../hooks/reducer";

export function CartPage() {
    const products = useAppSelector((state) => state.products.products);
    const items = useAppSelector((state) => state.cart.items);

    return (
        <>
            <div className="container cart__container">
                <H1Elt eltClass="catalog__h1" />
                <table className="cart__table">
                    <thead>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>remove</th>
                    </thead>
                    <tbody>
                        {
                            items.map(({id, quantity}) =>(
                                <tr key={id}>
                                    <td>{products[id].title}</td>
                                    <td>{quantity}</td>
                                    <td>{quantity * products[id].price}</td>
                                    <td><button>x</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}