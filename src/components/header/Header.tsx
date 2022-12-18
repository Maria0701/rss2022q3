import './header.css'
import { Logo } from '../logo/Logo'
import { NavHeader } from '../navHeader/NavHeader'
import { SearchHeader } from '../search/searchHeader'
export function Header() {
  return (
    <header className="header">
      <div className="container header__container">
        <Logo eltClass='header__logo'/>
        <NavHeader styleNav='header__navigation'/>
        <SearchHeader styleSearch='header__search'/>
        <div>cart</div>
      </div>
    </header>
  )
}
