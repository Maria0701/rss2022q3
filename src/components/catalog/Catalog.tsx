import { PRODUCTS } from "../../jsons/links"
import { ProductCard } from "../productCard/ProductCard"



export function Catalog () {
  return (
    <div>
      <ProductCard product={PRODUCTS}/>
    </div>
  )
}
