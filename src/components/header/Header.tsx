import './header.css'
import { Logo } from '../logo/Logo'
export function Header() {
  return (
    <div className="header">
      <div className="container header__container">
        <Logo eltClass='header__logo'/>
        <div>nav</div>
        <div>search</div>
        <div>cart</div>
      </div>
    </div>
  )
}
