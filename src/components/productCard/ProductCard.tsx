import { useState } from "react"
import { IProductCard } from "../../models/models"
import './productCard.css'

interface IProductProps {
  product: IProductCard[]
}

export function ProductCard ({product}: IProductProps) {
  const [details, setDetails] = useState(false)

  const btnClassName = details ? "add-yellow": "add-blue"
  const btnClasses = ["btn-class", btnClassName]

  return (
    <div>
      {
        product.map((el) => (
          <div className="card">
            <img src={el.image} alt={el.title} className="card-image"/>
            <p>{el.title}</p>
            <span className="font-bold">{el.price}$</span>
            <button
            className= {btnClasses.join(' ')}
            onClick = {() => setDetails(prev => !prev)}
            >
                {details ? 'Hide details': "Show details"}
            </button>
            { details && <div>
                <p>{el.description}</p>
                <p>Rate: <span style={{fontWeight: "bold"}}>{el.rating.rate}</span></p>
            </div>}
          </div>
        ))
      }
    </div>
  )
}
