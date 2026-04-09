import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const defaultTrustPoints = [
  'Real-time availability',
  'Instant online confirmation',
  'Secure checkout on Vagaro',
];

const MOBILE_COMPACT_QUERY = '(max-width: 768px)';

const getHrefProps = (href) =>
  /^https?:\/\//i.test(href)
    ? {
        href,
        target: '_blank',
        rel: 'noreferrer',
      }
    : {
        href,
      };

const normalizeProofChip = (item) => {
  if (typeof item === 'string') {
    return { label: item };
  }

  return {
    label: item?.label ?? item?.text ?? item?.value ?? '',
    detail: item?.detail ?? '',
  };
};

const normalizeProofStat = (item) => {
  if (typeof item === 'string') {
    return { value: item, label: '' };
  }

  return {
    value: item?.value ?? item?.label ?? '',
    label: item?.label ?? item?.detail ?? '',
  };
};

const normalizeStep = (item, index) => {
  if (typeof item === 'string') {
    return {
      title: item,
      description: '',
      kicker: `Step ${index + 1}`,
    };
  }

  return {
    title: item?.title ?? item?.label ?? item?.heading ?? `Step ${index + 1}`,
    description: item?.description ?? item?.body ?? item?.detail ?? '',
    kicker: item?.kicker ?? item?.eyebrow ?? `Step ${index + 1}`,
  };
};

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

