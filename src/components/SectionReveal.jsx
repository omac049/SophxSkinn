import { motion, useReducedMotion } from 'framer-motion';

export default function SectionReveal({ as = 'section', className = '', children }) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const Tag = typeof as === 'string' ? as : 'section';

  if (shouldReduceMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[Tag] ?? motion.section;

  const variants = {
    hidden: { opacity: 0, y: 22, scale: 0.992 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.62,
        ease: [0.22, 1, 0.36, 1],
        when: 'beforeChildren',
        staggerChildren: 0.06,
      },
    },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      variants={variants}
      viewport={{ once: true, amount: 0.22 }}
    >
      {children}
    </MotionTag>
  );
}
