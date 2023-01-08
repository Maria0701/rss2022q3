import { useAppDispatch } from '../../hooks/reducer';


interface IChangeStateSwitcher {
  eltClass: string,
}

export function ChangeStateSwitcher({eltClass}: IChangeStateSwitcher) {
  const dispatch = useAppDispatch();


  return (
    <div className="catalog__view">
        <button className="btn catalog-switcher" data-src="4rows"></button>
        <button className="btn catalog-switcher" data-src="2rows"></button>
    </div>
  )
};