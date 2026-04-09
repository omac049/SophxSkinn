import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import SectionReveal from './SectionReveal';

const BOOKING_NOTES = [
  'Live Vagaro availability',
  'Reserve in minutes',
  'Instant confirmation',
];

const SERVICE_NOTES = {
  facials: 'Ideal for a brighter glow, smoother texture, and a healthier skin barrier.',
  brows: 'Ideal for soft symmetry, refined shape, and everyday polish.',
  lashes: 'Ideal for lift, definition, and a fresh, awake look.',
  waxing: 'Ideal for smooth skin with a comfort-first touch.',
};

const FALLBACK_SERVICE_NOTE = 'Tailored to keep your appointment polished, comfortable, and ready to wear.';

const getServiceNote = (serviceId) => SERVICE_NOTES[serviceId] ?? FALLBACK_SERVICE_NOTE;

const CARD_MOTION = {
  active: {
    initial: { opacity: 0, y: 24 },
    whileHover: { y: -4 },
    transition: (index) => ({ duration: 0.7, delay: index * 0.12 }),
  },
  reduced: {
    initial: false,
    whileHover: undefined,
    transition: { duration: 0 },
  },
};

export default function MenuImagePanel({
  services,
  bookingUrl = '#',
  studioName = 'The Remedy Salon',
  location = 'Goodyear, Arizona',
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const [isCompactLayout, setIsCompactLayout] = useState(false);
  const cardMotion = reduceMotion ? CARD_MOTION.reduced : CARD_MOTION.active;

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

  const bookingNotes = isCompactLayout ? BOOKING_NOTES.slice(0, 2) : BOOKING_NOTES;
  const sectionHeading = isCompactLayout
    ? 'Scan the menu, then book in a tap.'
    : 'Signature treatments presented clearly for effortless booking';
  const sectionBody = isCompactLayout
    ? 'Each service is laid out as a quick read, with live Vagaro booking kept close by.'
    : 'Compare each treatment at a glance, then reserve the service that fits your skin, schedule, and finish.';
  const bookingSummary = isCompactLayout
    ? `Visit ${studioName} in ${location} and reserve through Vagaro with live openings.`
    : `Visit ${studioName} in ${location} and reserve through Vagaro with live openings and quick checkout.`;
  const bookingButtonStyle = isCompactLayout ? { width: '100%', justifyContent: 'center' } : undefined;

  return (
    <SectionReveal className="menu-panel" as="section">
      <div className="menu-panel-layout">
        <div className="section-headline">
          <p className="eyebrow">Signature Services</p>
          <h2>{sectionHeading}</h2>
          <p>{sectionBody}</p>
        </div>

        <aside className="menu-booking-rail" aria-label="Booking highlights">
          <p className="eyebrow">Book Online</p>
          <p className="menu-booking-summary">{bookingSummary}</p>
          <ul className="menu-booking-list">
            {bookingNotes.map((note) => (
              <li key={note} className="menu-booking-pill">
                {note}
              </li>
            ))}
          </ul>
          <a
            className="book-button"
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={bookingButtonStyle}
          >
            Book On Vagaro
          </a>
        </aside>
      </div>

      <div className="menu-text-grid">
        {services.map((service, index) => (
          <motion.article
            key={service.id}
            className="menu-text-item"
            initial={cardMotion.initial}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={reduceMotion ? undefined : { once: true, amount: 0.32 }}
            transition={reduceMotion ? cardMotion.transition : cardMotion.transition(index)}
            whileHover={cardMotion.whileHover}
            style={isCompactLayout ? { padding: '1rem', gap: '0.45rem' } : undefined}
          >
            <div>
              <div
                className="menu-card-top"
                style={isCompactLayout ? { flexDirection: 'column', gap: '0.35rem' } : undefined}
              >
                <p className="menu-item-eyebrow">0{index + 1}</p>
                <span className="menu-price-pill">{service.priceRange}</span>
              </div>
              <h3 style={isCompactLayout ? { fontSize: '1.5rem', lineHeight: 1.02 } : undefined}>
                {service.name}
              </h3>
              <p className="menu-item-note">{getServiceNote(service.id)}</p>
              <p style={isCompactLayout ? { lineHeight: 1.55 } : undefined}>{service.shortDescription}</p>
              <ul
                className="menu-chip-row"
                style={isCompactLayout ? { display: 'grid', gap: '0.4rem' } : undefined}
              >
                {service.highlights.map((highlight) => (
                  <li key={highlight} className="menu-chip">
                    {highlight}
                  </li>
                ))}
              </ul>
              <a
                className="service-book-link"
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Book ${service.name} on Vagaro`}
                style={
                  isCompactLayout
                    ? {
                        width: '100%',
                        minHeight: '48px',
                        padding: '0.82rem 1rem',
                        fontSize: '0.94rem',
                      }
                    : undefined
                }
              >
                Book {service.name} on Vagaro
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionReveal>
  );
}
