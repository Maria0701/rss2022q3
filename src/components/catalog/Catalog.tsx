import './catalog-block.css'

interface ICatalogBlock {
  eltClass: string
}

export function Catalog({eltClass}: ICatalogBlock) {
  return (
    <div className={`catalog-block ${eltClass}`}>Catalog</div>
  )
};
