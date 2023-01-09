import { useSearchParams } from 'react-router-dom';
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
  const [searchParams, setSearchParams] = useSearchParams();

  const changeViewFunc = (str: string) => {
    dispatch(changeView(str));
    let updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set('view', `${str}`);
    setSearchParams(updatedSearchParams.toString());
  }

  return (
    <div className="catalog__view">
        <button className={`btn catalog-switcher ${active === 'normal' ? 'active' : ''}`} onClick={()=>{changeViewFunc ('normal')}}><ChangeTile1 /></button>
        <button className={`btn catalog-switcher ${active === 'big' ? 'active' : ''}`} onClick={()=>{changeViewFunc ('big')}}><ChangeTile2 /></button>
    </div>
  )
};