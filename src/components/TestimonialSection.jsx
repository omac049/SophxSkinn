import { motion, useReducedMotion } from 'framer-motion';

export default function TestimonialSection({ testimonials = [] }) {
  const reduce = useReducedMotion() ?? false;

  if (testimonials.length === 0) return null;

  const containerVariants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            duration: 0.5,
            when: 'beforeChildren',
            staggerChildren: 0.12,
          },
        },
      };

  const cardVariants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 28 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <motion.section
      className="testimonial-section"
      initial="hidden"
      whileInView="show"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="section-headline">
        <p className="eyebrow">Client Voices</p>
        <h2>Real results, real words</h2>
        <p>What clients say after their SophxSkinn experience.</p>
      </div>

      <div className="testimonial-grid">
        {testimonials.map((t, index) => (
          <motion.div
            key={`${t.name}-${index}`}
            className="testimonial-card"
            variants={cardVariants}
            whileHover={reduce ? undefined : { y: -4, scale: 1.01 }}
          >
            <span className="testimonial-quote-mark" aria-hidden="true">
              &ldquo;
            </span>
            <p className="testimonial-quote">{t.quote}</p>
            <div className="testimonial-meta">
              <span className="testimonial-name">{t.name}</span>
              <span className="testimonial-service">{t.service}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
