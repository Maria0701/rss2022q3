import React, { useEffect, useState} from "react"
import { useParams } from "react-router-dom";
import { AddProductToCart } from "../components/addProductToCart/AddProductToCart";
import { Rating } from "../components/stars/stars";
import { useAppDispatch, useAppSelector } from "../hooks/reducer";
import { fetchSingleProduct } from "../store/productSlice";
import './product.css';
import { ImageSlider } from "../components/imageSlider/imageSlider";



export function ProductPage() {
  const dispatch = useAppDispatch()
  const params = useParams<'id'>();

  const loading = useAppSelector((state) => state.product.loading);
  const error = useAppSelector((state) => state.product.error);
  const product = useAppSelector((state) => state.product.product)



  useEffect (() => {
    dispatch(fetchSingleProduct(Number(params.id)));
  }, [dispatch, params]);

    return (
    <div className="container product">
      { loading && <p>Application is loading</p> }
      { error && <p>Something went wrong</p>}
      <div className="product__slider">
        <ImageSlider images={product.images} />
      </div>
      <div  className="product__content">
        <h2>{product.title}</h2>
        <h4>{product.category}</h4>
        <Rating rating={product.rating}/>
        <h3>{product.price}$</h3>
        <AddProductToCart id={product.id} text='add to cart' title={product.title} price={product.price} stock={product.stock}/>
        <p>{product.description}</p>
      </div>
    </div>
    );
};
