import { ICategories } from '../../models/models';


interface IFiltersInput {
  eltClass: string;
  category: ICategories;
}

export function FiltersInput({eltClass, category}: IFiltersInput) {
  return (
    <label className="filter__label">
        <input type="checkbox" value={category._id} className="filter__checkbox"/>
        <span className="filter__text">{category.name}</span>
    </label>
  )
};