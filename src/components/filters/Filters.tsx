import { useEffect, useState} from "react";
import { useAppDispatch, useAppSelector } from '../../hooks/reducer';
import { FiltersFieldset } from './Filtersfieldset';
import { FiltersSlider } from './FiltersSlider';
import './filters.css'
import React from 'react';
import { Btn } from '../btns/btn';
import { clearFilter, setFiltered } from '../../store/filterSlice';
import { filterByPrice, getMemoizedMinMax, getMemoizedMinMaxAv, paginateFiltered } from "../../store/productsSlice";
import { changePage} from "../../store/paginationSlice";
import { skip } from "../../hooks/get-lowest-and-highest";
import { FiltersSliderAvail } from "./FiltersSliderAvailability";
import { IMinMax } from "../../models/models";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { FiltersFieldsetBrands } from "./FiltersfieldsetBrands";


interface IFiltersElt {
  eltClass: string;
}

export function Filters({eltClass}: IFiltersElt) {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const isFiltered = useAppSelector((state) => state.filter.isFiltered);
  const cats = useAppSelector(state => state.filter.filterCategories);
  const direction = useAppSelector((state) => state.filter.sorting);
  const filteredMin = useAppSelector(state => state.filter.minPrice);
  const filteredMax = useAppSelector(state => state.filter.maxPrice);
  const filteredAvMin = useAppSelector((state) => state.filter.minAvailable);
  const filteredAvMax = useAppSelector((state) => state.filter.maxAvailable);
  const currentPageStored = useAppSelector((state) => state.pagination.currentPage);
  const postsPerPageStored = useAppSelector((state) => state.pagination.goodsPerPage);
  const pricesStarted = useAppSelector(getMemoizedMinMax);
  const availabilityStarted = useAppSelector(getMemoizedMinMaxAv);
  const {min, max} = pricesStarted;
  const minAv = availabilityStarted.min;
  const maxAv = availabilityStarted.max;

  useEffect(() => {
    const toSkip = skip(currentPageStored, postsPerPageStored);

    if (cats.length > 0 || filteredMax !== max || filteredMin !== min || filteredAvMax !== maxAv || filteredAvMin !== minAv || direction !== 'default') {
      dispatch(setFiltered(true));
    } else {
      dispatch(setFiltered(false));
    }

    dispatch(filterByPrice({min:filteredMin, max: filteredMax, minAv: filteredAvMin,  maxAv: filteredAvMax, cats: cats, direction: direction}));
    
    /*dispatch(changePage(1));*/

    dispatch(paginateFiltered ({limit: 0, skip: postsPerPageStored + toSkip}));
    
  }, [filteredMin, filteredMax, cats, direction, filteredAvMin, filteredAvMax]);


  const clearFilterHandler = (event: React.MouseEvent) => {
    dispatch(clearFilter())
  };

  return (
    <div className={`filter ${eltClass}`}>
      {<FiltersFieldset eltClass=''  />}
      {<FiltersFieldsetBrands eltClass=''  />}
      {<FiltersSlider  eltClass='' startInfo={pricesStarted} name={`Price`}/>}
      {<FiltersSliderAvail  eltClass='' startInfo={availabilityStarted} name={`Stock`}/>}
      { isFiltered && <Btn eltClass={'clear__filter'}
        onClick={clearFilterHandler} btnText={'Clear Filter'}/>}
    </div>
  )
};
