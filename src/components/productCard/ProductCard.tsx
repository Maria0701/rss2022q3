import { useState } from "react"
import './addProductToCart.css';
import './productCard.css';
import { IProductCard } from "../../models/models";
import { Btn } from "../btns/btn";
import { addToCart } from "../../store/cartSlice";
// import { AddProductToCart } from "../addProductToCart/AddProductToCart"
import { useNavigate } from "react-router-dom";
import { CountOfProduct } from "../countOfProduct/CountOfProduct";
import { useAppDispatch } from "../../hooks/reducer";

interface IProductProps {
  product: IProductCard
}

export function ProductCard ({product}: IProductProps) {
  const dispatch = useAppDispatch();
  const [details, setDetails] = useState(false)
  const navigate = useNavigate()
  const btnClassName = details ? "add-yellow product-card__btn ": "product-card__btn";

  const clickHandler = () => navigate(`products/${product.id}`)

  const [count, setCount] = useState(1)

  const decreaseCount = (): void => {
    setCount((el) => el > 0 ? el -= 1 : 0)
  };

  const increaseCount = (): void => {
    setCount((el) => el += 1)
  };

  const isDisabled:boolean = count ? false : true;

  return (
    <div className="product-card" data-id={product.id}>
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
      <div className="product__actions">
        <CountOfProduct count={count} decreaseCount={decreaseCount} increaseCount={increaseCount}/>
        <Btn eltClass='btn__addToCart' btnText='В корзину' isDisabled={isDisabled} onClick={() => dispatch(addToCart({id: product.id, count: count}))}/>
      </div>
    </div>

  )
};

