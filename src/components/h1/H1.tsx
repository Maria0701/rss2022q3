import './h1.css'
interface ISearch {
  eltClass: string
}

export function H1Elt({eltClass}: ISearch) {
  return (
    <h1 className={`h1 ${eltClass}`}>Платья</h1>
  )
}
