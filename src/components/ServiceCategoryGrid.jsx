import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const serviceTones = [
  {
    border: '#bf8a82',
    glow: 'rgba(222, 181, 173, 0.5)',
    tint: 'rgba(255, 252, 250, 0.98)',
    tintEnd: 'rgba(247, 235, 231, 0.98)',
    label: '#7a3f35',
  },
  {
    border: '#a0635a',
    glow: 'rgba(191, 138, 130, 0.4)',
    tint: 'rgba(255, 252, 250, 0.98)',
    tintEnd: 'rgba(245, 230, 226, 0.98)',
    label: '#6b3f36',
  },
  {
    border: '#deb5ad',
    glow: 'rgba(222, 181, 173, 0.25)',
    tint: 'rgba(255, 252, 250, 0.98)',
    tintEnd: 'rgba(250, 240, 237, 0.98)',
    label: '#7a4a42',
  },
  {
    border: '#f0d5ce',
    glow: 'rgba(240, 213, 206, 0.35)',
    tint: 'rgba(255, 253, 252, 0.98)',
    tintEnd: 'rgba(248, 237, 234, 0.98)',
    label: '#6b4038',
  },
];

const getServiceCardStyle = (tone) => ({
  background: `radial-gradient(circle at 88% 12%, ${tone.glow} 0%, transparent 28%), linear-gradient(170deg, ${tone.tint} 0%, ${tone.tintEnd} 100%)`,
  borderColor: tone.border,
});

const getServiceLinkStyle = (tone) => ({
  borderColor: tone.border,
  color: tone.label,
});

export default function ServiceCategoryGrid({ services, bookingUrl }) {
  const shouldReduceMotion = useReducedMotion();
  const [isCompactLayout, setIsCompactLayout] = useState(false);

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

  return (
    <div className="service-grid" role="list" aria-label="Service categories">
      {services.map((service, index) => {
        const tone = serviceTones[index % serviceTones.length];
        const cardMotionProps = shouldReduceMotion
          ? {
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              whileHover: undefined,
              whileTap: undefined,
              transition: { duration: 0.24, ease: 'easeOut' },
            }
          : {
              initial: { opacity: 0, y: 26, rotate: index % 2 === 0 ? -0.6 : 0.6 },
              whileInView: { opacity: 1, y: 0, rotate: 0 },
              whileHover: isCompactLayout
                ? undefined
                : { y: -6, scale: 1.012, rotate: index % 2 === 0 ? -0.3 : 0.3 },
              whileTap: { scale: 0.99 },
              transition: { type: 'spring', stiffness: 260, damping: 22 },
            };
        const bookingLabel =
          isCompactLayout && service.priceRange === 'View live pricing and availability on Vagaro'
            ? 'Live pricing on Vagaro'
            : service.priceRange;
        const cardStyle = {
          ...getServiceCardStyle(tone),
          ...(isCompactLayout
            ? { padding: '1rem', gap: '0.55rem' }
            : null),
        };

        return (
          <motion.article
            className="service-item"
            key={service.id}
            role="listitem"
            viewport={{ once: true, amount: 0.25 }}
            {...cardMotionProps}
            style={cardStyle}
          >
            <header
              className="service-header"
              style={isCompactLayout ? { flexDirection: 'column', alignItems: 'flex-start', gap: '0.35rem' } : undefined}
            >
              <div className="service-header-title">
                <p className="service-index">0{index + 1}</p>
                <h3>{service.name}</h3>
              </div>
              <p
                className="service-kind"
                style={{
                  color: tone.label,
                  textAlign: isCompactLayout ? 'left' : 'right',
                  maxWidth: isCompactLayout ? '100%' : undefined,
                }}
              >
                Signature Menu
              </p>
            </header>

            <p className="service-description" style={isCompactLayout ? { lineHeight: 1.55 } : undefined}>
              {service.shortDescription}
            </p>
            <div
              className="service-pills"
              style={isCompactLayout ? { flexDirection: 'column', alignItems: 'stretch', gap: '0.45rem' } : undefined}
            >
              <span className="service-pill service-pill-price" style={{ borderColor: tone.border }}>
                {bookingLabel}
              </span>
              <span className="service-pill service-pill-live" style={{ borderColor: tone.border }}>
                Live booking
              </span>
            </div>

            <ul
              className="service-highlights"
              aria-label={`${service.name} highlights`}
              style={isCompactLayout ? { display: 'grid', gap: '0.5rem' } : undefined}
            >
              {service.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>

            {bookingUrl ? (
              <a
                className="service-book-link"
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  ...getServiceLinkStyle(tone),
                  ...(isCompactLayout
                    ? {
                        width: '100%',
                        minHeight: '48px',
                        padding: '0.84rem 1rem',
                        fontSize: '0.94rem',
                      }
                    : null),
                }}
              >
                Book this service
              </a>
            ) : null}
          </motion.article>
        );
      })}
    </div>
  );
}
