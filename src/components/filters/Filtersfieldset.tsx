import { ICategories } from '../../models/models';
import { FiltersInput } from './FiltersInput';


interface IFiltersFieldset {
  eltClass: string;
  categories: ICategories[];
}

export function FiltersFieldset({eltClass, categories}: IFiltersFieldset) {
  return (
    <div className={`filter__fieldset ${eltClass}`}>
        <p className="filters__name">Категории</p>
        <div className="filters__wrapper">
            {categories?.map((item) => (<FiltersInput eltClass='' category={item} key={item._id}/>))}
        </div>
    </div>
  )
};
