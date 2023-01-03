import React, { useEffect} from "react"
import { useAppDispatch, useAppSelector } from '../../hooks/reducer';
import { fetchCategoriesThunk } from '../../store/categoriesSlice';
import { FiltersInput } from './FiltersInput';


interface IFiltersFieldset {
  eltClass: string,
}

export function FiltersFieldset({eltClass}: IFiltersFieldset) {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(state => state.categories.categories);
  const loading = useAppSelector(state => state.categories.loading);
  const error = useAppSelector(state => state.categories.error);
  const filterCategories = useAppSelector(state => state.filter.filterCategories)
  
  useEffect(() => {
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  const isFiltered = (category: string):boolean => {
    return filterCategories.includes(category) ? true : false;
  }

  return (
    <>
      { loading && <p>Applcation is loading</p> }
      { error && <p>Something went wrong</p>}

      <div className={`filter__fieldset ${eltClass}`}>
          <p className="filters__name">Категории</p>
          <div className="filters__wrapper">
            { categories.map(category => (<FiltersInput eltClass={''} category={category} key={category} checked={isFiltered(category)} />)) }
          </div>
      </div>
    </>
  )
};
