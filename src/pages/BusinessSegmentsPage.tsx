import { useState } from 'react';
import { MessageCircle, MapPin, ChevronDown, ChevronUp, Tag, Hash, DollarSign, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { getWhatsAppLink, whatsAppMessages } from '@/data/products';
import heroImage from '@/assets/hero-farm.jpg';

// === Product Images ===
import avocadoHarvest from '@/assets/products/avocado-hass-harvest.jpg';
import avocadoExportBox from '@/assets/products/avocado-export-box.jpg';
import avocadoHalved from '@/assets/products/avocado-halved.jpg';
import avocadoFuerteHalved from '@/assets/products/avocado-fuerte-halved.jpg';
import avocadoOnTree from '@/assets/products/avocado-on-tree.jpg';
import avocadoCloseup from '@/assets/products/avocado-hass-closeup.jpg';
import avocadoExportBoxes from '@/assets/products/avocado-export-boxes.jpg';
import avocadoVarieties from '@/assets/products/avocado-varieties-labeled.jpg';
import pineappleHarvest from '@/assets/products/pineapple-harvest.jpg';
import pineappleImg from '@/assets/products/pineapple.jpg';
import passionFruitImg from '@/assets/products/passion-fruit.jpg';
import mangoesImg from '@/assets/products/mangoes.jpg';
import treeTomatoImg from '@/assets/products/tree-tomato.jpg';
import guavaImg from '@/assets/products/guava-fresh.jpg';
import frenchBeansImg from '@/assets/products/french-beans.jpg';
import carrotsImg from '@/assets/products/carrots.jpg';
import greenChiliesImg from '@/assets/products/green-chilies.jpg';
import chiliFarmImg from '@/assets/products/chili-farm.jpg';
import chiliPeppersImg from '@/assets/products/chili-peppers.jpg';
import springOnionsImg from '@/assets/products/spring-onions.jpg';
import snowPeasImg from '@/assets/products/snow-peas.jpg';
import okraImg from '@/assets/products/okra.jpg';
import basilImg from '@/assets/products/basil.jpg';
import rosemaryImg from '@/assets/products/rosemary.jpg';
import mintImg from '@/assets/products/mint.jpg';
import thymeImg from '@/assets/products/thyme.jpg';
import corianderImg from '@/assets/products/coriander.jpg';
import parsleyImg from '@/assets/products/parsley.jpg';
import avocadoFuerteGrass from '@/assets/products/avocado-fuerte-grass.jpg';
import avocadoFuerteBox from '@/assets/products/avocado-fuerte-box.jpg';
import chiliBirdseyeBox from '@/assets/products/chili-birdseye-box.jpg';
import chiliPackedPunnets from '@/assets/products/chili-packed-punnets.jpg';

// === Data ===
interface ProductItem {
  id: string;
  serialNo: string;
  name: string;
  images: string[];
  varieties: string[];
  origin: string[];
  availability: string;
  priceRange: string;
  exportGrades: string[];
  description: string;
}

interface ProductCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  products: ProductItem[];
}

