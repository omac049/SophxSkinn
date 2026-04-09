import { motion, useReducedMotion } from 'framer-motion';
import SectionReveal from './SectionReveal';

export default function ImageMosaic({ eyebrow, title, description, videos = [] }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionReveal className="image-mosaic" as="section">
      <div className="section-headline">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className="image-mosaic-grid">
        {videos.map((video, index) => (
          <motion.figure
            className={`mosaic-tile ${index === 2 ? 'tile-wide' : 'tile-tall'}`}
            key={video.src}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.6, delay: index * 0.12 }}
            whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }}
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
            <figcaption>{video.title}</figcaption>
          </motion.figure>
        ))}
      </div>
    </SectionReveal>
  );
}
