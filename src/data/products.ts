// Product data structure and constants

export interface ProductVariety {
  name: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  images?: string[]; // Multiple images for gallery
  videos?: string[];
  varieties: string[];
  sourceRegions: string[];
  availability: string;
  seasonInfo?: {
    peak?: string;
    mid?: string;
    off?: string;
  };
  exportGrades: string[];
  priceRange: string;
  packagingOptions: string[];
  shelfLife?: string;
  moq?: string;
  description: string;
  category: 'fruits' | 'vegetables' | 'herbs';
}

export { COMPANY_EMAIL, getQuotePath } from '@/lib/contact';

export const WHATSAPP_NUMBER = '254735497573';

export const getWhatsAppLink = (message: string) => 
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const whatsAppMessages = {
  general: 'Hello Shiloh Fresh Exporters, I would like to inquire about your export products and pricing. Please share more details.',
  fruits: 'Hello Shiloh Fresh Exporters, I am interested in your fruit exports. Please share available varieties, prices, and minimum order quantities.',
  vegetables: 'Hello Shiloh Fresh Exporters, I would like to request pricing and availability for your vegetable exports, including packaging and delivery options.',
  herbs: 'Hello Shiloh Fresh Exporters, I am interested in your fresh herbs for export. Please share pricing, availability, and shelf life details.',
  quote: (productName: string) => `Hello Shiloh Fresh Exporters, I would like to request a quotation for ${productName}. Please share pricing and availability.`,
};

// Fruits Data
export const fruitsData: Omit<Product, 'image'>[] = [
  {
    id: 'avocado',
    name: 'Avocado',
    varieties: ['Hass', 'Fuerte'],
    sourceRegions: ["Murang'a", 'Kiambu', 'Embu'],
    availability: 'March – September',
    seasonInfo: {
      peak: 'March – July (USD 1.20 – 1.60/kg)',
      mid: 'August – September (USD 1.70 – 2.20/kg)',
      off: 'October – February (USD 2.50 – 3.20/kg)',
    },
    exportGrades: ['Class I', 'Class II'],
    priceRange: 'USD 1.20 – 3.20 per kg',
    packagingOptions: ['4kg cartons', '10kg cartons', 'Custom packaging'],
    shelfLife: '21-28 days (cold chain)',
    moq: '1 ton',
    description: 'Premium Kenyan avocados known for their creamy texture and rich flavor. Hand-picked at optimal ripeness.',
    category: 'fruits',
  },
  {
    id: 'mangoes',
    name: 'Mangoes',
    varieties: ['Kent', 'Apple Mango', 'Ngowe', 'Tommy Atkins'],
    sourceRegions: ['Machakos', 'Makueni', 'Mombasa', 'Kwale'],
    availability: 'November – March',
    seasonInfo: {
      peak: 'December – February (USD 0.80 – 1.20/kg)',
      mid: 'November, March (USD 1.30 – 1.80/kg)',
    },
    exportGrades: ['Class I', 'Class II'],
    priceRange: 'USD 0.80 – 1.80 per kg',
    packagingOptions: ['5kg cartons', '7kg cartons', 'Custom packaging'],
    shelfLife: '14-21 days',
    moq: '500 kg',
    description: 'Sweet, juicy mangoes with minimal fiber content from Kenya\'s tropical coastal regions.',
    category: 'fruits',
  },
  {
    id: 'passion-fruit',
    name: 'Passion Fruit',
    varieties: ['Purple Passion', 'Yellow Passion'],
    sourceRegions: ['Kiambu', 'Meru', 'Embu', 'Thika'],
    availability: 'Year-round',
    exportGrades: ['Class I', 'Class II'],
    priceRange: 'USD 2.00 – 3.50 per kg',
    packagingOptions: ['2kg cartons', '5kg cartons'],
    shelfLife: '14-18 days',
    moq: '300 kg',
    description: 'Aromatic passion fruits bursting with tangy flavor, ideal for juices and desserts.',
    category: 'fruits',
  },
  {
    id: 'pineapple',
    name: 'Pineapple',
    varieties: ['MD2 (Extra Sweet)', 'Smooth Cayenne'],
    sourceRegions: ['Thika', 'Malindi', 'Kilifi'],
    availability: 'Year-round',
    exportGrades: ['Class I', 'Class II'],
    priceRange: 'USD 0.50 – 0.90 per kg',
    packagingOptions: ['Individual packaging', '10-12 per carton'],
    shelfLife: '21-28 days',
    moq: '500 kg',
    description: 'Extra sweet MD2 pineapples with golden flesh, harvested at peak ripeness.',
    category: 'fruits',
  },
  {
    id: 'tree-tomato',
    name: 'Tree Tomato (Tamarillo)',
    varieties: ['Red Tamarillo', 'Yellow Tamarillo'],
    sourceRegions: ['Eldoret', 'Nyandarua', 'Nyeri'],
    availability: 'March – October',
    exportGrades: ['Premium', 'Standard'],
    priceRange: 'USD 1.50 – 2.80 per kg',
    packagingOptions: ['3kg cartons', '5kg cartons'],
    shelfLife: '14-21 days',
    moq: '300 kg',
    description: 'Highland tree tomatoes with a tangy-sweet flavour, grown in Kenya\'s cooler elevations.',
    category: 'fruits',
  },
  {
    id: 'guava',
    name: 'Guava',
    varieties: ['White Guava', 'Pink Guava'],
    sourceRegions: ['Meru', 'Embu', 'Machakos'],
    availability: 'Year-round',
    exportGrades: ['Class I', 'Class II'],
    priceRange: 'USD 0.80 – 1.50 per kg',
    packagingOptions: ['4kg cartons', 'Custom packaging'],
    shelfLife: '10-14 days',
    moq: '300 kg',
    description: 'Aromatic guavas with sweet flesh, suitable for fresh markets and juice processing.',
    category: 'fruits',
  },
];

