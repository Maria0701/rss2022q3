import { getHighestAndLowest } from '../../hooks/get-lowest-and-highest';
import { ICategories, IMinMax, IProductCard } from '../../models/models';
import './filters.css'
import { FiltersFieldset } from './Filtersfieldset';
import { FiltersSlider } from './FiltersSlider';

interface IFiltersElt {
  eltClass: string;
  categories: ICategories[];
  minmax: IMinMax;
}

export function Filters({eltClass, categories, minmax}: IFiltersElt) {
  return (
    <div className={`filter ${eltClass}`}>
      {<FiltersFieldset eltClass='' categories={categories}/>}
      {<FiltersSlider  eltClass='' minmax={minmax} />}
    </div>
  )
};
