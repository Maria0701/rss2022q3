import { useState } from "react"
import { IProductCard } from "../../models/models"
import { Btn } from "../btns/btn"
import './productCard.css'
import { AddProductToCart } from "../addProductToCart/AddProductToCart"

interface IProductProps {
  product: IProductCard
}

export function ProductCard ({product}: IProductProps) {
  const [details, setDetails] = useState(false)
  const btnClassName = details ? "add-yellow product-card__btn ": "product-card__btn";
  return (
    <div className="product-card">
      <div className="product-card__img">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-card__content">
        <div className="product-card__rating">Rate: <span >{product.rating.rate}</span></div>
        <p  className="product-card__name">{product.title}</p>
        <span className="product-card__price">{product.price}$</span>
        <Btn eltClass={btnClassName} onClick={() => setDetails(prev => !prev)} btnText={details ? 'Hide details': "Show details"}/>
      </div>
      { details && 
        <div className="product-card__description">
            <div>{product.description}</div>
        </div>
      }
      <AddProductToCart/>
    </div>

  )
};