const categories: ProductCategory[] = [
  {
    id: 'fruits',
    name: 'Fresh Fruits',
    description: 'Premium export-grade fruits sourced from East Africa\'s finest farms',
    color: 'hsl(var(--primary))',
    products: [
      {
        id: 'avocado',
        serialNo: 'SFE-FRT-001',
        name: 'Avocado',
        images: [avocadoExportBox, avocadoHarvest, avocadoVarieties, avocadoHalved, avocadoFuerteHalved, avocadoOnTree, avocadoCloseup, avocadoExportBoxes],
        varieties: ['Hass', 'Fuerte', 'Jumbo Hass'],
        origin: ['Kenya — Murang\'a, Kiambu, Embu', 'Tanzania — Arusha, Mbeya'],
        availability: 'March – September (Peak), Year-round limited',
        priceRange: 'USD 1.20 – 3.20 per kg',
        exportGrades: ['Class I', 'Class II'],
        description: 'Premium Kenyan & Tanzanian avocados known for creamy texture and rich flavor. Hand-picked at optimal ripeness for export markets.',
      },
      {
        id: 'mangoes',
        serialNo: 'SFE-FRT-002',
        name: 'Mangoes',
        images: [mangoesImg],
        varieties: ['Kent', 'Apple Mango', 'Ngowe', 'Tommy Atkins'],
        origin: ['Kenya — Machakos, Makueni, Mombasa', 'Tanzania — Dar es Salaam coast'],
        availability: 'November – March',
        priceRange: 'USD 0.80 – 1.80 per kg',
        exportGrades: ['Class I', 'Class II'],
        description: 'Sweet, juicy mangoes with minimal fiber content from East Africa\'s tropical coastal regions.',
      },
      {
        id: 'passion-fruit',
        serialNo: 'SFE-FRT-003',
        name: 'Passion Fruit',
        images: [passionFruitImg],
        varieties: ['Purple Passion', 'Yellow Passion'],
        origin: ['Kenya — Kiambu, Meru, Embu', 'Uganda — Central Region'],
        availability: 'Year-round',
        priceRange: 'USD 2.00 – 3.50 per kg',
        exportGrades: ['Class I', 'Class II'],
        description: 'Aromatic passion fruits bursting with tangy flavor, ideal for juices and desserts.',
      },
      {
        id: 'pineapple',
        serialNo: 'SFE-FRT-004',
        name: 'Pineapple',
        images: [pineappleHarvest, pineappleImg],
        varieties: ['MD2 (Extra Sweet)', 'Smooth Cayenne'],
        origin: ['Kenya — Thika, Malindi, Kilifi', 'Uganda — Kayunga, Luwero'],
        availability: 'Year-round',
        priceRange: 'USD 0.50 – 0.90 per kg',
        exportGrades: ['Class I', 'Class II'],
        description: 'Extra sweet MD2 pineapples with golden flesh, harvested at peak ripeness.',
      },
      {
        id: 'tree-tomato',
        serialNo: 'SFE-FRT-005',
        name: 'Tree Tomato (Tamarillo)',
        images: [treeTomatoImg],
        varieties: ['Red Tamarillo', 'Yellow Tamarillo'],
        origin: ['Kenya — Eldoret, Nyandarua, Nyeri'],
        availability: 'March – October',
        priceRange: 'USD 1.50 – 2.80 per kg',
        exportGrades: ['Premium', 'Standard'],
        description: 'Exotic tree tomatoes from Kenya\'s highlands, prized for their unique tangy-sweet flavor.',
      },
      {
        id: 'guava',
        serialNo: 'SFE-FRT-006',
        name: 'Guava',
        images: [guavaImg],
        varieties: ['White Guava', 'Pink Guava'],
        origin: ['Kenya — Meru, Embu, Machakos', 'Uganda — Eastern Region'],
        availability: 'Year-round',
        priceRange: 'USD 0.80 – 1.50 per kg',
        exportGrades: ['Class I', 'Class II'],
        description: 'Fresh, aromatic guavas with sweet flesh perfect for fresh consumption and processing.',
      },
    ],
  },
  {
    id: 'vegetables',
    name: 'Fresh Vegetables',
    description: 'Crisp, fresh vegetables grown under strict quality standards across East Africa',
    color: 'hsl(142, 71%, 45%)',
    products: [
      {
        id: 'french-beans',
        serialNo: 'SFE-VEG-001',
        name: 'French Beans',
        images: [frenchBeansImg],
        varieties: ['Fine Beans', 'Extra Fine Beans', 'Bobby Beans'],
        origin: ['Kenya — Kirinyaga, Nyeri, Meru, Nanyuki'],
        availability: 'Year-round (Peak: May–October)',
        priceRange: 'USD 1.80 – 2.50 per kg',
        exportGrades: ['Extra Fine', 'Fine', 'Bobby'],
        description: 'Premium French beans grown in Kenya\'s ideal highland climate, known for their crisp texture.',
      },
      {
        id: 'carrots',
        serialNo: 'SFE-VEG-002',
        name: 'Carrots',
        images: [carrotsImg],
        varieties: ['Nantes', 'Chantenay'],
        origin: ['Kenya — Nyandarua, Nakuru, Narok'],
        availability: 'Year-round',
        priceRange: 'USD 0.60 – 1.00 per kg',
        exportGrades: ['Class I', 'Class II'],
        description: 'Fresh, vibrant carrots with excellent color and crunch, grown in volcanic highland soils.',
      },
      {
        id: 'chili-peppers',
        serialNo: 'SFE-VEG-003',
        name: 'Chili Peppers',
        images: [greenChiliesImg, chiliPeppersImg, chiliFarmImg],
        varieties: ["Bird's Eye", 'Cayenne', 'Demon F1', 'Habanero'],
        origin: ['Kenya — Machakos, Makueni, Kirinyaga, Kajiado'],
        availability: 'Year-round',
        priceRange: 'USD 2.50 – 4.00 per kg',
        exportGrades: ['Premium', 'Standard'],
        description: 'Fiery chili peppers including the prolific Demon F1 variety, grown for export and local markets.',
      },
      {
        id: 'spring-onions',
        serialNo: 'SFE-VEG-004',
        name: 'Spring Onions',
        images: [springOnionsImg],
        varieties: ['White', 'Green'],
        origin: ['Kenya — Kajiado, Kiambu, Nakuru'],
        availability: 'Year-round',
        priceRange: 'USD 0.80 – 1.30 per kg',
        exportGrades: ['Class I', 'Class II'],
        description: 'Fresh spring onions with mild flavor, carefully handled for extended freshness.',
      },
      {
        id: 'snow-peas',
        serialNo: 'SFE-VEG-005',
        name: 'Snow Peas & Sugar Snaps',
        images: [snowPeasImg],
        varieties: ['Sugar Snap', 'Snow Peas'],
        origin: ['Kenya — Naivasha, Nyandarua, Nyeri'],
        availability: 'Year-round',
        priceRange: 'USD 3.00 – 4.50 per kg',
        exportGrades: ['Premium', 'Standard'],
        description: 'Crisp, sweet snow peas grown in Kenya\'s temperate highland regions.',
      },
      {
        id: 'okra',
        serialNo: 'SFE-VEG-006',
        name: 'Okra (Lady Fingers)',
        images: [okraImg],
        varieties: ['Green Okra', 'Clemson Spineless'],
        origin: ['Kenya — Machakos, Makueni', 'Tanzania — Morogoro'],
        availability: 'Year-round',
        priceRange: 'USD 1.50 – 2.50 per kg',
        exportGrades: ['Premium', 'Standard'],
        description: 'Fresh, tender okra pods ideal for export to Middle Eastern and Asian markets.',
      },
    ],
  },
  {
    id: 'herbs',
    name: 'Fresh Herbs',
    description: 'Aromatic culinary herbs carefully handled to preserve freshness and flavor',
    color: 'hsl(160, 60%, 45%)',
    products: [
      {
        id: 'basil',
        serialNo: 'SFE-HRB-001',
        name: 'Basil',
        images: [basilImg],
        varieties: ['Sweet Basil', 'Thai Basil', 'Lemon Basil'],
        origin: ['Kenya — Kiambu, Murang\'a, Limuru'],
        availability: 'Year-round',
        priceRange: 'USD 6.00 – 8.00 per kg',
        exportGrades: ['Premium'],
        description: 'Aromatic sweet basil with intense flavor, carefully handled to preserve freshness.',
      },
      {
        id: 'rosemary',
        serialNo: 'SFE-HRB-002',
        name: 'Rosemary',
        images: [rosemaryImg],
        varieties: ['Common Rosemary'],
        origin: ['Kenya — Nyeri, Nyandarua, Limuru'],
        availability: 'Year-round',
        priceRange: 'USD 4.50 – 6.00 per kg',
        exportGrades: ['Premium'],
        description: 'Fragrant rosemary with strong pine-like aroma, perfect for culinary exports.',
      },
      {
        id: 'mint',
        serialNo: 'SFE-HRB-003',
        name: 'Mint',
        images: [mintImg],
        varieties: ['Spearmint', 'Peppermint'],
        origin: ['Kenya — Kiambu, Limuru, Naivasha'],
        availability: 'Year-round',
        priceRange: 'USD 3.50 – 5.00 per kg',
        exportGrades: ['Premium'],
        description: 'Fresh, cooling mint with vibrant green leaves and intense menthol aroma.',
      },
      {
        id: 'thyme',
        serialNo: 'SFE-HRB-004',
        name: 'Thyme',
        images: [thymeImg],
        varieties: ['Common Thyme', 'Lemon Thyme'],
        origin: ['Kenya — Nyandarua, Nyeri'],
        availability: 'Seasonal',
        priceRange: 'USD 5.00 – 7.00 per kg',
        exportGrades: ['Premium'],
        description: 'Earthy, aromatic thyme with small, flavorful leaves ideal for gourmet markets.',
      },
      {
        id: 'coriander',
        serialNo: 'SFE-HRB-005',
        name: 'Coriander (Cilantro)',
        images: [corianderImg],
        varieties: ['Common Coriander'],
        origin: ['Kenya — Kiambu, Kajiado, Machakos'],
        availability: 'Year-round',
        priceRange: 'USD 2.50 – 4.00 per kg',
        exportGrades: ['Premium', 'Standard'],
        description: 'Fresh coriander with bright, citrusy flavor, essential for international cuisines.',
      },
      {
        id: 'parsley',
        serialNo: 'SFE-HRB-006',
        name: 'Parsley',
        images: [parsleyImg],
        varieties: ['Curly Parsley', 'Flat-Leaf (Italian)'],
        origin: ['Kenya — Kiambu, Limuru, Naivasha'],
        availability: 'Year-round',
        priceRange: 'USD 3.00 – 4.50 per kg',
        exportGrades: ['Premium'],
        description: 'Fresh, vibrant parsley with mild, slightly peppery flavor for garnishing and cooking.',
      },
    ],
  },
];

