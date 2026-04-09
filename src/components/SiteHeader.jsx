import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const MOBILE_NAV_QUERY = '(max-width: 768px)';

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const updateMatches = () => {
      setMatches(mediaQuery.matches);
    };

    updateMatches();
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateMatches);
      return () => mediaQuery.removeEventListener('change', updateMatches);
    }

    mediaQuery.addListener(updateMatches);
    return () => mediaQuery.removeListener(updateMatches);
  }, [query]);

  return matches;
}

function navClassName({ isActive }) {
  return `nav-link${isActive ? ' active' : ''}`;
}

export default function SiteHeader({ brand }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const toggleRef = useRef(null);
  const wasMenuOpenRef = useRef(false);
  const isMobileNav = useMediaQuery(MOBILE_NAV_QUERY);
  const { pathname } = useLocation();

  const isHome = pathname === '/';
  const isTransparent = isHome && !isScrolled;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsScrolled(window.scrollY > 80);
  }, [pathname]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileNav) {
      setIsMenuOpen(false);
    }
  }, [isMobileNav]);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isMobileNav && isMenuOpen) {
      document.body.style.overflow = 'hidden';

      const firstFocusable = navRef.current?.querySelector(
        'a:not([tabindex="-1"]), button:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])'
      );

      firstFocusable?.focus({ preventScroll: true });
    } else {
      document.body.style.overflow = previousOverflow;

      if (wasMenuOpenRef.current && toggleRef.current) {
        toggleRef.current.focus({ preventScroll: true });
      }
    }

    wasMenuOpenRef.current = isMenuOpen;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen, isMobileNav]);

  return (
    <header className={`site-header${isTransparent ? ' header-transparent' : ''}`}>
      <div className="header-inner">
        <div className="header-brand-row">
          <NavLink className="brand-mark" to="/" aria-label="SophxSkinn home">
            <img src={brand.scriptLogo} alt="SophxSkinn" />
          </NavLink>

          <button
            ref={toggleRef}
            className="nav-toggle"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="primary-site-nav"
            aria-haspopup="menu"
            aria-label={isMenuOpen ? 'Close primary navigation' : 'Open primary navigation'}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        <nav
          ref={navRef}
          id="primary-site-nav"
          className={`site-nav${isMenuOpen ? ' open' : ''}`}
          aria-label="Primary navigation"
          aria-hidden={isMobileNav && !isMenuOpen}
          inert={isMobileNav && !isMenuOpen ? '' : undefined}
        >
          <NavLink
            className={navClassName}
            to="/"
            tabIndex={isMobileNav && !isMenuOpen ? -1 : undefined}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            className={navClassName}
            to="/services"
            tabIndex={isMobileNav && !isMenuOpen ? -1 : undefined}
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </NavLink>
          <a
            className="book-button header-mobile-cta"
            href={brand.primaryCtaUrl}
            target="_blank"
            rel="noreferrer"
            tabIndex={isMobileNav && !isMenuOpen ? -1 : undefined}
          >
            {brand.primaryCtaLabel}
          </a>
        </nav>

        <a className="book-button header-cta" href={brand.primaryCtaUrl} target="_blank" rel="noreferrer">
          {brand.primaryCtaLabel}
        </a>
      </div>
    </header>
  );
}
