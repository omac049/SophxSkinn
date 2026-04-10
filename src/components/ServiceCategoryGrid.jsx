import { motion, useReducedMotion } from 'framer-motion';

export default function ServiceCategoryGrid({ services, bookingUrl }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="service-grid" role="list" aria-label="Service categories">
      {services.map((service, index) => {
        const motionProps = reduceMotion
          ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.3 } }
          : {
              initial: { opacity: 0, y: 40, scale: 0.97 },
              whileInView: { opacity: 1, y: 0, scale: 1 },
              transition: {
                type: 'spring',
                stiffness: 200,
                damping: 24,
                delay: index * 0.08,
              },
            };

        return (
          <motion.article
            className="service-tile"
            key={service.id}
            role="listitem"
            viewport={{ once: true, amount: 0.2 }}
            {...motionProps}
          >
            <div className="service-tile-img-wrap">
              <img
                className="service-tile-img"
                src={service.image}
                alt={service.imageAlt}
                loading="lazy"
              />
            </div>

            <div className="service-tile-content">
              <p className="service-tile-index">0{index + 1}</p>
              <h3 className="service-tile-name">{service.name}</h3>
              <p className="service-tile-desc">{service.shortDescription}</p>
              {bookingUrl && (
                <a
                  className="service-tile-cta"
                  href={bookingUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Book now
                </a>
              )}
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
