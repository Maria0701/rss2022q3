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
  image: string,
  rating: {
      rate: number,
      count: number
  }
}

export interface IProduct {
  [x: string]: any;
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

export interface ICategories {
  products: string[];
  _id: string;
  name: string;
  slug: string;
}
