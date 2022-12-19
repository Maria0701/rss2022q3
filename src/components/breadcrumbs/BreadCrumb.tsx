import { IBread } from '../../models/models'
import { Link } from 'react-router-dom';

interface IBreabcrumbsItem {
  link: IBread;
}

export function BreadCrumb({link}: IBreabcrumbsItem) {
  return (
    <li className="breadcrumb__item">
        <Link to={link.link} className="breadcrumb__link" >
            <span>{link.name}</span>
        </Link>
    </li>
  )
}
