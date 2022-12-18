import './header.css'
import { Logo } from '../logo/Logo'
import { NavHeader } from '../navHeader/NavHeader'
export function Header() {
  return (
    <div className="header">
      <div className="container header__container">
        <Logo eltClass='header__logo'/>
        <NavHeader styleNav='header__navigation'/>
        <div>search</div>
        <div>cart</div>
      </div>
    </div>
  )
}
