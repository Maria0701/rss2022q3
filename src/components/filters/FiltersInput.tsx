import { useAppDispatch } from '../../hooks/reducer';
import { CATEGORIES } from '../../jsons/links';
import { changeCategoriesArr } from '../../store/filterSlice';

interface IFiltersInput {
  eltClass: string,
  category: string,
  checked: boolean,
}

export function FiltersInput({eltClass, category, checked}: IFiltersInput) {
  const dispatch = useAppDispatch();

  const changeCategories = (e: React.ChangeEvent<HTMLInputElement>, category: string) => {
    dispatch(changeCategoriesArr(category));
  }

  return (
    <label className="filter__label">
        <input type="checkbox" value={category} className="filter__checkbox" onChange={(e) => changeCategories(e, category)} checked={checked} />
        <span className="filter__text">{CATEGORIES[category] || category}</span>
    </label>
  )
};