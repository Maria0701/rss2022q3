import React, { useEffect, useState} from "react"
import { useParams } from "react-router-dom";
import { AddProductToCart } from "../components/addProductToCart/AddProductToCart";
import { Rating } from "../components/stars/stars";
import { useAppDispatch, useAppSelector } from "../hooks/reducer";
import { fetchSingleProduct } from "../store/productSlice";
import left from "../image/left.png"
import right from "../image/right.png"



export function ProductPage() {
  const dispatch = useAppDispatch()
  const params = useParams<'id'>();

  const loading = useAppSelector((state) => state.product.loading);
  const error = useAppSelector((state) => state.product.error);
  const product = useAppSelector((state) => state.product.product)

  let [index, setIndex] = useState(0)

  useEffect (() => {
    dispatch(fetchSingleProduct(Number(params.id)));
  }, [dispatch]);

  function nextHandler () {
    if (index <= product.images.length -2){
      setIndex(prev => prev + 1)
    } else {
      setIndex(0)
    }
  }

  function prevHandler () {
    if (index === 0){
      setIndex(product.images.length -1)
    } else {
      setIndex(prev => prev -1)
    }
  }
  console.log(index);
  
  console.log(product);

    return (
    <div className="container" style={{display: "flex"}}>
      { loading && <p>Application is loading</p> }
      { error && <p>Something went wrong</p>}
      <div>
        <img src={product.images[index]} alt="img" style={{width: "400px", height: "250px", borderRadius: "10px"}}/>
        <div style={{display: "flex", justifyContent: "center"}}>
          <img src={left} alt="prev" style={{width: '40px'}} onClick={prevHandler} />
          <img src={right} alt="prev" style={{width: '40px'}} onClick={nextHandler} />
        </div>
        <AddProductToCart id={product.id} text='add to cart' title={product.title} price={product.price}/>
      </div>
      <div style={{marginLeft: "30px"}}>
        <h2>{product.title}</h2>
        <h4>{product.category}</h4>
        <Rating rating={product.rating}/>
        <h3>{product.price}$</h3>
        <p>{product.description}</p>
      </div>
    </div>
    );
};
