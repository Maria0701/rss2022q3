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
      <span className="product__count-input input"
      /*TODO: Span нужно заменить Input и дать возможность его редактировать*/
      /*type="number" 
      value={count} 
      step="1" */
      aria-label="add number of elements">{count}</span>
      <button className="btn btn--add" onClick={increaseCount}>+</button>
    </div>
  )
}
