import './footer.css'
import { Logo } from '../logo/Logo'
import { LINKS_FOR_FOOTER } from '../../jsons/links' 
import { ILinks } from '../../models/models'
import { FooterLogos } from '../footerLogos/FooterLogos'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <Logo eltClass='footer__logo'/>
        <div className="footer__links">
            <FooterLogos eltClass='footer__logos' logos={LINKS_FOR_FOOTER} />
        </div>
      </div>
    </footer>
  )
}
