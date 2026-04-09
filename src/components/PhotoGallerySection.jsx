import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export default function PhotoGallerySection({
  eyebrow,
  title,
  description,
  signatureLine = '',
  images = [],
  ariaLabel,
}) {
  const reduce = useReducedMotion() ?? false;
  const sectionRef = useRef(null);
  const featured = images[0];
  const mosaic = images.slice(1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const featuredScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.03]);

  const fade = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section className="meet-section" ref={sectionRef} aria-label={ariaLabel ?? title}>
      <div className="meet-spread">
        {featured && (
          <motion.div
            className="meet-featured"
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, scale: 1.04 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true, amount: 0.15 },
                  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
                })}
          >
            <motion.img
              src={featured.src}
              alt={featured.alt}
              loading="lazy"
              decoding="async"
              style={reduce ? undefined : { scale: featuredScale }}
            />
          </motion.div>
        )}

        <div className="meet-intro">
          <motion.p className="eyebrow" {...fade(0.12)}>
            {eyebrow}
          </motion.p>
          <motion.h2 {...fade(0.2)}>{title}</motion.h2>
          <motion.p {...fade(0.28)}>{description}</motion.p>
          {signatureLine && (
            <motion.p className="meet-signature" {...fade(0.36)}>
              {signatureLine}
            </motion.p>
          )}
        </div>
      </div>

      {mosaic.length > 0 && (
        <ul className="meet-mosaic" aria-label={`${title} gallery`}>
          {mosaic.map((image, index) => (
            <motion.li
              key={image.src}
              className="meet-mosaic-item"
              {...(reduce
                ? {}
                : {
                    initial: { opacity: 0, y: 28 },
                    whileInView: { opacity: 1, y: 0 },
                    viewport: { once: true, amount: 0.15 },
                    transition: {
                      duration: 0.6,
                      delay: 0.1 + index * 0.09,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  })}
            >
              <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
              {image.caption && <span className="meet-caption">{image.caption}</span>}
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  );
}
