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
  images: string[],
  rating: {
      rate: number,
      count: number
  }
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