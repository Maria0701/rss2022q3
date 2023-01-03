import { useEffect, useState} from "react";
import { useAppDispatch, useAppSelector } from '../../hooks/reducer';
import {IMinMax} from '../../models/models';
import { FiltersFieldset } from './Filtersfieldset';
import { FiltersSlider } from './FiltersSlider';
import './filters.css'
import React from 'react';
import { Btn } from '../btns/btn';
import { clearFilter } from '../../store/filterSlice';
import { getMemoizedMinMax } from "../../store/productsSlice";


interface IFiltersElt {
  eltClass: string;
}

export function Filters({eltClass}: IFiltersElt) {
  const [hasFilter, setWasFiltered] = useState(false);
  const dispatch = useAppDispatch();
  const cats = useAppSelector(state => state.filter.filterCategories);
  const filteredMin = useAppSelector(state => state.filter.minPrice);
  const filteredMax = useAppSelector(state => state.filter.maxPrice);
  const {min, max} = useAppSelector(getMemoizedMinMax);

  useEffect(() => {
    if (cats.length > 0 || filteredMax !== max || filteredMin !== min) {
      setWasFiltered(true)
    } else {
      setWasFiltered(false)
    }
  }, [filteredMin, filteredMax, cats]);


  const clearFilterHandler = (event: React.MouseEvent) => {
    dispatch(clearFilter())
  };

  return (
    <div className={`filter ${eltClass}`}>
      {<FiltersFieldset eltClass=''  />}
      {<FiltersSlider  eltClass='' />}
      { hasFilter && <Btn eltClass={'clear__filter'}
        onClick={clearFilterHandler} btnText={'Clear Filter'}/>}
    </div>
  )
};
