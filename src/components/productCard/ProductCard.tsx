import './addProductToCart.css';
import './productCard.css';
import { IProductCard } from "../../models/models";
import { Btn } from "../btns/btn";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reducer";
import { showModal } from "../../store/modalSlice";
import { AddProductToCart } from "../addProductToCart/AddProductToCart";
import { SHOP_CURRENCY } from "../../jsons/links";

interface IProductProps {
  product: IProductCard
}

export function ProductCard ({product}: IProductProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.items);

  const clickHandler = () => navigate(`products/${product.id}`);

  const getCartText = cartItems.length > 0 && cartItems.find((item) => item.id === product.id) ? 'In Cart' : 'Add to Cart';

  const detailedCardHandler = (evt: React.MouseEvent<HTMLButtonElement>, id:number) => {
    dispatch(showModal({isHidden: true, id: id}));
  };


  return (
    <div className="product-card" data-id={product.id}>
      <div className="product-card__img" onClick={clickHandler}>
        <img src={product.thumbnail} alt={product.title} />
      </div>
      <div className="product-card__content">
        <div className="product-card__rating">Rate: <span >{product.rating}</span></div>
        <p  className="product-card__name">{product.title}</p>
        <span className="product-card__price">{product.price} {SHOP_CURRENCY}</span>
        <Btn eltClass='product-card__btn' onClick={(evt) => detailedCardHandler(evt, product.id)} btnText={"Show details"}/>
      </div>
      <AddProductToCart id={product.id} text={getCartText} title={product.title} price={product.price}/>
    </div>

  )
};

