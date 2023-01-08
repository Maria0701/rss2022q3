import './addProductToCart.css'
import { CountOfProduct } from '../countOfProduct/CountOfProduct'
import { Btn } from '../btns/btn'
import { useState } from 'react'
import { addToCart } from '../../store/cartSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/reducer'
import { showModal2 } from '../../store/modalSlice2'

interface IAddToCart {
  id: number,
  text: string,
  title: string,
  price: number,
  stock: number,
}

export function AddProductToCart ({id, text, title, price, stock}: IAddToCart) {
  const dispatch = useAppDispatch();
  const [count, setCount] = useState(1)

  const decreaseCount = (): void => {
    setCount((el) => el > 0 ? el -= 1 : 0)
  };

  const increaseCount = (): void => {
    setCount((el) => el >= stock ? el += 1 : stock)
  };

  const onClick= () => {
    dispatch(addToCart({id: id, count: count, price: price}));
    dispatch(showModal2({isHidden2: true, count: count, title: title, price: price}));
  }

  const isDisabled:boolean = count ? false : true;
  const styleBtn = 'btn__addToCart';

  return (
    <div className="product__actions">
      <CountOfProduct count={count} decreaseCount={decreaseCount} increaseCount={increaseCount}/>
      <Btn eltClass={styleBtn} btnText={text} isDisabled={isDisabled} onClick={onClick}/>
    </div>
  )
}
