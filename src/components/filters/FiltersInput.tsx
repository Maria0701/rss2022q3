import { CATEGORIES } from '../../jsons/links';

interface IFiltersInput {
  eltClass: string;
  category: string;
}

export function FiltersInput({eltClass, category}: IFiltersInput) {
  return (
    <label className="filter__label">
        <input type="checkbox" value={category} className="filter__checkbox"/>
        <span className="filter__text">{CATEGORIES[category]}</span>
    </label>
  )
};