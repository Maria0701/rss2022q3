import './footer.css'
import { Logo } from '../logo/Logo'
import { LINKS_FOR_FOOTER } from '../../jsons/links' 
import { ILinks } from '../../models/models'
import { FooterLogos } from '../footerLogos/FooterLogos'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__container footer__container--top">
        <Logo eltClass='footer__logo'/>
        <div className="footer__links">
            <FooterLogos eltClass='footer__logos' logos={LINKS_FOR_FOOTER} />
        </div>
      </div>
      <div className="container footer__container footer__container--bottom">
        <p className="footer__copyright">2022</p>
      </div>
    </footer>
  )
}
