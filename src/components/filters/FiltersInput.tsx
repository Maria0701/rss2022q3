import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reducer';
import { CATEGORIES } from '../../jsons/links';
import { changeCategoriesArr } from '../../store/filterSlice';
import { changePage } from '../../store/paginationSlice';

interface IFiltersInput {
  eltClass: string,
  category: string,
  checked: boolean,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, category: string) => void
}

export function FiltersInput({eltClass, category, checked, onChange}: IFiltersInput) {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const filterCategories = useAppSelector(state => state.filter.filterCategories)

  const changeCategories = (e: React.ChangeEvent<HTMLInputElement>, category: string) => {
    dispatch(changeCategoriesArr(category));
    dispatch(changePage(1));
    const newCats = filterCategories.length > 0 ? `${filterCategories.join('_')}_${category}` : category;
    let updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set('cats', `${newCats}`);
    setSearchParams(updatedSearchParams.toString());
  }

  return (
    <label className="filter__label">
        <input type="checkbox" value={category} className="filter__checkbox" onChange={(e) => changeCategories(e, category)} checked={checked} />
        <span className="filter__text">{CATEGORIES[category] || category}</span>
    </label>
  )
};