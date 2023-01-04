import { useEffect } from "react"
import './modal.css';
import { Btn } from "../btns/btn";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reducer";
import { hideModal } from "../../store/modalSlice";
import { fetchSingleProduct } from "../../store/productSlice";

export function Modal () {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const hideModalHandler = () => dispatch(hideModal(false));
  const loading = useAppSelector((state) => state.product.loading);
  const error = useAppSelector((state) => state.product.error);
  const product = useAppSelector((state) => state.product.product)
  const prodId = useAppSelector((state) => state.modal.prodId)

  useEffect (() => {
    if (prodId !== 0) {
        dispatch(fetchSingleProduct(prodId));
    }
  }, [prodId]);
   
 

  return (
    <div className="popup-overlay">
        <section className="popup">
            <div className="popup__wrapper">
                <button className="btn popup__close" onClick={hideModalHandler}>
                    x
                </button>
                <div className="popup__head">
                    <p className="popup__name"></p>
                </div>
                <div>{product.title}</div>
            </div>
        </section>
    </div>
  )
};

