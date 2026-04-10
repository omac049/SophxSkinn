const base = import.meta.env.BASE_URL;
const asset = (path) => `${base}${path.startsWith('/') ? path.slice(1) : path}`;

export const siteContent = {
  brand: {
    name: 'SophxSkinn',
    subtitle: 'Licensed Esthetician',
    location: 'Goodyear, Arizona',
    tagline:
      'Skin rituals with a fashion-forward edge — boutique facials, brows, lashes, and waxing.',
    primaryCtaLabel: 'Book On Vagaro',
    primaryCtaUrl: 'https://www.vagaro.com/theremedy?utm_source=sphxskinn.com',
    salon: 'The Remedy Salon',
    address: '13375 W McDowell Rd #108, Goodyear, AZ 85395',
    addressStreet: '13375 W McDowell Rd #108',
    addressCity: 'Goodyear',
    addressState: 'AZ',
    addressZip: '85395',
    addressCountry: 'US',
    geo: { lat: 33.4634, lng: -112.3955 },
    phone: '',
    googleMapsUrl: 'https://www.google.com/maps/place/13375+W+McDowell+Rd+%23108,+Goodyear,+AZ+85395',
    scriptLogo: asset('assets/Sophxskinn.png'),
    altLogo: asset('assets/AB8A5850-BC05-46A2-90A2-BAFFF757C5E9.png'),
    clientVideos: [
      {
        src: asset('assets/videos/client-1.mp4'),
        title: 'Facial session',
        label: 'Facials',
        tagline: 'That just-got-a-facial glow — you know the one',
      },
      {
        src: asset('assets/videos/client-2.mp4'),
        title: 'Brow shaping',
        label: 'Brows',
        tagline: 'Brows so good they deserve their own close-up',
      },
      {
        src: asset('assets/videos/brow-before-after.mp4'),
        title: 'Brow before & after',
        label: 'Before & After',
        tagline: 'The before is cute. The after is obsession-worthy.',
      },
    ],
    estheticianImages: [
      {
        src: asset('assets/photos/esthetician/sophxskinn-1.jpg'),
        alt: 'SophxSkinn esthetician portrait',
        caption: 'In her element',
      },
      {
        src: asset('assets/photos/esthetician/sophxskinn-2.jpg'),
        alt: 'SophxSkinn esthetician branding portrait',
        caption: 'Precision at work',
      },
      {
        src: asset('assets/photos/esthetician/sophxskinn-3.jpg'),
        alt: 'SophxSkinn esthetician close-up portrait',
        caption: 'Soft-glam energy',
      },
      {
        src: asset('assets/photos/esthetician/sophxskinn-4.jpg'),
        alt: 'SophxSkinn esthetician professional portrait',
        caption: 'Detailed. Intentional. Always.',
      },
      {
        src: asset('assets/photos/esthetician/sophxskinn-5.jpg'),
        alt: 'SophxSkinn esthetician smiling portrait',
        caption: 'The vibe? Polished.',
      },
      {
        src: asset('assets/photos/esthetician/sophxskinn-6.jpg'),
        alt: 'SophxSkinn esthetician portrait in salon',
        caption: 'Curated from start to finish',
      },
      {
        src: asset('assets/photos/esthetician/sophxskinn-7.jpg'),
        alt: 'SophxSkinn esthetician signature portrait',
        caption: 'Beauty with a point of view',
      },
    ],
    clientImages: [
      {
        src: asset('assets/photos/clients/client-brows.png'),
        alt: 'Client brow service result',
        caption: 'Brow detail',
      },
      {
        src: asset('assets/photos/clients/client-brow-lamination.png'),
        alt: 'Client brow lamination result',
        caption: 'Brow lamination',
      },
      {
        src: asset('assets/photos/clients/client-lash.png'),
        alt: 'Client lash service result',
        caption: 'Lash result',
      },
      {
        src: asset('assets/photos/clients/client-lash-lift.png'),
        alt: 'Client lash lift result',
        caption: 'Lash lift',
      },
      {
        src: asset('assets/photos/clients/client-photo-1.jpeg'),
        alt: 'Client beauty service result',
        caption: 'Client glow',
      },
    ],
  },
  services: [
    {
      id: 'facials',
      name: 'Facials',
      shortDescription:
        'Hydration, texture, and the kind of glow that turns heads.',
      image: asset('assets/photos/clients/client-photo-1.jpeg'),
      imageAlt: 'Client facial glow result',
      priceRange: 'View live pricing and availability on Vagaro',
      highlights: ['Editorial-grade glow', 'Hydration that shows', 'Tailored to your skin story'],
    },
    {
      id: 'brows',
      name: 'Brows',
      shortDescription:
        'Sculpted arches that frame your face like the accessory it deserves.',
      image: asset('assets/photos/clients/client-brow-lamination.png'),
      imageAlt: 'Client brow lamination result',
      priceRange: 'View live pricing and availability on Vagaro',
      highlights: ['Architectural precision', 'Soft-sculpted cleanup', 'Red-carpet ready'],
    },
    {
      id: 'lashes',
      name: 'Lashes',
      shortDescription:
        'The finishing touch your look has been waiting for — effortless lift, serious definition.',
      image: asset('assets/photos/clients/client-lash-lift.png'),
      imageAlt: 'Client lash lift result',
      priceRange: 'View live pricing and availability on Vagaro',
      highlights: ['Wide-awake definition', 'Effortless flutter', 'Low-key luxury'],
    },
    {
      id: 'waxing',
      name: 'Waxing',
      shortDescription:
        'Polished, smooth skin with a comfort-first touch and luxe aftercare.',
      image: asset('assets/photos/esthetician/sophxskinn-4.jpg'),
      imageAlt: 'SophxSkinn waxing service',
      priceRange: 'View live pricing and availability on Vagaro',
      highlights: ['Gentle on skin, serious on smooth', 'Polished finish', 'Curated aftercare'],
    },
  ],
  testimonials: [
    {
      quote: "My skin has never looked this good. SophxSkinn changed my entire routine.",
      name: "Jasmine R.",
      service: "Facial",
    },
    {
      quote: "The lash lift was perfect — natural but so polished. I keep coming back.",
      name: "Maya T.",
      service: "Lash Lift",
    },
    {
      quote: "Finally found someone who understands brows. Clean, precise, stunning.",
      name: "Daniela V.",
      service: "Brows",
    },
  ],
  process: [
    {
      number: '01',
      title: 'Find Your Ritual',
      description: 'Browse the menu and pick the service that fits your moment.',
    },
    {
      number: '02',
      title: 'Secure Your Spot',
      description: 'Real-time availability, one-tap booking. Easier than online shopping.',
    },
    {
      number: '03',
      title: 'The Main Event',
      description: 'Settle into The Remedy Salon for a calm, fashion-forward treatment tailored to you.',
    },
    {
      number: '04',
      title: 'Walk Out Glowing',
      description: 'Leave with results that speak for themselves — plus aftercare that keeps the moment going.',
    },
  ],
  brandPillars: ['Precision', 'Polish', 'Intention'],
  editorialTagline: 'Where skincare gets its own runway moment.',
  social: {
    handle: '@sophxskinn',
    url: 'https://www.instagram.com/sophxskinn/',
    followers: 262,
    following: 243,
    posts: 60,
    snapshotDate: '2026-03-26',
  },
  faq: [
    {
      question: 'How do I book?',
      answer:
        'Tap Book On Vagaro, pick your service, and grab an open slot — real-time availability, instant confirmation.',
    },
    {
      question: 'Where are appointments located?',
      answer: 'The Remedy Salon — 13375 W McDowell Rd #108, Goodyear, AZ 85395. Easy parking, calm vibes.',
    },
    {
      question: 'Do you accept new clients?',
      answer: 'Always. New faces are the best part.',
    },
  ],
};
