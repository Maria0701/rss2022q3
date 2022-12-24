import { useState } from "react"
import { IProductCard } from "../../models/models"
import { Btn } from "../btns/btn"
import './productCard.css'
import { AddProductToCart } from "../addProductToCart/AddProductToCart"
import { useNavigate } from "react-router-dom"

interface IProductProps {
  product: IProductCard
}

export function ProductCard ({product}: IProductProps) {
  const [details, setDetails] = useState(false)
  const navigate = useNavigate()
  const btnClassName = details ? "add-yellow product-card__btn ": "product-card__btn";

  const clickHandler = () => navigate(`products/${product.id}`)

  return (
    <div className="product-card">
      <div className="product-card__img" onClick={clickHandler}>
        <img src={product.images[0]} alt={product.title} />
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

