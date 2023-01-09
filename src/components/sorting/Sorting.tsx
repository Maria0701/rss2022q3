import { useAppDispatch } from "../../hooks/reducer";
import { changeSorting } from "../../store/filterSlice";

export function Sorting () {
  const dispatch = useAppDispatch()

  const SortingHandler = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeSorting(evt.target.value))
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
