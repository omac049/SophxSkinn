import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import Marquee from '../components/Marquee';
import SectionReveal from '../components/SectionReveal';
import ServiceCategoryGrid from '../components/ServiceCategoryGrid';
import PrimaryCTA from '../components/PrimaryCTA';
import ImageMosaic from '../components/ImageMosaic';
import PhotoGallerySection from '../components/PhotoGallerySection';
import TestimonialSection from '../components/TestimonialSection';
import ProcessTimeline from '../components/ProcessTimeline';
import { absoluteUrl } from '../utils/seo';

export default function HomePage({ content }) {
  const { brand, services, testimonials, process: processSteps, brandPillars } = content;
  const canonical = absoluteUrl('/');

  const marqueeItems = brandPillars
    ? [...brandPillars, brand.name, 'Goodyear AZ', 'Book on Vagaro', ...brandPillars]
    : [brand.name, 'Licensed Esthetician', 'Goodyear AZ', 'Book on Vagaro'];

  return (
    <motion.div
      className="page-layer"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <Helmet>
        <title>SophxSkinn | Facials, Brows, Lashes & Waxing in Goodyear</title>
        <meta
          name="description"
          content="SophxSkinn delivers facials, brows, lashes, and waxing at The Remedy Salon in Goodyear, Arizona. Where skincare meets personal style."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="SophxSkinn | Goodyear AZ Esthetician" />
        <meta
          property="og:description"
          content="Book your next facial, brow, lash, or waxing session with SophxSkinn."
        />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={absoluteUrl('assets/Sophxskinn.png')} />
      </Helmet>

      <HeroSection brand={{ ...brand, brandPillars }} />

      <Marquee items={marqueeItems} />

      <ImageMosaic
        eyebrow="Studio Atmosphere"
        title="Studio moments"
        description="Short studio reels from recent sessions."
        videos={brand.clientVideos}
      />

      <PhotoGallerySection
        eyebrow="Meet SophxSkinn"
        title="Your esthetician"
        description="A closer look at the face behind SophxSkinn — polished, personal, and intentional care."
        signatureLine="Every appointment is tailored with intention, precision, and a soft-glam finish."
        images={brand.estheticianImages.slice(0, 6)}
        ariaLabel="SophxSkinn esthetician gallery"
      />

      <ProcessTimeline
        steps={processSteps}
        eyebrow="Your Visit"
        heading="From booking to glow"
      />

      <SectionReveal className="content-section signature-services-section" as="section">
        <div className="signature-services-orb" aria-hidden="true" />
        <div className="signature-services-head">
          <div className="section-headline signature-services-headline">
            <p className="eyebrow">Signature Services</p>
            <h2>Your glow edit</h2>
            <p>
              Pick the service that fits your goals, then book live on Vagaro.
            </p>
          </div>
          <a
            className="book-button signature-services-cta"
            href={brand.primaryCtaUrl}
            target="_blank"
            rel="noreferrer"
          >
            Book On Vagaro
          </a>
        </div>
        <ServiceCategoryGrid services={services} bookingUrl={brand.primaryCtaUrl} />
      </SectionReveal>

      <TestimonialSection testimonials={testimonials} />

      <PrimaryCTA
        eyebrow="Concierge Booking"
        heading="Reserve your next appointment"
        body="View live openings, choose your service, and secure your time in a few taps."
        helper="Most guests complete booking in under a minute."
        conciergePromise="A calm, one-on-one booking experience from start to finish."
        availabilityNote="Live Vagaro openings updated in real time."
        proofStats={[
          { value: 'Live', label: 'Opening updates' },
          { value: 'Fast', label: 'Checkout flow' },
          { value: 'Secure', label: 'Vagaro booking' },
        ]}
        proofPoints={[
          'Private concierge support',
          'Instant confirmation',
          'New clients welcome',
        ]}
        steps={[
          'Choose your service',
          'Review live openings',
          'Confirm your appointment',
        ]}
        secondaryActionLabel="View Services"
        secondaryActionHref="/services"
        buttonLabel={brand.primaryCtaLabel}
        buttonHref={brand.primaryCtaUrl}
      />
    </motion.div>
  );
}
