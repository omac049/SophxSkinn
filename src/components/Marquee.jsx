import { useReducedMotion } from 'framer-motion';

export default function Marquee({ items = [] }) {
  const shouldReduceMotion = useReducedMotion();

  if (items.length === 0) return null;

  const duplicated = [...items, ...items, ...items, ...items];

  return (
    <div
      className="marquee-strip"
      aria-hidden="true"
      role="presentation"
    >
      <div
        className="marquee-track"
        style={shouldReduceMotion ? { animation: 'none' } : undefined}
      >
        {duplicated.map((item, i) => (
          <span key={`${item}-${i}`}>
            <span className="marquee-item">{item}</span>
            <span className="marquee-separator" aria-hidden="true">
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
