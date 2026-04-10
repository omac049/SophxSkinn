import { motion, useReducedMotion } from 'framer-motion';
import SectionReveal from './SectionReveal';

export default function ImageMosaic({ eyebrow, title, description, videos = [] }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionReveal className="image-mosaic" as="section">
      <div className="section-headline">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>

      <div className="image-mosaic-grid">
        {videos.map((video, index) => (
          <motion.div
            className={`mosaic-tile ${index === 0 ? 'tile-feature' : 'tile-tall'}`}
            key={video.src}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30, scale: 0.97 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={
              shouldReduceMotion
                ? undefined
                : { type: 'spring', stiffness: 180, damping: 22, delay: index * 0.1 }
            }
          >
            <video
              className="mosaic-video"
              src={video.src}
              muted
              autoPlay={!shouldReduceMotion}
              loop
              playsInline
              preload="metadata"
              aria-label={video.title}
            />
          </motion.div>
        ))}
      </div>
    </SectionReveal>
  );
}
