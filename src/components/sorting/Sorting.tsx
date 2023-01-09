import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reducer";
import { changeSorting } from "../../store/filterSlice";
import { changePage } from "../../store/paginationSlice";

export function Sorting () {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const SortingHandler = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeSorting(evt.target.value));
    dispatch(changePage(1));

    let updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set('sort', `${evt.target.value}`);
     setSearchParams(updatedSearchParams.toString());
  };

  return (
    <select
        name="sorting"
        onChange={(evt) => SortingHandler(evt)}
      >
         <option value="default">Default</option>
         <option value="cheap">Cheap first</option>
         <option value="expensive">expensive first</option>
         <option value="az">Title A to Z</option>
         <option value="za">Title Z to A</option>
      </select>
  )
}
