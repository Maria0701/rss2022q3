import './footer-logos.css'
import { LINKS_FOR_FOOTER } from '../../jsons/links' 
import { ILinks } from '../../models/models'

interface IFooterLogos {
  eltClass: string,
  logos: ILinks[]
}

export function FooterLogos({logos, eltClass}: IFooterLogos) {
  return (
    <div className={`logos ${eltClass}`}>
          { logos?.map((user, id) => (
            <a className="logos__item" href={user.link} title={user.name} key={id}>
              <img src={process.env.PUBLIC_URL + user.img} title={user.name} />
            </a>
          ))}
    </div>
  )
}
