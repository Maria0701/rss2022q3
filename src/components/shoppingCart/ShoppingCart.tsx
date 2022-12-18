import './shoppingCart.css'
import cart from './img/cart.png'
import { Link } from 'react-router-dom'

interface ICart {
  styleCart: string
}

export function ShoppingCart({styleCart} : ICart) {
  return (
    <Link to='/' className={`small-cart ${styleCart}`}>
      <img src={cart} alt="cart"/>
    </Link>
  )
}
