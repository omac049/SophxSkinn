import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionReveal from '../components/SectionReveal';
import Marquee from '../components/Marquee';
import MenuImagePanel from '../components/MenuImagePanel';
import TestimonialSection from '../components/TestimonialSection';
import PrimaryCTA from '../components/PrimaryCTA';
import PhotoGallerySection from '../components/PhotoGallerySection';
import { absoluteUrl, getLocalBusinessSchema, getBreadcrumbSchema, getFAQSchema } from '../utils/seo';

const HERO_PILLS = ['Live availability', 'Book in seconds', 'Fashion-forward results'];

const HERO_LEFT_ACCENT_STYLE = {
  position: 'absolute',
  inset: '10% auto auto -4%',
  width: 180,
  height: 180,
  borderRadius: '999px',
  background: 'radial-gradient(circle, rgba(160, 99, 90, 0.35) 0%, rgba(160, 99, 90, 0) 70%)',
  filter: 'blur(2px)',
  opacity: 0.6,
  pointerEvents: 'none',
};

const HERO_RIGHT_ACCENT_STYLE = {
  position: 'absolute',
  inset: 'auto -6% 8% auto',
  width: 240,
  height: 240,
  borderRadius: '999px',
  background: 'radial-gradient(circle, rgba(138, 79, 70, 0.3) 0%, rgba(138, 79, 70, 0) 68%)',
  filter: 'blur(4px)',
  opacity: 0.4,
  pointerEvents: 'none',
};

const HERO_CONTENT_STYLE = {
  position: 'relative',
  zIndex: 1,
  display: 'grid',
  gap: '0.95rem',
};

const HERO_EYEBROW_STYLE = {
  color: 'rgba(240, 213, 206, 0.9)',
  textShadow: '0 2px 12px rgba(0,0,0,0.2)',
};

const HERO_HEADING_STYLE = {
  maxWidth: '13ch',
};

const HERO_BODY_STYLE = {
  maxWidth: '52ch',
  color: 'rgba(255, 250, 248, 0.82)',
};

const HERO_PILL_ROW_STYLE = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.6rem',
  marginTop: '0.1rem',
};

const HERO_PILL_STYLE = {
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: '999px',
  border: '1px solid rgba(255,255,255,0.15)',
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(8px)',
  color: 'rgba(255, 250, 248, 0.9)',
  padding: '0.55rem 0.85rem',
  fontSize: '0.84rem',
  fontWeight: 600,
  letterSpacing: '0.02em',
};

