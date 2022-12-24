import { getHighestAndLowest } from '../../hooks/get-lowest-and-highest';
import { useAppSelector } from '../../hooks/reducer';
import { ICategories, IMinMax, IProductCard } from '../../models/models';
import './filters.css'
import { FiltersFieldset } from './Filtersfieldset';
import { FiltersSlider } from './FiltersSlider';

interface IFiltersElt {
  eltClass: string;

  minmax: IMinMax;
}

export function Filters({eltClass, minmax}: IFiltersElt) {
  const {categories, loading, error} = useAppSelector(state => state.categories)
  return (
    <div className={`filter ${eltClass}`}>
      {<FiltersFieldset eltClass='' categories={categories}/>}
      {<FiltersSlider  eltClass='' minmax={minmax} />}
    </div>
  )
};
