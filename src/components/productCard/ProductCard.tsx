import { useState } from "react"
import { IProductCard } from "../../models/models"
import './productCard.css'

interface IProductProps {
  product: IProductCard
}

export function ProductCard ({product}: IProductProps) {
  const [details, setDetails] = useState(false)

  const btnClassName = details ? "add-yellow": "add-blue"
  const btnClasses = ["btn-class", btnClassName]

  return (
    <div>
      {
          <div className="card">
            <img src={product.image} alt={product.title} className="card-image"/>
            <p>{product.title}</p>
            <span className="font-bold">{product.price}$</span>
            <button
            className= {btnClasses.join(' ')}
            onClick = {() => setDetails(prev => !prev)}
            >
                {details ? 'Hide details': "Show details"}
            </button>
            { details && <div>
                <p>{product.description}</p>
                <p>Rate: <span style={{fontWeight: "bold"}}>{product.rating.rate}</span></p>
            </div>}
          </div>
      }
    </div>
  )
}
