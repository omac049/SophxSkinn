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
            <a href="/services">Facials</a>
            <a href="/services">Brows</a>
            <a href="/services">Lashes</a>
            <a href="/services">Waxing</a>
          </div>

          <div className="footer-column">
            <p className="footer-column-title">Info</p>
            <p>{brand.salon}</p>
            <p>{brand.location}</p>
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
