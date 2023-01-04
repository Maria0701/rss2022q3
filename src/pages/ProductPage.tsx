import React, { useEffect} from "react"
import { useParams } from "react-router-dom";
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
  

    return (
    <div className="container">
      { loading && <p>Application is loading</p> }
      { error && <p>Something went wrong</p>}
      <h1>{product.title}</h1>
    </div>
    );
};