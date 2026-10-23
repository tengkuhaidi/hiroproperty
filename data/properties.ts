export interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: string;
  priceNumeric: number;
  category: 'Villa' | 'House' | 'Penthouse' | 'Apartment' | 'Estate';
  bedrooms: number;
  bathrooms: number;
  areaSqFt: string;
  yearBuilt: number;
  architecturalStyle: string;
  tag?: string;
  image: string;
  gallery: string[];
  description: string;
  amenities: string[];
}

export const PROPERTIES: Property[] = [
  {
    id: 'prop-01',
    slug: 'oakridge-residence',
    title: 'Oakridge Residence',
    location: 'Austin, Texas',
    price: '$2,150,000',
    priceNumeric: 2150000,
    category: 'House',
    bedrooms: 4,
    bathrooms: 3,
    areaSqFt: '3,200',
    yearBuilt: 2021,
    architecturalStyle: 'Modern Hill Country',
    tag: 'NEW',
    image: '/images/modern.jpg',
    gallery: ['/images/modern.jpg', '/images/lounge.jpg', '/images/studio.jpg'],
    description: 'Set into a gentle slope in the Austin hills, Oakridge Residence balances raw board-formed concrete with warm cedar and expansive walls of glass. Designed for indoor-outdoor living, the residence captures cooling cross-breezes and sweeping canyon views while maintaining absolute privacy.',
    amenities: [
      'Cantilevered infinity-edge pool',
      'Board-formed concrete fireplace',
      'Custom white oak cabinetry throughout',
      'Fleetwood multi-slide pocket doors',
      'Tesla solar roof with Powerwall storage',
      'Dedicated wine cellar and tasting room'
    ]
  },
  {
    id: 'prop-02',
    slug: 'villa-solenne',
    title: 'Villa Solenne',
    location: 'Malibu, California',
    price: '$8,400,000',
    priceNumeric: 8400000,
    category: 'Villa',
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: '5,800',
    yearBuilt: 2023,
    architecturalStyle: 'Coastal Brutalism',
    tag: 'EXCLUSIVE',
    image: '/images/villa.jpg',
    gallery: ['/images/villa.jpg', '/images/living.jpg', '/images/lounge.jpg'],
    description: 'Commanding an elevated ridge above the Pacific Coast Highway, Villa Solenne is a tour de force of contemporary coastal architecture. Cast-in-place concrete pavilions open directly to panoramic ocean horizons, framing sunset views over the water from every room.',
    amenities: [
      'Private ocean-view infinity pool',
      'Sub-Zero and Wolf chef kitchen',
      'Direct private trail access to beach',
      'Integrated Lutron lighting & shades',
      'Three-car gallery garage with turntable'
    ]
  },
  {
    id: 'prop-03',
    slug: 'the-glass-house',
    title: 'The Glass House',
    location: 'Hampstead, London',
    price: '£6,200,000',
    priceNumeric: 7800000,
    category: 'House',
    bedrooms: 4,
    bathrooms: 4,
    areaSqFt: '4,100',
    yearBuilt: 2022,
    architecturalStyle: 'Minimalist Contemporary',
    tag: 'OFF-MARKET',
    image: '/images/night.jpg',
    gallery: ['/images/night.jpg', '/images/living.jpg', '/images/studio.jpg'],
    description: 'Tucked into a tranquil woodland enclave bordering Hampstead Heath, The Glass House is an extraordinary composition of structural glazing, patinated bronze, and dark charcoal brickwork. Light fills the open-plan interior through double-height atriums.',
    amenities: [
      'Internal courtyard garden with Japanese maple',
      'Bespoke Boffi kitchen and Dornbracht fixtures',
      'Basement wellness suite with sauna and plunge',
      'Underfloor geothermal radiant heating'
    ]
  },
  {
    id: 'prop-04',
    slug: 'skyline-penthouse',
    title: 'Skyline Penthouse',
    location: 'Tribeca, New York',
    price: '$12,500,000',
    priceNumeric: 12500000,
    category: 'Penthouse',
    bedrooms: 4,
    bathrooms: 5,
    areaSqFt: '6,400',
    yearBuilt: 2024,
    architecturalStyle: 'Modernist Penthouse',
    tag: 'NEW',
    image: '/images/living.jpg',
    gallery: ['/images/living.jpg', '/images/night.jpg', '/images/loft.jpg'],
    description: 'Occupying the entire top two floors of an iconic cast-iron restoration, this triplex penthouse offers 360-degree unobstructed vistas of Manhattan and the Hudson River, complete with a private wraparound landscaped terrace.',
    amenities: [
      'Private key-lock elevator entry',
      'Wraparound terrace with outdoor kitchen',
      'Primary suite with dual spa bathrooms',
      '24/7 white-glove doorman and concierge'
    ]
  },
  {
    id: 'prop-05',
    slug: 'casa-palma',
    title: 'Casa Palma',
    location: 'Miami Beach, Florida',
    price: '$6,800,000',
    priceNumeric: 6800000,
    category: 'Villa',
    bedrooms: 6,
    bathrooms: 7,
    areaSqFt: '7,100',
    yearBuilt: 2022,
    architecturalStyle: 'Tropical Modernist',
    image: '/images/colonial.jpg',
    gallery: ['/images/colonial.jpg', '/images/villa.jpg', '/images/white.jpg'],
    description: 'An architectural sanctuary in the Venetian Islands, Casa Palma synthesizes organic limestone, rich ipe timber, and lush subtropical landscaping into a peaceful residential compound on deep waterfront.',
    amenities: [
      '100 feet of prime water frontage with dock',
      'Zero-edge saltwater lap pool',
      'Rooftop stargazing deck with summer kitchen',
      'Gated motor court with lush perimeter foliage'
    ]
  },
  {
    id: 'prop-06',
    slug: 'atelier-loft',
    title: 'Atelier Loft',
    location: 'SoHo, New York',
    price: '$4,600,000',
    priceNumeric: 4600000,
    category: 'Apartment',
    bedrooms: 3,
    bathrooms: 3,
    areaSqFt: '3,800',
    yearBuilt: 2020,
    architecturalStyle: 'Cast-Iron Classic',
    image: '/images/loft.jpg',
    gallery: ['/images/loft.jpg', '/images/living.jpg', '/images/studio.jpg'],
    description: 'Authentic 19th-century cast-iron loft masterfully updated by renowned minimalist architects. Features original timber beams, 13-foot ceilings, and museum-grade gallery lighting throughout.',
    amenities: [
      'Original restored Corinthian columns',
      'Custom blackened-steel pivot doors',
      'Private keyed elevator directly into residence'
    ]
  },
  {
    id: 'prop-07',
    slug: 'stonehaven-cottage',
    title: 'Stonehaven Estate',
    location: 'Cotswolds, United Kingdom',
    price: '£3,950,000',
    priceNumeric: 4950000,
    category: 'Estate',
    bedrooms: 5,
    bathrooms: 5,
    areaSqFt: '5,200',
    yearBuilt: 2021,
    architecturalStyle: 'Contemporary English Country',
    image: '/images/cottage.jpg',
    gallery: ['/images/cottage.jpg', '/images/white.jpg', '/images/colonial.jpg'],
    description: 'Rooted in Cotswold honey stone, Stonehaven reinterprets pastoral English estate architecture through a crisp contemporary lens. Surrounding formal parterre gardens give way to wildflower meadows.',
    amenities: [
      '14 acres of private private parkland',
      'Converted stone barn guest house',
      'Natural swimming pond and glasshouse'
    ]
  },
  {
    id: 'prop-08',
    slug: 'villa-blanca',
    title: 'Villa Blanca',
    location: 'Ibiza, Spain',
    price: '€5,200,000',
    priceNumeric: 5600000,
    category: 'Villa',
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: '6,000',
    yearBuilt: 2023,
    architecturalStyle: 'Balearic Modernism',
    image: '/images/white.jpg',
    gallery: ['/images/white.jpg', '/images/villa.jpg', '/images/night.jpg'],
    description: 'Sculpted into the pine-clad hills of San José, Villa Blanca embraces traditional whitewashed finca volumes translated into soaring, monolithic modernist geometry overlooking the Mediterranean Sea.',
    amenities: [
      'Panoramic sunset and sea views',
      '20-meter infinity pool with submerged seating',
      'Full outdoor cinema and dining pergola'
    ]
  }
];
