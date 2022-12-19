import './breadcrumbs.css'
import { IBread } from '../../models/models'
import { Link } from 'react-router-dom';
import { BreadCrumb } from './BreadCrumb';

interface IBreabcrumbsLogos {
  links: IBread[]
}

export function BreadCrumbs ({links}: IBreabcrumbsLogos) {
  return (
      <ul className="breadcrumb">
        {links?.map((link, id) => (
          <BreadCrumb link={link} id={id} />
        ))}
    </ul>
  )
}
