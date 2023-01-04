import { useAppSelector } from '../../hooks/reducer';
import './pagination.css'

interface IPagination {
  postsPerPage: number, 
  totalPosts: number,
  currentPage: number,
  paginate: Function,
}

export function Pagination ({postsPerPage, totalPosts, paginate, currentPage}: IPagination) {

  const numberOfPages = Math.ceil(totalPosts / postsPerPage);
  const pageNumbers = [];
 
  for (let i = 1; i <= numberOfPages; i++) {
     pageNumbers.push(i);
  }

  const isCurrent = (page:number, currentPage:number) => page === currentPage ? 'page__item--active' : ''

  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={`page__item ${isCurrent(number, currentPage)}`} onClick={() => paginate(number)}>
            {number}
          </li>
        ))}
      </ul>
    </div>
  )
}
