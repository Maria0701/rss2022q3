import React, { useEffect} from "react"
import { useAppDispatch, useAppSelector } from '../../hooks/reducer';
import { getMemoizedBrands } from "../../store/productsSlice";
import { FiltersInput } from './FiltersInput';


interface IFiltersFieldset {
  eltClass: string,
}

export function FiltersFieldsetBrands({eltClass}: IFiltersFieldset) {

  const brands = useAppSelector(state => state.filter.filterCategories)
  const brandsInitial = useAppSelector(getMemoizedBrands);
  

  const isFiltered = (category: string):boolean => {
    return brands.includes(category) ? true : false;
  }

  return (
    <>

      <div className={`filter__fieldset ${eltClass}`}>
          <p className="filters__name">Brands</p>
          <div className="filters__wrapper">
            { brandsInitial.map(category => (<FiltersInput eltClass={''} category={category} key={category} checked={isFiltered(category)} />)) }
          </div>
      </div>
    </>
  )
};
