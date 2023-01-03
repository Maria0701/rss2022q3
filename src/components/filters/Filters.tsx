import { useAppDispatch, useAppSelector } from '../../hooks/reducer';
import {IMinMax} from '../../models/models';
import { FiltersFieldset } from './Filtersfieldset';
import { FiltersSlider } from './FiltersSlider';
import './filters.css'
import React from 'react';
import { Btn } from '../btns/btn';


interface IFiltersElt {
  eltClass: string;
}

export function Filters({eltClass}: IFiltersElt) {
  const dispatch = useAppDispatch()
  
  const getMinMax = (changedMinMax: IMinMax) => {
  
  };


  let hasFilter = true;


  
  const clearFilter = (event: React.MouseEvent) => {

  };



  return (
    <div className={`filter ${eltClass}`}>
      {<FiltersFieldset eltClass=''  />}
      {<FiltersSlider  eltClass='' onFChange={getMinMax}/>}
      { hasFilter && <Btn eltClass={'clear__filter'}
        onClick={clearFilter} btnText={'Clear Filter'}/>}
    </div>
  )
};
