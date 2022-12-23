
import './catalog-block.css'
import { ProductCard } from "../productCard/ProductCard"
import { IProductCard } from '../../models/models';

interface ICatalogBlock {
  eltClass: string;
  products: IProductCard[]
};

export function Catalog({eltClass, products}: ICatalogBlock) {
  return (
    <div className={`catalog-block ${eltClass}`}>
      {
        products?.map((product) => (
          <ProductCard product={product} key={product.id}/>
        ))
      }
    </div>
  )
};


