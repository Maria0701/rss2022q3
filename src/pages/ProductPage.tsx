import React, { useEffect} from "react"
import { useParams } from "react-router-dom";
import { H1Elt } from "../components/h1/H1";
import { useAppDispatch, useAppSelector } from "../hooks/reducer";
import { fetchSingleProduct } from "../store/productSlice";

export function ProductPage() {
  const dispatch = useAppDispatch()
  const params = useParams<'id'>();

  const loading = useAppSelector((state) => state.product.loading);
  const error = useAppSelector((state) => state.product.error);
  const product = useAppSelector((state) => state.product.product)

  useEffect (() => {
    dispatch(fetchSingleProduct(Number(params.id)));
  }, [dispatch]);
  
  console.log(product);

    return (
    <div className="container">
      { loading && <p>Application is loading</p> }
      { error && <p>Something went wrong</p>}
      <H1Elt eltClass="product__h1" text={product.title} />
    </div>
    );
};