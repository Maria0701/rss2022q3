import { useAppDispatch, useAppSelector } from '../../hooks/reducer';
import { changeView } from '../../store/productsSlice';
import { ChangeTile1 } from './change-tile1';
import { ChangeTile2 } from './change-tile2';


interface IChangeState {
  eltClass: string,
  active: string,
}

export function ChangeState({eltClass, active}: IChangeState) {
  const dispatch = useAppDispatch();
  

  return (
    <div className="catalog__view">
        <button className={`btn catalog-switcher ${active === 'normal' ? 'active' : ''}`} onClick={()=>{dispatch(changeView('normal'))}}><ChangeTile1 /></button>
        <button className={`btn catalog-switcher ${active === 'big' ? 'active' : ''}`} onClick={()=>{dispatch(changeView('big'))}}><ChangeTile2 /></button>
    </div>
  )
};