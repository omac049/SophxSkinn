import { Link } from 'react-router-dom';

export default function SiteFooter({ brand, social }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-column">
            <img className="footer-logo" src={brand.scriptLogo} alt="SophxSkinn" />
            <p className="footer-tagline">Where skincare meets personal style.</p>
          </div>

          <div className="footer-column">
            <p className="footer-column-title">Services</p>
            <Link to="/services">Facials</Link>
            <Link to="/services">Brows</Link>
            <Link to="/services">Lashes</Link>
            <Link to="/services">Waxing</Link>
          </div>

          <div className="footer-column">
            <p className="footer-column-title">Visit</p>
            <p>{brand.salon}</p>
            <address className="footer-address">
              <a
                href={brand.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get directions to The Remedy Salon"
              >
                {brand.addressStreet}<br />
                {brand.addressCity}, {brand.addressState} {brand.addressZip}
              </a>
            </address>
            <a href={brand.primaryCtaUrl} target="_blank" rel="noreferrer">
              Book Online
            </a>
          </div>

          <div className="footer-column">
            <p className="footer-column-title">Connect</p>
            <a href={social.url} target="_blank" rel="noreferrer">
              {social.handle}
            </a>
            <p>{brand.subtitle}</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {currentYear} {brand.name}. All rights reserved.
          </p>
          <p>
            {brand.subtitle} · {brand.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
