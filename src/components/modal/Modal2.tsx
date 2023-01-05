import { useEffect, useRef } from "react"
import './modal.css';
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from "../../hooks/reducer";
import { hideModal2 } from "../../store/modalSlice2";
import {KEY_NAME_ESC, SHOP_CURRENCY } from "../../jsons/links";
import { Btn } from "../btns/btn";



export function Modal2 () {
  const dispatch = useAppDispatch();
  const hideModalHandler = () => dispatch(hideModal2({isHidden2: false}));
  const modalEl = useRef<HTMLElement>(null);
  const count = useAppSelector((state) => state.modal2.count);
  const title = useAppSelector((state) => state.modal2.title)
  const price = useAppSelector((state) => state.modal2.price);
  const isModalOpened = useAppSelector((state) => state.modal2.isHidden2);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
        if (isModalOpened && modalEl.current && !modalEl.current.contains(e.target as HTMLElement)) {
            hideModalHandler();
        }
    };
    
    const close = (e: KeyboardEvent) => {
        if(e.key === KEY_NAME_ESC) {
            hideModalHandler()
        }
    };

    document.addEventListener("mousedown", checkIfClickedOutside)
    window.addEventListener('keydown', close);

    return () => {
        document.removeEventListener("mousedown", checkIfClickedOutside)
        window.removeEventListener('keydown', close);
    };
}, []);

  return (
    <div className="popup-overlay">
        <section className="popup"  ref={modalEl}>
            <div className="popup__wrapper">
                <button className="btn popup__close" onClick={hideModalHandler}>x</button>
                <div className="popup__head">Added to the cart</div>
                <div className="popup__content">
                    <div className="popup__name">{title}</div>
                    <span>x</span>
                    <div className="popup__number">{count}</div>
                    <span>=</span>
                    <div className="popup__total">{count*price} {SHOP_CURRENCY}</div>
                </div>
                <div className="popup__btns">
                    <Btn btnText="Continue shopping" onClick={hideModalHandler} eltClass=''/>
                    <Link to='/cart' className={`btn btn--main`} onClick={hideModalHandler}>Proceed to Checkout</Link>
                </div>
            </div>
        </section>
    </div>
  )
};

