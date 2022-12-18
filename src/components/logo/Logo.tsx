import { Link } from 'react-router-dom'
import './logo.css'


interface ILogo {
  eltClass: string
}
export function Logo({eltClass}: ILogo) {
  return (
    <Link to='/' className={`logo ${eltClass}`}></Link>
  )
}
