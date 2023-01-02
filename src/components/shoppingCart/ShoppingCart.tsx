import './shoppingCart.css'
import cart from './img/cart.png'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/reducer'
import { getMemoizedNumItems } from '../../store/cartSlice'

interface ICart {
  styleCart: string
}

export function ShoppingCart({styleCart} : ICart) {
  const numItems = useAppSelector(getMemoizedNumItems);

  return (
    <Link to='/' className={`small-cart ${styleCart}`}>
      <img src={cart} alt="cart"/>
      <span>{numItems ? numItems : '0'}</span>
    </Link>
  )
}
