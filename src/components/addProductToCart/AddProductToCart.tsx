import './addProductToCart.css'
import { CountOfProduct } from '../countOfProduct/CountOfProduct'
import { Btn } from '../btns/btn'
import { useState } from 'react'

export function AddProductToCart () {
  const [count, setCount] = useState(1)

  const decreaseCount = (): void => {
    setCount((el) => el > 0 ? el -= 1 : 0)
  }

  const increaseCount = (): void => {
    setCount((el) => el += 1)
  }
  const blockBtn = count ? '' : "blockBtn"
  const styleBtn = ['btn__addToCart', blockBtn]
  return (
    <div className="productToCart">
      <CountOfProduct count = {count} decreaseCount = {decreaseCount} increaseCount ={increaseCount}/>
      <Btn eltClass={styleBtn.join(' ')} btnText='В корзину' />
    </div>
  )
}
