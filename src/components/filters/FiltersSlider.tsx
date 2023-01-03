import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDebounce } from "../../hooks/deboubce";
import { useAppDispatch, useAppSelector } from "../../hooks/reducer";
import { changeMaxPrice, changeMinPrice } from "../../store/filterSlice";
import { filterByPrice, getMemoizedMinMax, getMinMax } from "../../store/productsSlice";

interface IFiltersSlider {
    eltClass: string;
    onFChange?: Function
}

export function FiltersSlider({eltClass}: IFiltersSlider) {
    const dispatch = useAppDispatch();

    const cats = useAppSelector(state => state.filter.filterCategories);
    const filteredMin = useAppSelector(state => state.filter.minPrice);
    const filteredMax = useAppSelector(state => state.filter.maxPrice);
    
    const {min, max} = useAppSelector(getMemoizedMinMax);
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const [minInputVal, setMinInputVal] = useState(min)
    const [maxInputVal, setMaxInputVal] = useState(max)
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef<HTMLDivElement>(null);
    const debouncedMax = useDebounce(maxInputVal, 400);
    const debouncedMin = useDebounce(minInputVal, 400);

    useEffect(() => {
        setMinVal(min);
        setMaxVal(max);
        setMinInputVal(min);
        setMaxInputVal(max);
        dispatch(changeMinPrice(min));
        dispatch(changeMaxPrice(max));
    }, [min, max]);

    useEffect(() => {
        if (filteredMin === 0 && filteredMax === 0){
            setMinInputVal(min);
            setMaxInputVal(max);
        }
    }, [filteredMin, filteredMax])

    // перевод в проценты
    const getPercent = useCallback(
        (value:number) => Math.round(((value - min)/(max - min)) * 100),
        [min, max]
    );

    // min val
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }

        dispatch(filterByPrice({min:minVal, max: maxValRef.current, cats: cats}))
    }, [minVal, getPercent]);

    // max val
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }

        dispatch(filterByPrice({min:minValRef.current, max: maxVal, cats: cats}))
    }, [maxVal, getPercent]);

    // input min change 
     useEffect(() => {
        const value = Math.min(Number(minInputVal), maxVal) < min 
            ? min 
            : Math.min(Number(minInputVal), maxVal);
        setMinVal(value);
        minValRef.current = value;
        setMinInputVal(value);
    }, [debouncedMin]);


    useEffect(() => {
        const value = Math.max(Number(maxInputVal), minVal + 1) > max 
            ? max 
            : Math.max(Number(maxInputVal), minVal + 1);
        setMaxVal(value);
        maxValRef.current = value;
        setMaxInputVal(value);
    }, [debouncedMax])

    const minValHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(evt.target.value), maxVal - 1);
        setMinVal(value);
        setMinInputVal(value)
        minValRef.current = value;
        dispatch(changeMinPrice(value));
    };

    const maxValHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(evt.target.value), minVal + 1);
        setMaxInputVal(value)
        setMaxVal(value);
        maxValRef.current = value;
        dispatch(changeMaxPrice(value));
    };

    return (
      <div className="filter__fieldset">
        <p className="filters__name">Цена</p>
        <div className="filters__wrapper">
            <div className="filter__prices">
                <label>
                    <input 
                        className="filter__prices-input" 
                        value={minInputVal}
                        type="number" 
                        name="min-rate"
                        onChange={(evt) => setMinInputVal(Number(evt.target.value))}
                         />
                </label>
                <label>
                    <input 
                        className="filter__prices-input" 
                        value={maxInputVal}
                        type="number" 
                        name="max-rate"
                        onChange={(evt) => setMaxInputVal(Number(evt.target.value))}
                        />
                </label>
                <div className="filter__range">
                    <input 
                        type="range"
                        min={min}
                        max={max}
                        value={minVal}
                        onChange={(event) => minValHandler(event)}
                        className="range__handle"
                    />
                    <input 
                        type="range"
                        min={min}
                        max={max}
                        value={maxVal}
                        onChange={(evt) => maxValHandler(evt)}
                        className="range__handle"
                    />
                    <div className="range__slider">
                        <div className="range__slider-track" />
                        <div ref={range} className="range__slider-range" />
                        <div className="range__left-val">{min}</div>
                        <div className="range__right-val">{max}</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
 };