const PAGE_TRANSITIONS = {
  active: {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  reduced: {
    initial: false,
    animate: { opacity: 1 },
    exit: { opacity: 1 },
    transition: { duration: 0 },
  },
};

const HERO_TRANSITIONS = {
  active: {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
  reduced: {
    initial: false,
    animate: { opacity: 1 },
    transition: { duration: 0 },
  },
};

export default function ServicesPage({ content }) {
  const { brand, services, faq, testimonials, brandPillars } = content;
  const canonical = absoluteUrl('/services');
  const reduceMotion = useReducedMotion() ?? false;
  const [isCompactLayout, setIsCompactLayout] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const pageMotion = reduceMotion ? PAGE_TRANSITIONS.reduced : PAGE_TRANSITIONS.active;
  const heroMotion = reduceMotion ? HERO_TRANSITIONS.reduced : HERO_TRANSITIONS.active;
  const heroVideoSrc = brand.clientVideos?.find((video) => video?.src)?.src;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 720px)');
    const updateLayout = () => setIsCompactLayout(mediaQuery.matches);

    updateLayout();
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateLayout);
      return () => mediaQuery.removeEventListener('change', updateLayout);
    }

    mediaQuery.addListener(updateLayout);
    return () => mediaQuery.removeListener(updateLayout);
  }, []);

  const heroHeading = isCompactLayout
    ? 'Your skin menu. Tap, book, glow.'
    : 'Signature rituals. Polished results. Effortless booking.';
  const heroBody = isCompactLayout
    ? `Facials, brows, lashes, and waxing at ${brand.salon} in ${brand.location} — browse, book, done.`
    : `Facials, brows, lashes, and waxing at ${brand.salon} in ${brand.location}. Find the service that fits your vibe, then lock in your time on Vagaro.`;
  const heroPills = isCompactLayout ? HERO_PILLS.slice(0, 2) : HERO_PILLS;

  return (
    <motion.div
      className="page-layer"
      initial={pageMotion.initial}
      animate={pageMotion.animate}
      exit={pageMotion.exit}
      transition={pageMotion.transition}
    >
      <Helmet>
        <title>Services & Menu | SophxSkinn — Goodyear AZ Esthetician</title>
        <meta
          name="description"
          content="SophxSkinn services at The Remedy Salon, 13375 W McDowell Rd #108, Goodyear, AZ 85395 — facials, brows, lashes & waxing. View the menu and book online."
        />
        <link rel="canonical" href={canonical} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SophxSkinn" />
        <meta property="og:title" content="SophxSkinn Services | Facials, Brows, Lashes, Waxing — Goodyear AZ" />
        <meta property="og:description" content="Browse SophxSkinn service categories, pricing, and book your next appointment at The Remedy Salon in Goodyear, AZ." />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://sophxskinn.com/assets/AB8A5850-BC05-46A2-90A2-BAFFF757C5E9.png" />
        <meta property="og:image:alt" content="SophxSkinn logo" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SophxSkinn Services | Goodyear AZ Esthetician" />
        <meta name="twitter:description" content="Facials, brows, lashes & waxing at The Remedy Salon in Goodyear, AZ. View the full menu and book online." />
        <meta name="twitter:image" content="https://sophxskinn.com/assets/AB8A5850-BC05-46A2-90A2-BAFFF757C5E9.png" />
        <meta name="twitter:image:alt" content="SophxSkinn logo" />

        <script type="application/ld+json">
          {JSON.stringify(getLocalBusinessSchema())}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(getBreadcrumbSchema([
            { name: 'Home', url: 'https://sophxskinn.com/' },
            { name: 'Services', url: 'https://sophxskinn.com/services' },
          ]))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(getFAQSchema(faq))}
        </script>
      </Helmet>

      <motion.section
        className="services-hero"
        initial={heroMotion.initial}
        animate={heroMotion.animate}
        transition={heroMotion.transition}
        style={isCompactLayout ? { padding: '1.35rem' } : undefined}
      >
        <motion.div
          aria-hidden="true"
          animate={
            reduceMotion
              ? { opacity: 0.58 }
              : {
                  y: [0, -10, 0],
                  rotate: [0, 1.5, 0],
                }
          }
          transition={reduceMotion ? { duration: 0 } : { duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={HERO_LEFT_ACCENT_STYLE}
        />
        <motion.div
          aria-hidden="true"
          animate={
            reduceMotion
              ? { opacity: 0.36 }
              : {
                  y: [0, 12, 0],
                  x: [0, -6, 0],
                }
          }
          transition={reduceMotion ? { duration: 0 } : { duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          style={HERO_RIGHT_ACCENT_STYLE}
        />
        {heroVideoSrc ? (
          <video
            className="services-hero-video"
            src={heroVideoSrc}
            muted
            autoPlay={!reduceMotion}
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        ) : null}
        <div
          style={{
            ...HERO_CONTENT_STYLE,
            gap: isCompactLayout ? '0.8rem' : HERO_CONTENT_STYLE.gap,
            maxWidth: isCompactLayout ? '100%' : '26rem',
          }}
        >
          <p className="eyebrow" style={HERO_EYEBROW_STYLE}>
            Signature Services
          </p>
          <h1
            style={{
              ...HERO_HEADING_STYLE,
              maxWidth: isCompactLayout ? '11ch' : HERO_HEADING_STYLE.maxWidth,
              lineHeight: isCompactLayout ? 0.98 : undefined,
            }}
          >
            {heroHeading}
          </h1>
          <p
            style={{
              ...HERO_BODY_STYLE,
              maxWidth: isCompactLayout ? '34ch' : HERO_BODY_STYLE.maxWidth,
              lineHeight: isCompactLayout ? 1.52 : undefined,
            }}
          >
            {heroBody}
          </p>
          <div style={HERO_PILL_ROW_STYLE}>
            {heroPills.map((pill, index) => (
              <motion.span
                key={pill}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.45, delay: 0.1 + index * 0.08 }}
                style={HERO_PILL_STYLE}
              >
                {pill}
              </motion.span>
            ))}
          </div>
          <a
            className="book-button large"
            href={brand.primaryCtaUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={isCompactLayout ? { width: '100%', justifyContent: 'center' } : undefined}
          >
            Book On Vagaro
          </a>
        </div>
      </motion.section>

      <Marquee items={brandPillars ? [...brandPillars, brand.name, ...brandPillars] : [brand.name]} />

      <MenuImagePanel
        services={services}
        bookingUrl={brand.primaryCtaUrl}
        studioName={brand.salon}
        location={brand.location}
      />

      <PhotoGallerySection
        eyebrow="Client Spotlights"
        title="The proof is in the glow"
        description="Real clients, real results — brows sculpted, lashes lifted, and skin that speaks for itself."
        images={brand.clientImages}
        ariaLabel="Client service result gallery"
      />

      <TestimonialSection testimonials={testimonials} />

      <SectionReveal className="faq-section" as="section">
        <div className="section-headline">
          <p className="eyebrow">Appointment FAQ</p>
          <h2>Quick answers before you book</h2>
        </div>
        <dl>
          {faq.map((item, index) => (
            <div
              key={item.question}
              className={`faq-item${openFaq === index ? ' faq-open' : ''}`}
            >
              <dt>
                <button
                  className="faq-toggle"
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                >
                  {item.question}
                  <span className="faq-toggle-icon" aria-hidden="true">+</span>
                </button>
              </dt>
              <dd className="faq-answer">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </SectionReveal>

      <PrimaryCTA
        eyebrow="Ready When You Are"
        heading="Your next glow-up starts here"
        body="Pick your service, grab an open time, and confirm — polished results are a few taps away."
        helper="Booking should feel as effortless as the results look."
        buttonLabel={brand.primaryCtaLabel}
        buttonHref={brand.primaryCtaUrl}
      />
    </motion.div>
  );
}
