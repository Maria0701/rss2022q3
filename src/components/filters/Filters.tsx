import { useAppDispatch, useAppSelector } from '../../hooks/reducer';
import { IFilter, IMinMax} from '../../models/models';
import { FiltersFieldset } from './Filtersfieldset';
import { FiltersSlider } from './FiltersSlider';
import './filters.css'
import React, { useEffect, useState } from 'react';
import { Btn } from '../btns/btn';
import productsSlice, { productsFilter } from '../../store/productsSlice';

interface IFiltersElt {
  eltClass: string;
  minmax: IMinMax;
}

export function Filters({eltClass, minmax}: IFiltersElt) {
  const dispatch = useAppDispatch()
  const {categories, loading, error} = useAppSelector(state => state.categories);
  
  const [filter, setFilter] = useState<IFilter>({
    categories: [],
    min: {...minmax}.min,
    max: {...minmax}.max,
  });

  const getMinMax = (changedMinMax: IMinMax) => {
    console.log(changedMinMax, 'change')
    /*setFilter((prev) => ({
      ...prev,
      min: changedMinMax.min,
      max: changedMinMax.max
    }));*/
  };


  let hasFilter = true;
  /*const hasFilter = () => {
    return filter.categories.length > 0 || filter.minmax.min > minmax.min || filter.minmax.max < minmax.max;
  }*/

  useEffect(() => {
    dispatch(productsFilter(filter));
    console.log(filter.min, filter.max);
  }, [filter.min, filter.max, categories])

  const clearFilter = (event: React.MouseEvent) => {
    setFilter({
      categories: [],
      min: {...minmax}.min,
      max: {...minmax}.max,
    });
  };



  return (
    <div className={`filter ${eltClass}`}>
      {loading && <p>Filter is Loading</p>}
      {error && <p>Something went wrong</p>}
      {<FiltersFieldset eltClass='' categories={categories} />}
      {<FiltersSlider  eltClass='' minmax={minmax} onFChange={getMinMax}/>}
      { hasFilter && <Btn eltClass={'clear__filter'}
        onClick={clearFilter} btnText={'Clear Filter'}/>}
    </div>
  )
};
