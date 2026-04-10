import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { siteContent } from './content/siteContent';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import ScrollProgress from './components/ScrollProgress';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage content={siteContent} />} />
        <Route path="/services" element={<ServicesPage content={siteContent} />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter basename="/">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="site-shell">
          <ScrollProgress />
          <SiteHeader brand={{ ...siteContent.brand, brandPillars: siteContent.brandPillars }} />
          <ScrollToTop />

          <main id="main-content" className="site-main">
            <AnimatedRoutes />
          </main>

          <SiteFooter brand={siteContent.brand} social={siteContent.social} />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
