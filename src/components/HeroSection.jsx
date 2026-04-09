import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function HeroSection({ brand }) {
  const shouldReduceMotion = useReducedMotion();

  const heroImage = brand.estheticianImages?.[0]?.src ?? brand.scriptLogo;

  const containerVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            when: 'beforeChildren',
            staggerChildren: 0.12,
          },
        },
      };

  const itemVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const imgVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, scale: 1.08 },
        show: {
          opacity: 1,
          scale: 1,
          transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <motion.img
        className="hero-bg-img"
        src={heroImage}
        alt=""
        aria-hidden="true"
        variants={imgVariants}
        initial="hidden"
        animate="show"
      />

      <motion.div
        className="hero-content"
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        <motion.div className="hero-kicker-wrap" variants={itemVariants}>
          <p className="eyebrow hero-kicker">
            {brand.subtitle} · {brand.location}
          </p>
        </motion.div>

        <motion.img
          className="hero-logo"
          src={brand.scriptLogo}
          alt="SophxSkinn"
          variants={itemVariants}
        />

        <motion.h1 id="hero-heading" className="hero-title headline-serif" variants={itemVariants}>
          Beauty with intention, results with edge.
        </motion.h1>

        <motion.p className="hero-copy" variants={itemVariants}>
          Boutique skin rituals at {brand.salon} — where skincare meets personal style.
        </motion.p>

        <motion.div className="hero-actions" variants={itemVariants}>
          <motion.a
            className="book-button large"
            href={brand.primaryCtaUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.03, y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          >
            {brand.primaryCtaLabel}
          </motion.a>
          <motion.div
            whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
          >
            <Link className="ghost-button" to="/services">
              View Services
            </Link>
          </motion.div>
        </motion.div>

        {brand.brandPillars && (
          <motion.div className="hero-pillars" variants={itemVariants}>
            {brand.brandPillars.map((pillar, i) => (
              <span key={pillar}>
                {i > 0 && <span className="hero-pillar-sep">·</span>}
                {pillar}
              </span>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
