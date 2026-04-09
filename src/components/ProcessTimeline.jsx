import { motion, useReducedMotion } from 'framer-motion';

export default function ProcessTimeline({
  steps = [],
  eyebrow = 'Your Visit',
  heading = 'From booking to glow',
}) {
  const reduce = useReducedMotion() ?? false;

  if (steps.length === 0) return null;

  const fade = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section className="process-section">
      <div className="section-headline">
        <motion.p className="eyebrow" {...fade(0)}>
          {eyebrow}
        </motion.p>
        <motion.h2 {...fade(0.08)}>{heading}</motion.h2>
      </div>

      <div className="process-grid">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            className="process-step"
            {...fade(0.1 + index * 0.1)}
          >
            <span className="process-number">{step.number}</span>
            <p className="process-title">{step.title}</p>
            <p className="process-desc">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
