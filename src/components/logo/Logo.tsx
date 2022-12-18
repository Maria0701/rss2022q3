import { Link } from 'react-router-dom'
import './logo.css'
import logo from './img/header_logo.png'

interface ILogo {
  eltClass: string
}
export function Logo({eltClass}: ILogo) {
  return (
    <Link to='/' className={`logo ${eltClass}`}>
      <img src={logo} alt="logo" />
    </Link>
  )
}
