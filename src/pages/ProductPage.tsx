import React from "react"
import { useParams } from "react-router-dom";

export function ProductPage() {
  const params = useParams<'id'>();

    return (
    <div className="container">
      <h1>Product {params.id}</h1>
    </div>
    );
};