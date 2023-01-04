import './h1.css'
interface ISearch {
  eltClass: string,
  text: string,
}

export function H1Elt({eltClass, text}: ISearch) {
  return (
    <h1 className={`h1 ${eltClass}`}>{text}</h1>
  )
}
