import { useEffect, useState} from "react";
import { useAppDispatch, useAppSelector } from '../../hooks/reducer';
import { FiltersFieldset } from './Filtersfieldset';
import { FiltersSlider } from './FiltersSlider';
import './filters.css'
import React from 'react';
import { Btn } from '../btns/btn';
import { clearFilter, setFiltered } from '../../store/filterSlice';
import { filterByPrice, getMemoizedMinMax, paginateFiltered } from "../../store/productsSlice";
import { changePage} from "../../store/paginationSlice";
import { skip } from "../../hooks/get-lowest-and-highest";


interface IFiltersElt {
  eltClass: string;
}

export function Filters({eltClass}: IFiltersElt) {
  const dispatch = useAppDispatch();
  const isFiltered = useAppSelector((state) => state.filter.isFiltered);
  const cats = useAppSelector(state => state.filter.filterCategories);
  const direction = useAppSelector((state) => state.filter.sorting);
  const filteredMin = useAppSelector(state => state.filter.minPrice);
  const filteredMax = useAppSelector(state => state.filter.maxPrice);
  const currentPageStored = useAppSelector((state) => state.pagination.currentPage);
  const postsPerPageStored = useAppSelector((state) => state.pagination.goodsPerPage);
  const {min, max} = useAppSelector(getMemoizedMinMax);

  useEffect(() => {
    const toSkip = skip(currentPageStored, postsPerPageStored);

    if (cats.length > 0 || filteredMax !== max || filteredMin !== min || direction !== 'default') {
      dispatch(setFiltered(true));
    } else {
      dispatch(setFiltered(false));
    }

    dispatch(filterByPrice({min:filteredMin, max: filteredMax, cats: cats, direction: direction}));
    
    dispatch(changePage(1));

    dispatch(paginateFiltered ({limit: 0, skip: postsPerPageStored + toSkip}));
  }, [filteredMin, filteredMax, cats, direction]);


  const clearFilterHandler = (event: React.MouseEvent) => {
    dispatch(clearFilter())
  };

  return (
    <div className={`filter ${eltClass}`}>
      {<FiltersFieldset eltClass=''  />}
      {<FiltersSlider  eltClass='' />}
      { isFiltered && <Btn eltClass={'clear__filter'}
        onClick={clearFilterHandler} btnText={'Clear Filter'}/>}
    </div>
  )
};