// Vegetables Data
export const vegetablesData: Omit<Product, 'image'>[] = [
  {
    id: 'french-beans',
    name: 'French Beans',
    varieties: ['Fine Beans', 'Extra Fine Beans', 'Bobby Beans'],
    sourceRegions: ['Kirinyaga', 'Nyeri', 'Meru', 'Nanyuki'],
    availability: 'Year-round (peak: May–October)',
    exportGrades: ['Extra Fine', 'Fine', 'Bobby'],
    priceRange: 'USD 1.80 – 2.50 per kg',
    packagingOptions: ['2kg cartons', '5kg export cartons'],
    shelfLife: '10-14 days',
    moq: '500 kg',
    description: 'Premium French beans grown in Kenya\'s ideal highland climate, known for their crisp texture.',
    category: 'vegetables',
  },
  {
    id: 'carrots',
    name: 'Carrots',
    varieties: ['Nantes', 'Chantenay'],
    sourceRegions: ['Nyandarua', 'Nakuru', 'Narok'],
    availability: 'Year-round',
    exportGrades: ['Class I', 'Class II'],
    priceRange: 'USD 0.60 – 1.00 per kg',
    packagingOptions: ['10kg export cartons', 'Bulk packaging'],
    shelfLife: '21-30 days',
    moq: '1 ton',
    description: 'Fresh, vibrant carrots with excellent color and crunch, grown in volcanic soils.',
    category: 'vegetables',
  },
  {
    id: 'chili-peppers',
    name: 'Chili Peppers',
    varieties: ["Bird's Eye", 'Cayenne', 'Habanero'],
    sourceRegions: ['Machakos', 'Makueni', 'Kajiado'],
    availability: 'June – February',
    exportGrades: ['Premium', 'Standard'],
    priceRange: 'USD 2.50 – 4.00 per kg',
    packagingOptions: ['1kg punnets', '5kg cartons'],
    shelfLife: '14-21 days',
    moq: '200 kg',
    description: 'Fiery chili peppers with intense heat and flavor, perfect for international markets.',
    category: 'vegetables',
  },
  {
    id: 'spring-onions',
    name: 'Spring Onions',
    varieties: ['White', 'Green'],
    sourceRegions: ['Kajiado', 'Kiambu', 'Nakuru'],
    availability: 'Year-round',
    exportGrades: ['Class I', 'Class II'],
    priceRange: 'USD 0.80 – 1.30 per kg',
    packagingOptions: ['Bunched', '5kg cartons'],
    shelfLife: '10-14 days',
    moq: '300 kg',
    description: 'Fresh spring onions with mild flavor, carefully handled for extended freshness.',
    category: 'vegetables',
  },
  {
    id: 'snow-peas',
    name: 'Snow Peas',
    varieties: ['Sugar Snap', 'Snow Peas'],
    sourceRegions: ['Naivasha', 'Nyandarua', 'Nyeri'],
    availability: 'Year-round',
    exportGrades: ['Premium', 'Standard'],
    priceRange: 'USD 3.00 – 4.50 per kg',
    packagingOptions: ['2kg cartons', '5kg cartons'],
    shelfLife: '10-14 days',
    moq: '300 kg',
    description: 'Crisp, sweet snow peas grown in Kenya\'s temperate highland regions.',
    category: 'vegetables',
  },
];

