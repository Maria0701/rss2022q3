import { getHighestAndLowest } from '../../hooks/get-lowest-and-highest';
import { ICategories, IProductCard } from '../../models/models';
import './filters.css'
import { FiltersFieldset } from './Filtersfieldset';
import { FiltersSlider } from './FiltersSlider';

interface IFiltersElt {
  eltClass: string;
  categories: ICategories[];
  products: IProductCard[];
}

export function Filters({eltClass, categories, products}: IFiltersElt) {
  const minmax = getHighestAndLowest(products);
  return (
    <div className={`filter ${eltClass}`}>
      {<FiltersFieldset eltClass='' categories={categories}/>}
      {<FiltersSlider  eltClass='' minmax={minmax} />}
    </div>
  )
};