export default function PrimaryCTA({
  eyebrow = 'Next step',
  heading,
  body,
  buttonLabel,
  buttonHref,
  helper = 'Select your service, pick your time, and confirm in under a minute.',
  trustPoints = defaultTrustPoints,
  steps = [],
  proofChips = [],
  proofPoints = [],
  proofStats = [],
  microNote = '',
  conciergePromise = '',
  availabilityNote = '',
  secondaryActionLabel = '',
  secondaryActionHref = '',
}) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const isCompactViewport = useMediaQuery(MOBILE_COMPACT_QUERY);
  const visibleTrustPoints = isCompactViewport ? trustPoints.slice(0, 2) : trustPoints;
  const buttonStyle = isCompactViewport ? { width: '100%' } : undefined;
  const resolvedMicroNote = microNote || conciergePromise;
  const resolvedProofChips = proofChips.length > 0 ? proofChips : proofPoints;
  const hasConciergeDetails =
    steps.length > 0 ||
    resolvedProofChips.length > 0 ||
    proofStats.length > 0 ||
    Boolean(resolvedMicroNote) ||
    Boolean(availabilityNote) ||
    Boolean(secondaryActionLabel && secondaryActionHref);
  const normalizedSteps = steps.map((step, index) => normalizeStep(step, index));
  const normalizedProofChips = (resolvedProofChips.length > 0 ? resolvedProofChips : visibleTrustPoints).map(normalizeProofChip);
  const normalizedProofStats = proofStats.map(normalizeProofStat);
  const showSecondaryAction = Boolean(secondaryActionLabel && secondaryActionHref);

  const variants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, y: isCompactViewport ? 14 : 20, scale: 0.99 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
            when: 'beforeChildren',
            staggerChildren: 0.08,
          },
        },
      };

  const renderDefaultContent = (motionEnabled) => {
    const Paragraph = motionEnabled ? motion.p : 'p';
    const Heading = motionEnabled ? motion.h2 : 'h2';
    const List = motionEnabled ? motion.ul : 'ul';
    const ListItem = motionEnabled ? motion.li : 'li';
    const Link = motionEnabled ? motion.a : 'a';
    const itemMotionProps = motionEnabled ? { variants: itemVariants } : {};
    const linkMotionProps = motionEnabled
      ? {
          variants: itemVariants,
          whileHover: isCompactViewport ? undefined : { scale: 1.02, y: -1 },
          whileTap: isCompactViewport ? undefined : { scale: 0.985 },
        }
      : {};

    return (
      <>
        <Paragraph className="eyebrow" {...itemMotionProps}>
          {eyebrow}
        </Paragraph>
        <Heading {...itemMotionProps}>{heading}</Heading>
        <Paragraph {...itemMotionProps}>{body}</Paragraph>
        <Paragraph className="cta-helper" {...itemMotionProps}>
          {helper}
        </Paragraph>
        <List className="cta-trust" role="list" aria-label="Booking benefits" {...itemMotionProps}>
          {visibleTrustPoints.map((point) => (
            <ListItem
              key={point}
              role="listitem"
              {...(motionEnabled
                ? {
                    whileHover: isCompactViewport ? undefined : { y: -1, scale: 1.01 },
                  }
                : {})}
            >
              {point}
            </ListItem>
          ))}
        </List>
        <Link
          className="book-button large"
          {...getHrefProps(buttonHref)}
          style={buttonStyle}
          {...linkMotionProps}
        >
          {buttonLabel}
        </Link>
      </>
    );
  };

  const renderConciergeContent = (motionEnabled) => {
    const Container = motionEnabled ? motion.div : 'div';
    const Paragraph = motionEnabled ? motion.p : 'p';
    const Heading = motionEnabled ? motion.h2 : 'h2';
    const OrderedList = motionEnabled ? motion.ol : 'ol';
    const ListItem = motionEnabled ? motion.li : 'li';
    const Anchor = motionEnabled ? motion.a : 'a';
    const Span = motionEnabled ? motion.span : 'span';

    const containerProps = motionEnabled
      ? {
          variants: {
            hidden: { opacity: 0, y: isCompactViewport ? 14 : 18 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                when: 'beforeChildren',
                staggerChildren: 0.07,
              },
            },
          },
        }
      : {};

    const itemMotionProps = motionEnabled ? { variants: itemVariants } : {};
    const linkMotionProps = motionEnabled
      ? {
          variants: itemVariants,
          whileHover: isCompactViewport ? undefined : { scale: 1.02, y: -1 },
          whileTap: isCompactViewport ? undefined : { scale: 0.985 },
        }
      : {};

    return (
      <Container
        className="cta-concierge-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: isCompactViewport ? '1fr' : 'minmax(0, 1.15fr) minmax(260px, 0.85fr)',
          gap: isCompactViewport ? '1rem' : '1.25rem',
          alignItems: 'start',
          width: '100%',
        }}
        {...containerProps}
      >
        <div className="cta-copy" style={{ display: 'grid', gap: '0.85rem' }}>
          <Paragraph className="eyebrow" {...itemMotionProps}>
            {eyebrow}
          </Paragraph>
          <Heading {...itemMotionProps}>{heading}</Heading>
          <Paragraph {...itemMotionProps}>{body}</Paragraph>
          <Paragraph className="cta-helper" {...itemMotionProps}>
            {helper}
          </Paragraph>
          {resolvedMicroNote ? (
            <Paragraph className="cta-note" {...itemMotionProps}>
              {resolvedMicroNote}
            </Paragraph>
          ) : null}

          <div className="cta-actions" {...itemMotionProps}>
            <Anchor
              className="book-button large"
              {...getHrefProps(buttonHref)}
              style={buttonStyle}
              {...linkMotionProps}
            >
              {buttonLabel}
            </Anchor>
            {showSecondaryAction ? (
              <Anchor
                className="ghost-button"
                href={secondaryActionHref}
                style={buttonStyle}
                {...linkMotionProps}
              >
                {secondaryActionLabel}
              </Anchor>
            ) : null}
          </div>
        </div>

        <div className="cta-meta" style={{ display: 'grid', gap: '0.95rem' }}>
          {normalizedSteps.length > 0 ? (
            <div
              className="cta-steps"
              style={{
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '1rem',
                backdropFilter: 'blur(8px)',
              }}
              {...itemMotionProps}
            >
              <Paragraph className="cta-note">
                Concierge path
              </Paragraph>
              <OrderedList
                aria-label="Concierge booking steps"
                style={{
                  listStyle: 'none',
                  margin: '0.85rem 0 0',
                  padding: 0,
                  display: 'grid',
                  gap: '0.8rem',
                }}
              >
                {normalizedSteps.map((step, index) => (
                  <ListItem
                    key={`${step.title}-${index}`}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr',
                      gap: '0.75rem',
                      alignItems: 'start',
                    }}
                    {...(motionEnabled
                      ? {
                          variants: itemVariants,
                        }
                      : {})}
                  >
                    <Span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '2rem',
                        height: '2rem',
                        borderRadius: '999px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                      }}
                    >
                      {index + 1}
                    </Span>
                    <div style={{ display: 'grid', gap: '0.18rem' }}>
                      <Paragraph
                        style={{
                          margin: 0,
                          color: 'rgba(255, 250, 248, 0.7)',
                          fontSize: '0.76rem',
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {step.kicker}
                      </Paragraph>
                      <Paragraph
                        style={{
                          margin: 0,
                        color: 'rgba(255, 250, 248, 0.95)',
                        fontWeight: 600,
                        }}
                      >
                        {step.title}
                      </Paragraph>
                      {step.description ? (
                        <Paragraph
                          style={{
                            margin: 0,
                          color: 'rgba(255, 250, 248, 0.7)',
                          fontSize: '0.9rem',
                          }}
                        >
                          {step.description}
                        </Paragraph>
                      ) : null}
                    </div>
                  </ListItem>
                ))}
              </OrderedList>
            </div>
          ) : null}

          {normalizedProofStats.length > 0 ? (
            <div
              role="list"
              aria-label="Booking proof stats"
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.min(normalizedProofStats.length, isCompactViewport ? 2 : 3)}, minmax(0, 1fr))`,
                gap: '0.6rem',
              }}
              {...itemMotionProps}
            >
              {normalizedProofStats.map((stat, index) => (
                <div
                  key={`${stat.value}-${index}`}
                  role="listitem"
                  style={{
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '0.85rem 0.9rem',
                    display: 'grid',
                    gap: '0.2rem',
                  }}
                >
                  <strong
                    style={{
                      fontSize: '1.08rem',
                      lineHeight: 1.05,
                    }}
                  >
                    {stat.value}
                  </strong>
                  {stat.label ? (
                    <Paragraph
                      style={{
                        margin: 0,
                        color: '#fff1f1',
                        fontSize: '0.82rem',
                      }}
                    >
                      {stat.label}
                    </Paragraph>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}

          {availabilityNote ? (
            <Paragraph className="cta-note" {...itemMotionProps}>
              {availabilityNote}
            </Paragraph>
          ) : null}

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.55rem',
            }}
            {...itemMotionProps}
          >
            {normalizedProofChips.map((chip, index) => (
              <span
                key={`${chip.label}-${index}`}
                style={{
                  borderRadius: '999px',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  background: 'rgba(255, 255, 255, 0.06)',
                  color: 'rgba(255, 250, 248, 0.9)',
                  padding: '0.55rem 0.75rem',
                  fontSize: '0.82rem',
                  lineHeight: 1.1,
                }}
              >
                {chip.label}
                {chip.detail ? ` · ${chip.detail}` : ''}
              </span>
            ))}
          </div>
        </div>
      </Container>
    );
  };

  const itemVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, y: isCompactViewport ? 8 : 12 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        },
      };

  if (shouldReduceMotion) {
    return (
      <section className={`primary-cta${hasConciergeDetails ? ' primary-cta-concierge' : ''}`}>
        {hasConciergeDetails ? renderConciergeContent(false) : renderDefaultContent(false)}
      </section>
    );
  }

  return (
    <motion.section
      className={`primary-cta${hasConciergeDetails ? ' primary-cta-concierge' : ''}`}
      initial="hidden"
      whileInView="show"
      variants={variants}
      viewport={{ once: true, amount: 0.35 }}
    >
      <motion.div
        className="primary-cta-orb"
        aria-hidden="true"
        animate={isCompactViewport ? { opacity: 0.26 } : { opacity: [0.38, 0.68, 0.38], scale: [1, 1.02, 1] }}
        transition={isCompactViewport ? { duration: 0.8, ease: 'easeOut' } : { duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      {hasConciergeDetails ? renderConciergeContent(true) : renderDefaultContent(true)}
    </motion.section>
  );
}
