import { useState } from 'react'
import search from './img/search.png'
import './searchHeader.css'
interface ISearch {
  styleSearch: string
}
export function SearchHeader({styleSearch}: ISearch) {
  const [searchItem, setSearchItem] = useState(true)

  function changeSearch (): void {
    setSearchItem(prev => !prev)
  }

  function changeInput (): void {
    setSearchItem(prev => !prev)
  }
  return (
    <div className={styleSearch}>
      {searchItem === true ? 
      <div onClick={changeSearch}>
        <img src={search} alt="search" className='img__search'/>
      </div> 
      : 
      <div onKeyDown={(ev) => {
        if (ev.keyCode === 13) {
          changeInput()
        }
      }}>
        <input type="text" className='search__input'/>
      </div>
      }
    </div>
  )
}
