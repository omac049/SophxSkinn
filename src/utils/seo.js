const base = import.meta.env.BASE_URL;

export function absoluteUrl(path = '/') {
  if (typeof window === 'undefined') {
    return path;
  }

  const resolved = path.startsWith('/')
    ? `${base}${path.slice(1)}`
    : `${base}${path}`;

  return new URL(resolved, window.location.origin).toString();
}

const BUSINESS_INFO = {
  name: 'SophxSkinn',
  legalName: 'SophxSkinn',
  url: 'https://sophxskinn.com',
  logo: 'https://sophxskinn.com/assets/Sophxskinn.png',
  image: 'https://sophxskinn.com/assets/Sophxskinn.png',
  description:
    'Licensed esthetician offering facials, brows, lashes, and waxing at The Remedy Salon in Goodyear, Arizona.',
  telephone: '',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '13375 W McDowell Rd #108',
    addressLocality: 'Goodyear',
    addressRegion: 'AZ',
    postalCode: '85395',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 33.4634,
    longitude: -112.3955,
  },
  sameAs: ['https://www.instagram.com/sophxskinn/'],
  openingHoursSpecification: [],
};

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    ...BUSINESS_INFO,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Esthetician Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Facials', description: 'Targeted sessions designed around hydration, texture, and a glow you can wear anywhere.' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Brows', description: 'Shape and finish work that frames your look — clean, balanced, runway-ready.' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Lashes', description: 'Lift and definition that adds polish to every outfit, every day.' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Waxing', description: 'Comfort-first smoothing with gentle prep and aftercare — skin ready for anything.' },
        },
      ],
    },
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SophxSkinn',
    url: 'https://sophxskinn.com',
    description: BUSINESS_INFO.description,
    publisher: {
      '@type': 'Organization',
      name: 'SophxSkinn',
      logo: { '@type': 'ImageObject', url: BUSINESS_INFO.logo },
    },
  };
}

export function getBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getFAQSchema(faqItems) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
