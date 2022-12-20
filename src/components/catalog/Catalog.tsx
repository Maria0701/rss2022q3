
import './catalog-block.css'
import { PRODUCTS } from "../../jsons/links"
import { ProductCard } from "../productCard/ProductCard"

interface ICatalogBlock {
  eltClass: string
};

export function Catalog({eltClass}: ICatalogBlock) {
  return (
    <div className={`catalog-block ${eltClass}`}>
      {
        PRODUCTS?.map((product, id) => (
          <ProductCard product={product} key={product.id}/>
        ))
      }
      
      </div>
  )
};


