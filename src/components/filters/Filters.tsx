import { ICategories } from '../../models/models';
import './filters.css'
import { FiltersFieldset } from './Filtersfieldset';

interface IFiltersElt {
  eltClass: string;
  categories: ICategories[];
}

export function Filters({eltClass, categories}: IFiltersElt) {
  return (
    <div className={`filter ${eltClass}`}>
      {<FiltersFieldset eltClass='' categories={categories}/>}
    </div>
  )
};
