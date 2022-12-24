import { ChangeEvent, useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useDebounce } from '../../hooks/deboubce';
import { useAppDispatch, useAppSelector } from '../../hooks/reducer';
import { searchProducts } from '../../store/productsActions';
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

  const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value)
  }

  const debounced = useDebounce<string>(value);
  const dispatch = useAppDispatch();
  
  const {error:searchErr, loading: searchLoading, products: searchProds} = useAppSelector(state => state.products)
  //let minmax: IMinMax;

  useEffect(() => {
    if (debounced.length > 3) {
      dispatch(searchProducts(debounced));
      setDropdown(true);
    } else {
      setDropdown(false);
    }
  }, [debounced]);

  //console.log(searchProds);

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
        if (ev.keyCode === 13) {
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
        {searchProds.map(item => (
          <div 
            className="search__dropdown-item" 
            key={item.id}
            onClick={() => clickHandler(item.id)}
            >{item.title}</div>
        ))}
      </div>}
    </div>
  )
}
