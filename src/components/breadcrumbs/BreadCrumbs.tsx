import './breadcrumbs.css'
import { IBread } from '../../models/models';
import { BreadCrumb } from './BreadCrumb';

interface IBreabcrumbs {
  links: IBread[]
}

export function BreadCrumbs ({links}: IBreabcrumbs) {
  return (
      <ul className="breadcrumb">
        {links?.map((link, id) => (
          <BreadCrumb link={link} key={id}  />
        ))}
    </ul>
  )
}
