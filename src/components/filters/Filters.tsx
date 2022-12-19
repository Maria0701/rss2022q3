import './filters.css'

interface IFiltersElt {
  eltClass: string
}

export function Filters({eltClass}: IFiltersElt) {
  return (
    <div className={`filter ${eltClass}`}>Filters</div>
  )
};
