import './header.css'
import { Logo } from '../logo/Logo'
import { NavHeader } from '../navHeader/NavHeader'
import { SearchHeader } from '../search/searchHeader'
import { ShoppingCart } from '../shoppingCart/ShoppingCart'

export function Header() {
  return (
    <div className="header">
      <div className="container header__container">
        <Logo eltClass='header__logo'/>
        <NavHeader styleNav='header__navigation'/>
        <SearchHeader styleSearch='header__search'/>
        <ShoppingCart styleCart="header__cart"/>
      </div>
    </div>
  )
}
