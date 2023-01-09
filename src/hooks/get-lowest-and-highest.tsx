import { IProductCard } from "../models/models";
interface IMinMax {
    min: number;
    max: number;
};

export function getHighestAndLowest(arr:IProductCard[]):IMinMax {
    if (arr.length === 0) {return {
        min: 0,
        max: 0,
    }}
    const arrPrices = arr.map(item => item.price || 0);
    return {
        min: Math.min(...arrPrices),
        max: Math.max(...arrPrices),
    };
};

export function getHighestAndLowestAv(arr:IProductCard[]):IMinMax {
    if (arr.length === 0) {return {
        min: 0,
        max: 0,
    }}
    const arrPrices = arr.map(item => item.stock || 0);
    return {
        min: Math.min(...arrPrices),
        max: Math.max(...arrPrices),
    };
};

export function getBrands(arr:IProductCard[]):string[] {
    return Array.from(new Set(arr.map(item => item.brand)));
}


export const skip = (curr:number, perPage: number) => {
    return (curr - 1) * perPage;
}