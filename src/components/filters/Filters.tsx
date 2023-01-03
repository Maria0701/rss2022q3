import { useAppDispatch, useAppSelector } from '../../hooks/reducer';
import { IFilter, IMinMax} from '../../models/models';
import { FiltersFieldset } from './Filtersfieldset';
import { FiltersSlider } from './FiltersSlider';
import './filters.css'
import React, { useState } from 'react';
import { Btn } from '../btns/btn';


interface IFiltersElt {
  eltClass: string;
}

export function Filters({eltClass}: IFiltersElt) {
  const dispatch = useAppDispatch()
  const {categories, loading, error} = useAppSelector(state => state.categories);

  const getMinMax = (changedMinMax: IMinMax) => {
  
  };


  let hasFilter = true;
  /*const hasFilter = () => {
    return filter.categories.length > 0 || filter.minmax.min > minmax.min || filter.minmax.max < minmax.max;
  }*/

  
  const clearFilter = (event: React.MouseEvent) => {

  };



  return (
    <div className={`filter ${eltClass}`}>
      {loading && <p>Filter is Loading</p>}
      {error && <p>Something went wrong</p>}
      {<FiltersFieldset eltClass='' categories={categories} />}
      {<FiltersSlider  eltClass='' onFChange={getMinMax}/>}
      { hasFilter && <Btn eltClass={'clear__filter'}
        onClick={clearFilter} btnText={'Clear Filter'}/>}
    </div>
  )
};
