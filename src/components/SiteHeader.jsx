import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const MOBILE_NAV_QUERY = '(max-width: 920px)';

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

function HamburgerIcon({ open }) {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <line
        x1="0"
        y1="1"
        x2="18"
        y2="1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        style={{
          transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)',
          transformOrigin: 'center',
          transform: open ? 'translateY(6px) rotate(45deg)' : 'none',
        }}
      />
      <line
        x1="0"
        y1="7"
        x2="18"
        y2="7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        style={{
          transition: 'opacity 0.2s ease',
          opacity: open ? 0 : 1,
        }}
      />
      <line
        x1="0"
        y1="13"
        x2="18"
        y2="13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        style={{
          transition: 'transform 0.3s cubic-bezier(0.22,1,0.36,1)',
          transformOrigin: 'center',
          transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none',
        }}
      />
    </svg>
  );
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
  const isTransparent = isHome && !isScrolled && !isMenuOpen;

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
    <header
      className={`site-header${isTransparent ? ' header-transparent' : ''}${isMenuOpen ? ' header-menu-open' : ''}`}
    >
      <div className="header-inner">
        <div className="header-brand-row">
          <NavLink className="brand-mark" to="/" aria-label="SophxSkinn home">
            <img src={brand.scriptLogo} alt="SophxSkinn" />
          </NavLink>

          <button
            ref={toggleRef}
            className={`nav-toggle${isMenuOpen ? ' nav-toggle-open' : ''}`}
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="primary-site-nav"
            aria-haspopup="menu"
            aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <HamburgerIcon open={isMenuOpen} />
          </button>
        </div>

        {isMobileNav && (
          <div
            className={`nav-scrim${isMenuOpen ? ' nav-scrim-visible' : ''}`}
            aria-hidden="true"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        <nav
          ref={navRef}
          id="primary-site-nav"
          className={`site-nav${isMenuOpen ? ' open' : ''}`}
          aria-label="Primary navigation"
          aria-hidden={isMobileNav && !isMenuOpen}
          inert={isMobileNav && !isMenuOpen ? '' : undefined}
        >
          {isMobileNav && (
            <div className="mobile-nav-header">
              <img className="mobile-nav-logo" src={brand.scriptLogo} alt="" aria-hidden="true" />
            </div>
          )}
          <div className="mobile-nav-links">
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
          </div>
          <a
            className="book-button header-mobile-cta"
            href={brand.primaryCtaUrl}
            target="_blank"
            rel="noreferrer"
            tabIndex={isMobileNav && !isMenuOpen ? -1 : undefined}
          >
            {brand.primaryCtaLabel}
          </a>
          {isMobileNav && (
            <p className="mobile-nav-sub">
              {brand.subtitle} · {brand.location}
            </p>
          )}
        </nav>

        <a className="book-button header-cta" href={brand.primaryCtaUrl} target="_blank" rel="noreferrer">
          {brand.primaryCtaLabel}
        </a>
      </div>
    </header>
  );
}
