export interface ILinks {
    name: string
    link: string
    img: string
}

export interface IBread {
    name: string
    link: string
}

export interface IProductCard{
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  thumbnail: string,
  rating: number,
  brand: string,
}

export interface ISingleProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ServerResponse<T> {
  limit: number;
  products: T[];
  skip: number;
  total: number;
}

export interface IMinMax {
  min:number, 
  max: number
};

export interface IFilter {
  categories: string[],
  min: number,
  max: number,
}