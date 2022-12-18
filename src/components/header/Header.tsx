import './header.css'
import { Logo } from '../logo/Logo'
import { SearchHeader } from '../search/searchHeader'
export function Header() {
  return (
    <div className="header">
      <div className="container header__container">
        <Logo eltClass='header__logo'/>
        <div>nav</div>
        <SearchHeader styleSearch='header__search'/>
        <div>cart</div>
      </div>
    </div>
  )
}
