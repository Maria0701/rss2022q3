import { ChangeEvent, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../hooks/deboubce';
import { useAppDispatch, useAppSelector } from '../../hooks/reducer';
import { KEY_NAME_ENTER, SHOP_CURRENCY } from '../../jsons/links';
import { searchProducts } from '../../store/searchSlice';
import search from './img/search.png'
import './searchHeader.css'

interface ISearch {
  styleSearch: string
}

export function SearchHeader({styleSearch}: ISearch) {
  const [searchItem, setSearchItem] = useState(true);
  const [value, setValue] = useState('');
  const [dropdown, setDropdown] = useState(false)
  const navigate = useNavigate();
  const error = useAppSelector((state) => state.search.error);
  const loading = useAppSelector((state) => state.search.loading);
  const searched = useAppSelector((state) => state.search.searched);

  const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value)
  }

  const debounced = useDebounce<string>(value);
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (debounced.length > 2) {
      dispatch(searchProducts(debounced));
      setDropdown(true);
    } else {
      setDropdown(false);
    }
  }, [debounced]);

  const clickHandler = (id:number) => {
    navigate(`/products/${id}`);
    setDropdown(false);
  }

  function changeSearch (): void {
    setSearchItem(prev => !prev)
  }

  function changeInput (): void {
    setSearchItem(prev => !prev)
  }

  return (
    <div className={`search ${styleSearch}`}>
      {searchItem === true ? 
      <div onClick={changeSearch}>
        <img src={search} alt="search" className='img__search'/>
      </div> 
      : 
      <div onKeyDown={(ev) => {
        if (ev.key === KEY_NAME_ENTER) {
          changeInput()
        }
      }}>
        <input type="text" 
          className="search__input"
          placeholder="Type in product"
          value={value}
          onChange={changeHandler}
          />
      </div>
      }
      {dropdown && <div className="search__dropdown">
        {searched.map(item => (
          <div 
            className="search__dropdown-item" 
            key={item.id}
            onClick={() => clickHandler(item.id)}
            >{item.title} {item.price} {SHOP_CURRENCY}</div>
        ))}
      </div>}
    </div>
  )
}
