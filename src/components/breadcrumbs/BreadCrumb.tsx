import { IBread } from '../../models/models'
import { Link } from 'react-router-dom';

interface IBreabcrumbsItem {
  link: IBread;
  id: number
}

export function BreadCrumb({link, id}: IBreabcrumbsItem) {
  return (
    <li className="breadcrumb__item" key={id}>
        <Link to={link.link} className="breadcrumb__link" >
            <span>{link.name}</span>
        </Link>
    </li>
  )
}
