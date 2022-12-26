import { IProductCard } from "../models/models";
interface IMinMax {
    min: number;
    max: number;
};

export function getHighestAndLowest(arr:IProductCard[]):IMinMax {
    console.log(arr);
    if (arr.length === 0) {return {
        min: 0,
        max: 0,
    }}
    const arrPrices = arr.map(item => item.price || 0);
    console.log({min: Math.min(...arrPrices),
    max: Math.max(...arrPrices)},'function')
    return {
        min: Math.min(...arrPrices),
        max: Math.max(...arrPrices),
    };
};