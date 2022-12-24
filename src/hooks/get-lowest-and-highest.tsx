import { IProductCard } from "../models/models";
interface IMinMax {
    min: number;
    max: number;
};

export function getHighestAndLowest(arr:IProductCard[]):IMinMax {
    const arrPrices = arr.map(item => item.price);
    return {
        min: Math.min(...arrPrices),
        max: Math.max(...arrPrices),
    };
};