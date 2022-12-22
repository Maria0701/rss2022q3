import './count-of-product.css'

interface ICount {
  decreaseCount: () => void
  increaseCount: () => void
  count: number
}

export function CountOfProduct ({decreaseCount, increaseCount, count}: ICount) {

  return (
    <div className="product__count">
      <button className="btn btn--add" onClick={decreaseCount}>-</button>
      <input className="product__count-input input" type="number" value={count} step="1" aria-label="add number of elements"/>
      <button className="btn btn--add" onClick={increaseCount}>+</button>
    </div>
  )
}
