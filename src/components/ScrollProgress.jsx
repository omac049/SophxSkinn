import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

function ReducedMotionProgress() {
  const { scrollYProgress } = useScroll();

  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
}

function AnimatedProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.3,
  });

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

export default function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion();

  return shouldReduceMotion ? <ReducedMotionProgress /> : <AnimatedProgress />;
}