// === Components ===

function ProductCard({ product, index }: { product: ProductItem; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div
      className={cn(
        'bg-card rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-xl transition-all duration-500',
        'animate-fade-in-up'
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image Gallery */}
      <div className="relative h-56 overflow-hidden group">
        <img
          src={product.images[activeImage]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />

        {/* Serial Badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-background/90 text-foreground text-[10px] font-mono backdrop-blur-sm">
            <Hash className="w-3 h-3 mr-1" />
            {product.serialNo}
          </Badge>
        </div>

        {/* Image dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-14 left-0 right-0 flex justify-center gap-1.5">
            {product.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  i === activeImage ? 'bg-background w-4' : 'bg-background/50 hover:bg-background/80'
                )}
              />
            ))}
          </div>
        )}

        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-lg font-bold text-background">{product.name}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Varieties */}
        <div className="flex flex-wrap gap-1">
          {product.varieties.map((v) => (
            <Badge key={v} variant="secondary" className="text-[11px]">{v}</Badge>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 p-2.5 bg-primary/5 rounded-xl border border-primary/10">
          <DollarSign className="w-4 h-4 text-primary flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-primary">{product.priceRange}</p>
            <p className="text-[10px] text-muted-foreground">*Indicative pricing — subject to volume & season</p>
          </div>
        </div>

        {/* Origin */}
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <div className="text-xs text-muted-foreground">
            {product.origin.map((o, i) => (
              <p key={i}>{o}</p>
            ))}
          </div>
        </div>

        {/* Expandable Details */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs font-medium text-primary hover:underline w-full"
        >
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {expanded ? 'Show less' : 'More details'}
        </button>

        {expanded && (
          <div className="space-y-2 animate-fade-in-up text-xs text-muted-foreground border-t border-border pt-3">
            <p>{product.description}</p>
            <div className="flex items-start gap-2">
              <Tag className="w-3.5 h-3.5 text-primary mt-0.5" />
              <span>Grades: {product.exportGrades.join(', ')}</span>
            </div>
            <div className="flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-primary mt-0.5" />
              <span>Availability: {product.availability}</span>
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="flex gap-2 pt-1">
          <a
            href={getWhatsAppLink(whatsAppMessages.quote(product.name))}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button variant="whatsapp" size="sm" className="w-full gap-1.5 text-xs">
              <MessageCircle className="w-3.5 h-3.5" />
              Get a Quote
            </Button>
          </a>
          <a
            href={getWhatsAppLink(`Hello Shiloh Fresh, I'd like to get current pricing for ${product.name}. Ref: ${product.serialNo}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs">
              <DollarSign className="w-3.5 h-3.5" />
              Current Pricing
            </Button>
          </a>
        </div>

        {/* T&C */}
        <p className="text-[9px] text-muted-foreground text-center leading-tight">
          *T&Cs apply. Prices are indicative and may vary based on order volume, season, and delivery terms.
        </p>
      </div>
    </div>
  );
}

function CategorySection({ category, index }: { category: ProductCategory; index: number }) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section
      ref={ref}
      className={cn(
        'py-16 transition-all duration-700',
        index % 2 === 1 ? 'bg-secondary/30' : 'bg-background'
      )}
    >
      <div className="container mx-auto px-4">
        {/* Category Header */}
        <div className={cn(
          'mb-10 transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-8 rounded-full bg-primary" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">{category.name}</h2>
          </div>
          <p className="text-muted-foreground ml-6">{category.description}</p>
          <Badge variant="outline" className="ml-6 mt-2 text-xs">
            {category.products.length} products
          </Badge>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.products.map((product, pIndex) => (
            <ProductCard key={product.id} product={product} index={pIndex} />
          ))}
        </div>
      </div>
    </section>
  );
}

// === Page ===

export default function BusinessSegmentsPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Fresh produce farm" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in-down">
            Products & Services Offered
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto animate-fade-in-up">
            Export-grade fresh produce sourced from Kenya, Uganda & Tanzania — organized by category with transparent pricing.
          </p>
        </div>
      </section>

      {/* Categories */}
      {categories.map((category, index) => (
        <CategorySection key={category.id} category={category} index={index} />
      ))}

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
            Can't Find What You Need?
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto text-sm">
            We source a wide range of fresh produce across East Africa. Contact our export team for custom sourcing, bulk pricing, and logistics support.
          </p>
          <a
            href={getWhatsAppLink(whatsAppMessages.general)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="whatsapp" size="lg" className="gap-2">
              <MessageCircle className="w-5 h-5" />
              Contact Export Team
            </Button>
          </a>
          <p className="text-primary-foreground/60 text-[10px] mt-4">
            *All prices are indicative and subject to T&Cs. Final pricing depends on volume, season, delivery terms, and market conditions.
          </p>
        </div>
      </section>
    </div>
  );
}
