import { useState } from "react"
import './addProductToCart.css';
import './productCard.css';
import { IProductCard } from "../../models/models";
import { Btn } from "../btns/btn";
import { addToCart } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { CountOfProduct } from "../countOfProduct/CountOfProduct";
import { useAppDispatch, useAppSelector } from "../../hooks/reducer";
import { showModal } from "../../store/modalSlice";

interface IProductProps {
  product: IProductCard
}

export function ProductCard ({product}: IProductProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.items);

  const clickHandler = () => navigate(`products/${product.id}`)

  const [count, setCount] = useState(1)

  const decreaseCount = (): void => {
    setCount((el) => el > 0 ? el -= 1 : 0)
  };

  const increaseCount = (): void => {
    setCount((el) => el += 1)
  };

  const getCartText = cartItems.length > 0 && cartItems.find((item) => item.id === product.id) ? 'In Cart' : 'Add to Cart';

  const detailedCardHandler = (evt: React.MouseEvent<HTMLButtonElement>, id:number) => {
    dispatch(showModal({isHidden: true, id: id}));
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
        <Btn eltClass='product-card__btn' onClick={(evt) => detailedCardHandler(evt, product.id)} btnText={"Show details"}/>
      </div>
      <div className="product__actions">
        <CountOfProduct count={count} decreaseCount={decreaseCount} increaseCount={increaseCount}/>
        <Btn eltClass='btn__addToCart' btnText={getCartText} isDisabled={isDisabled} onClick={() => dispatch(addToCart({id: product.id, count: count}))}/>
      </div>
    </div>

  )
};

