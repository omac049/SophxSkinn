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
import { absoluteUrl, getLocalBusinessSchema, getWebSiteSchema, getBreadcrumbSchema } from '../utils/seo';

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
        <title>SophxSkinn | Facials, Brows, Lashes & Waxing in Goodyear AZ</title>
        <meta
          name="description"
          content="SophxSkinn — Licensed esthetician at The Remedy Salon, 13375 W McDowell Rd #108, Goodyear, AZ 85395. Facials, brows, lashes & waxing. Book online today."
        />
        <link rel="canonical" href={canonical} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SophxSkinn" />
        <meta property="og:title" content="SophxSkinn | Goodyear AZ Esthetician" />
        <meta property="og:description" content="Licensed esthetician at The Remedy Salon, 13375 W McDowell Rd #108, Goodyear, AZ. Book facials, brows, lashes & waxing." />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://sophxskinn.com/assets/Sophxskinn.png" />
        <meta property="og:image:alt" content="SophxSkinn esthetician logo" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SophxSkinn | Facials, Brows, Lashes & Waxing in Goodyear AZ" />
        <meta name="twitter:description" content="Licensed esthetician at The Remedy Salon in Goodyear, AZ. Facials, brows, lashes & waxing." />
        <meta name="twitter:image" content="https://sophxskinn.com/assets/Sophxskinn.png" />
        <meta name="twitter:image:alt" content="SophxSkinn esthetician logo" />

        <script type="application/ld+json">
          {JSON.stringify(getLocalBusinessSchema())}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(getWebSiteSchema())}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(getBreadcrumbSchema([
            { name: 'Home', url: 'https://sophxskinn.com/' },
          ]))}
        </script>
      </Helmet>

      <HeroSection brand={{ ...brand, brandPillars }} />

      <Marquee items={marqueeItems} />

      <ImageMosaic
        eyebrow="Studio Diaries"
        title="Behind the glow"
        videos={brand.clientVideos}
        bookingUrl={brand.primaryCtaUrl}
      />

      <PhotoGallerySection
        eyebrow="The Face Behind the Brand"
        title="Meet your esthetician"
        description="Equal parts precision, personality, and impeccable taste — get to know the one behind every glow."
        signatureLine="Every appointment is intentional, precise, and finished with a soft-glam edge."
        images={brand.estheticianImages.slice(0, 6)}
        ariaLabel="SophxSkinn esthetician gallery"
      />

      <ProcessTimeline
        steps={processSteps}
        eyebrow="How It Works"
        heading="From tapping 'book' to walking out glowing"
      />

      <SectionReveal className="content-section signature-services-section" as="section">
        <div className="signature-services-orb" aria-hidden="true" />
        <div className="signature-services-head">
          <div className="section-headline signature-services-headline">
            <p className="eyebrow">Signature Services</p>
            <h2>Your glow edit</h2>
            <p>
              Find your perfect ritual, then lock in your time on Vagaro. No phone tag required.
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
        eyebrow="Ready When You Are"
        heading="Your next appointment is a tap away"
        body="Live openings, easy checkout, instant confirmation — booking should feel as good as the appointment."
        helper="Most clients book in under 60 seconds. Seriously."
        conciergePromise="No hold music. No back-and-forth. Just a smooth, one-tap booking flow."
        availabilityNote="Live Vagaro openings updated in real time."
        proofStats={[
          { value: 'Live', label: 'Opening updates' },
          { value: 'Fast', label: 'Checkout flow' },
          { value: 'Secure', label: 'Vagaro booking' },
        ]}
        proofPoints={[
          'VIP booking experience',
          'Instant confirmation',
          'New clients always welcome',
        ]}
        steps={[
          'Pick your ritual',
          'Browse live openings',
          'Lock in your time',
        ]}
        secondaryActionLabel="View Services"
        secondaryActionHref="/services"
        buttonLabel={brand.primaryCtaLabel}
        buttonHref={brand.primaryCtaUrl}
      />
    </motion.div>
  );
}
