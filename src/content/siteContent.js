const base = import.meta.env.BASE_URL;
const asset = (path) => `${base}${path.startsWith('/') ? path.slice(1) : path}`;

export const siteContent = {
  brand: {
    name: 'SophxSkinn',
    subtitle: 'Licensed Esthetician',
    location: 'Goodyear, Arizona',
    tagline:
      'Boutique skin rituals with a fashion-forward finish — facials, brows, lashes, and waxing.',
    primaryCtaLabel: 'Book On Vagaro',
    primaryCtaUrl: 'https://www.vagaro.com/theremedy?utm_source=sphxskinn.com',
    salon: 'The Remedy Salon',
    scriptLogo: asset('assets/Sophxskinn.png'),
    altLogo: asset('assets/AB8A5850-BC05-46A2-90A2-BAFFF757C5E9.png'),
    clientVideos: [
      {
        src: asset('assets/videos/client-1.mp4'),
        title: 'Client Ritual 01',
      },
      {
        src: asset('assets/videos/client-2.mp4'),
        title: 'Client Ritual 02',
      },
      {
        src: asset('assets/videos/client-3.mp4'),
        title: 'Client Ritual 03',
      },
    ],
    estheticianImages: [
      {
        src: asset('assets/photos/esthetician/sophxskinn-1.jpg'),
        alt: 'SophxSkinn esthetician portrait',
        caption: 'SophxSkinn in studio',
      },
      {
        src: asset('assets/photos/esthetician/sophxskinn-2.jpg'),
        alt: 'SophxSkinn esthetician branding portrait',
        caption: 'Licensed esthetician',
      },
      {
        src: asset('assets/photos/esthetician/sophxskinn-3.jpg'),
        alt: 'SophxSkinn esthetician close-up portrait',
        caption: 'Soft-glam skin focus',
      },
      {
        src: asset('assets/photos/esthetician/sophxskinn-4.jpg'),
        alt: 'SophxSkinn esthetician professional portrait',
        caption: 'Refined service detail',
      },
      {
        src: asset('assets/photos/esthetician/sophxskinn-5.jpg'),
        alt: 'SophxSkinn esthetician smiling portrait',
        caption: 'Polished studio vibe',
      },
      {
        src: asset('assets/photos/esthetician/sophxskinn-6.jpg'),
        alt: 'SophxSkinn esthetician portrait in salon',
        caption: 'Concierge booking experience',
      },
      {
        src: asset('assets/photos/esthetician/sophxskinn-7.jpg'),
        alt: 'SophxSkinn esthetician signature portrait',
        caption: 'Beauty with care',
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
        'Targeted sessions designed around hydration, texture, and a glow you can wear anywhere.',
      priceRange: 'View live pricing and availability on Vagaro',
      highlights: ['Skin reset', 'Glow-focused hydration', 'Customized treatment plans'],
    },
    {
      id: 'brows',
      name: 'Brows',
      shortDescription:
        'Shape and finish work that frames your look — clean, balanced, runway-ready.',
      priceRange: 'View live pricing and availability on Vagaro',
      highlights: ['Shape and symmetry', 'Soft cleanup', 'Event-ready finishing'],
    },
    {
      id: 'lashes',
      name: 'Lashes',
      shortDescription:
        'Lift and definition that adds polish to every outfit, every day.',
      priceRange: 'View live pricing and availability on Vagaro',
      highlights: ['Natural lift look', 'Definition boost', 'Low-maintenance beauty'],
    },
    {
      id: 'waxing',
      name: 'Waxing',
      shortDescription:
        'Comfort-first smoothing with gentle prep and aftercare — skin ready for anything.',
      priceRange: 'View live pricing and availability on Vagaro',
      highlights: ['Comfort-minded approach', 'Clean finish', 'Aftercare support'],
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
      title: 'Choose Your Service',
      description: 'Browse facials, brows, lashes, or waxing and find the ritual that fits.',
    },
    {
      number: '02',
      title: 'Book on Vagaro',
      description: 'Pick your time from live availability and confirm in under a minute.',
    },
    {
      number: '03',
      title: 'Your Session',
      description: 'Arrive at The Remedy Salon for a calm, tailored appointment.',
    },
    {
      number: '04',
      title: 'Glow Forward',
      description: 'Leave with results you can see and aftercare you can trust.',
    },
  ],
  brandPillars: ['Precision', 'Polish', 'Intention'],
  editorialTagline: 'Where skincare meets personal style.',
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
        'Use the Book On Vagaro button to choose your service, view real-time openings, and confirm online.',
    },
    {
      question: 'Where are appointments located?',
      answer: 'Appointments are hosted at The Remedy Salon in Goodyear, Arizona.',
    },
    {
      question: 'Do you accept new clients?',
      answer: 'Yes. SophxSkinn is currently accepting new clients.',
    },
  ],
};