// Herbs Data
export const herbsData: Omit<Product, 'image'>[] = [
  {
    id: 'basil',
    name: 'Basil',
    varieties: ['Sweet Basil', 'Thai Basil', 'Lemon Basil'],
    sourceRegions: ['Kiambu', "Murang'a", 'Limuru'],
    availability: 'Year-round',
    exportGrades: ['Premium'],
    priceRange: 'USD 6.00 – 8.00 per kg',
    packagingOptions: ['Clamshell containers', 'Export cartons'],
    shelfLife: '7-10 days',
    moq: '50 kg',
    description: 'Aromatic sweet basil with intense flavor, carefully handled to preserve freshness.',
    category: 'herbs',
  },
  {
    id: 'rosemary',
    name: 'Rosemary',
    varieties: ['Common Rosemary'],
    sourceRegions: ['Nyeri', 'Nyandarua', 'Limuru'],
    availability: 'Year-round',
    exportGrades: ['Premium'],
    priceRange: 'USD 4.50 – 6.00 per kg',
    packagingOptions: ['Bunched', 'Clamshell containers'],
    shelfLife: '10-14 days',
    moq: '30 kg',
    description: 'Fragrant rosemary with strong pine-like aroma, perfect for culinary exports.',
    category: 'herbs',
  },
  {
    id: 'mint',
    name: 'Mint',
    varieties: ['Spearmint', 'Peppermint'],
    sourceRegions: ['Kiambu', 'Limuru', 'Naivasha'],
    availability: 'Year-round',
    exportGrades: ['Premium'],
    priceRange: 'USD 3.50 – 5.00 per kg',
    packagingOptions: ['Bunched', 'Clamshell containers', 'Cartons'],
    shelfLife: '7-10 days',
    moq: '50 kg',
    description: 'Fresh, cooling mint with vibrant green leaves and intense menthol aroma.',
    category: 'herbs',
  },
  {
    id: 'thyme',
    name: 'Thyme',
    varieties: ['Common Thyme', 'Lemon Thyme'],
    sourceRegions: ['Nyandarua', 'Nyeri'],
    availability: 'Seasonal',
    exportGrades: ['Premium'],
    priceRange: 'USD 5.00 – 7.00 per kg',
    packagingOptions: ['Bunched', 'Clamshell containers'],
    shelfLife: '10-14 days',
    moq: '30 kg',
    description: 'Earthy, aromatic thyme with small, flavorful leaves ideal for gourmet markets.',
    category: 'herbs',
  },
  {
    id: 'coriander',
    name: 'Coriander (Cilantro)',
    varieties: ['Common Coriander'],
    sourceRegions: ['Kiambu', 'Kajiado', 'Machakos'],
    availability: 'Year-round',
    exportGrades: ['Premium', 'Standard'],
    priceRange: 'USD 2.50 – 4.00 per kg',
    packagingOptions: ['Bunched', 'Clamshell containers'],
    shelfLife: '7-10 days',
    moq: '50 kg',
    description: 'Fresh coriander with bright, citrusy flavor, essential for international cuisines.',
    category: 'herbs',
  },
  {
    id: 'parsley',
    name: 'Parsley',
    varieties: ['Curly Parsley', 'Flat-Leaf (Italian)'],
    sourceRegions: ['Kiambu', 'Limuru', 'Naivasha'],
    availability: 'Year-round',
    exportGrades: ['Premium'],
    priceRange: 'USD 3.00 – 4.50 per kg',
    packagingOptions: ['Bunched', 'Clamshell containers'],
    shelfLife: '10-14 days',
    moq: '50 kg',
    description: 'Fresh, vibrant parsley with mild, slightly peppery flavor for garnishing and cooking.',
    category: 'herbs',
  },
];

// Filter options
export const regionOptions = [
  'All Regions',
  "Murang'a",
  'Kiambu',
  'Embu',
  'Meru',
  'Machakos',
  'Makueni',
  'Kirinyaga',
  'Nyeri',
  'Nyandarua',
  'Nakuru',
  'Naivasha',
  'Kajiado',
  'Limuru',
  'Thika',
  'Malindi',
  'Kilifi',
  'Nanyuki',
  'Narok',
];

export const availabilityOptions = [
  'All',
  'Year-round',
  'Seasonal',
  'In Season',
];

export const priceRangeOptions = [
  'All Prices',
  'Under USD 1/kg',
  'USD 1-3/kg',
  'USD 3-5/kg',
  'Over USD 5/kg',
];
