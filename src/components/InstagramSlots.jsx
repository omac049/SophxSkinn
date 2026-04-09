import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import SectionReveal from './SectionReveal';

const placeholders = [
  'Soft glam closeups',
  'Brow mapping notes',
  'Lash lift before and after',
  'Waxing prep tips',
  'Glow reset moments',
  'Open booking windows',
];

const feedTones = [
  { bg: 'linear-gradient(155deg, rgba(240,213,206,0.5) 0%, rgba(255,252,250,0.98) 100%)', border: 'rgba(191,138,130,0.4)' },
  { bg: 'linear-gradient(155deg, rgba(222,181,173,0.4) 0%, rgba(255,252,250,0.98) 100%)', border: 'rgba(160,99,90,0.35)' },
  { bg: 'linear-gradient(155deg, rgba(191,138,130,0.2) 0%, rgba(255,252,250,0.98) 100%)', border: 'rgba(222,181,173,0.4)' },
  { bg: 'linear-gradient(155deg, rgba(240,213,206,0.35) 0%, rgba(248,243,240,0.98) 100%)', border: 'rgba(240,213,206,0.5)' },
  { bg: 'linear-gradient(155deg, rgba(255,252,250,0.98) 0%, rgba(240,213,206,0.4) 100%)', border: 'rgba(191,138,130,0.35)' },
  { bg: 'linear-gradient(155deg, rgba(255,252,250,0.98) 0%, rgba(222,181,173,0.35) 100%)', border: 'rgba(160,99,90,0.3)' },
];

const MOBILE_COMPACT_QUERY = '(max-width: 768px)';

const getFeedToneStyle = (tone) => ({
  background: tone.bg,
  borderColor: tone.border,
  boxShadow: '0 14px 28px rgba(40, 27, 16, 0.08)',
});

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

export default function InstagramSlots({ bookingUrl = 'https://www.vagaro.com/theremedy?utm_source=sphxskinn.com' }) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const isCompactViewport = useMediaQuery(MOBILE_COMPACT_QUERY);
  const visibleSlots = isCompactViewport ? placeholders.slice(0, 4) : placeholders;
  const buttonStyle = isCompactViewport ? { width: '100%' } : undefined;

  return (
    <SectionReveal className="instagram-slot-block" as="section">
      <div className="signature-services-head">
        <div className="section-headline signature-services-headline">
          <p className="eyebrow">Social Content Plan</p>
          <h2>Pretty little studio moments</h2>
          <p>
            A curated preview of skin clips, brow details, and live booking reminders with a soft,
            polished feel.
          </p>
        </div>

        <a className="book-button" href={bookingUrl} target="_blank" rel="noreferrer" style={buttonStyle}>
          Book On Vagaro
        </a>
      </div>

      <p className="slot-note">Use this space for your newest reels, treatment closeups, and appointment reminders.</p>

      <ul className="instagram-slot-grid" aria-label="Instagram media placeholders">
        {visibleSlots.map((slot, index) => {
          const tone = feedTones[index % feedTones.length];
          const ItemTag = shouldReduceMotion ? 'li' : motion.li;
          const LabelTag = shouldReduceMotion ? 'span' : motion.span;
          const itemProps = shouldReduceMotion
            ? {}
            : {
                initial: { opacity: 0, y: 24, rotate: index % 2 === 0 ? -2 : 2, scale: 0.98 },
                whileInView: { opacity: 1, y: 0, rotate: 0, scale: 1 },
                viewport: { once: true, amount: 0.3 },
                transition: { type: 'spring', stiffness: 220, damping: 20, delay: index * 0.05 },
                whileHover: { y: -6, scale: 1.02, rotate: 0 },
              };
          const labelProps = shouldReduceMotion || isCompactViewport
            ? {}
            : {
                animate: { y: [0, -3, 0] },
                transition: { duration: 4.2 + index * 0.25, repeat: Infinity, ease: 'easeInOut' },
              };

          return (
            <ItemTag key={slot} style={getFeedToneStyle(tone)} {...itemProps}>
              <LabelTag {...labelProps}>{slot}</LabelTag>
            </ItemTag>
          );
        })}
      </ul>

      <a
        className="ghost-button social-link-button"
        href="https://www.instagram.com/sophxskinn/"
        target="_blank"
        rel="noreferrer"
        style={buttonStyle}
      >
        See more on Instagram
      </a>
    </SectionReveal>
  );
}
