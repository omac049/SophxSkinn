import { motion, useReducedMotion } from 'framer-motion';
import SectionReveal from './SectionReveal';

export default function ImageMosaic({ eyebrow, title, videos = [], bookingUrl }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <SectionReveal className="image-mosaic" as="section">
      <div className="section-headline">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>

      <div className="image-mosaic-grid">
        {videos.map((video, index) => (
          <motion.div
            className="mosaic-tile"
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
            <div className="mosaic-overlay" aria-hidden="true" />
            <div className="mosaic-content">
              {video.label && <p className="mosaic-label">{video.label}</p>}
              {video.tagline && <p className="mosaic-tagline">{video.tagline}</p>}
              {bookingUrl && (
                <a
                  className="mosaic-cta"
                  href={bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Book now
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionReveal>
  );
}
