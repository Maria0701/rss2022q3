import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDebounce } from "../../hooks/deboubce";
import { getHighestAndLowest } from "../../hooks/get-lowest-and-highest";
import { IProductCard } from "../../models/models";

interface IFiltersSlider {
    eltClass: string;
    products: IProductCard[];
    onChange?: Function

}

export function FiltersSlider({eltClass, products}: IFiltersSlider) {
    const {min, max} = getHighestAndLowest(products);
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef<HTMLDivElement>(null);

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
    }, [minVal, getPercent]);

    // max val
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    /*useEffect(() => {
        onChange({min: minVal, max: maxVal});
    }, [minVal,maxVal, onChange])*/


    return (
      <div className="filter__fieldset">
        <p className="filters__name">Цена</p>
        <div className="filters__wrapper">
            <div className="filter__prices">
                <label>
                    <input 
                        className="filter__prices-input" 
                        value={minVal}
                        type="number" 
                        name="min-rate"
                        onChange={(evt) => {
                            const value = Math.min(Number(evt.target.value), maxVal - 1);
                            setMinVal(value);
                            minValRef.current = value;
                        }}
                         />
                </label>
                <label>
                    <input 
                        className="filter__prices-input" 
                        value={maxVal}
                        type="number" 
                        name="max-rate"
                        onChange={(evt) => {
                            console.log(Number(evt.target.value));
                            const value = Number(evt.target.value) > max ? max : Math.max(Number(evt.target.value), minVal + 1);
                            setMaxVal(value);
                            maxValRef.current = value;
                        }}
                        />
                </label>
                <div className="filter__range">
                    <input 
                        type="range"
                        min={min}
                        max={max}
                        value={minVal}
                        onChange={(event) => {
                            const value = Math.min(Number(event.target.value), maxVal - 1);
                            setMinVal(value);
                            minValRef.current = value;
                        }}
                        className="range__handle"
                        //style={{ zIndex: minVal > max - 100 && "5" }}
                    />
                    <input 
                        type="range"
                        min={min}
                        max={max}
                        value={maxVal}
                        onChange={(event) => {
                            const value = Math.max(Number(event.target.value), minVal + 1);
                            setMaxVal(value);
                            maxValRef.current = value;
                          }}
                        className="range__handle"
                    />
                    <div className="range__slider">
                        <div className="range__slider-track" />
                        <div ref={range} className="range__slider-range" />
                        <div className="range__left-val">{minVal}</div>
                        <div className="range__right-val">{maxVal}</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
 };