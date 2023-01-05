import { useEffect } from "react"
import './modal.css';
import './short-prod.css';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reducer";
import { hideModal } from "../../store/modalSlice";
import { fetchSingleProduct } from "../../store/productSlice";
import { AddProductToCart } from "../addProductToCart/AddProductToCart";
import { CATEGORIES, SHOP_CURRENCY } from "../../jsons/links";

export function Modal () {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();  
  //const loading = useAppSelector((state) => state.product.loading);
  //const error = useAppSelector((state) => state.product.error);
  const product = useAppSelector((state) => state.product.product);
  const prodId = useAppSelector((state) => state.modal.prodId);
  const cartItems = useAppSelector((state) => state.cart.items);
  const hideModalHandler = () => dispatch(hideModal({isHidden: false, id: 0}));

    useEffect (() => {
        if (prodId !== 0) {
            dispatch(fetchSingleProduct(prodId));
        }
    }, [prodId, dispatch]);

    const getCartText = cartItems.length > 0 && cartItems.find((item) => item.id === product.id) ? 'In Cart' : 'Add to Cart';
    const clickHandler = () => {
        navigate(`products/${product.id}`);
        hideModalHandler();
    }
 //console.log(product)

  return (
    <div className="popup-overlay">
        <section className="popup">
            <div className="popup__wrapper">
                <button className="btn popup__close" onClick={hideModalHandler}>
                    x
                </button>
                <div className="short-prod-wrap">
                    <div className="short-prod">
                        <div className="short-prod__gallery">
                            <div className="short-prod__img">
                                {product.images.map((img, id) => (
                                    <div key={id}><img src={img} alt={product.title}/></div>
                                ))}
                            </div>
                        </div>
                        <div className="short-prod__content">
                            <p className="short-prod__brand">{product.brand}</p>
                            <p className="short-prod__name">{product.title}</p>
                            <p className="short-prod__category">{CATEGORIES[product.category]}</p>
                            <p className="short-prod__info">
                                {product.rating}
                            </p>
                            <div className="short-prod__rates">
                                <p className="short-prod__price">{product.price} {SHOP_CURRENCY}</p>
                                <p className="short-prod__discount">{product.discountPercentage}%</p>
                            </div>
                            <AddProductToCart id={product.id} text={getCartText} title={product.title} price={product.price}/>
                            <div className="short-prod__description">{product.description}</div>
                            <p className="short-prod__more" onClick={clickHandler}>MORE...</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
};
