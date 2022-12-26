import './pagination.css'

interface IPagination {
  pageNum: number[]
  paginate: (num: number) => void
}


export function Pagination ({pageNum, paginate}: IPagination) {

  return (
    <div>
      Pagination
      <ul className="pagination">
        {
          pageNum.map((num, i) => (
            <li className="page__item" key={num} onClick={() => paginate(num)}>
                {num}
            </li>
          ))
        }
      </ul>
    </div>
  )
}
