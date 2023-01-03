import { useAppDispatch } from "../../hooks/reducer";
import { sortProducts } from "../../store/productsSlice";

export function Sorting () {
  const dispatch = useAppDispatch()

  const SortingHandler = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortProducts(evt.target.value));
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
