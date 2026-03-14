import { useState, useMemo } from 'react';
import { MessageCircle } from 'lucide-react';
import { PageCTA } from '@/components/layout/PageCTA';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductDetailModal } from '@/components/products/ProductDetailModal';
import { ProductFilters } from '@/components/products/ProductFilters';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { 
  Product, 
  herbsData, 
  getWhatsAppLink, 
  whatsAppMessages,
} from '@/data/products';
import heroImage from '@/assets/hero-farm.jpg';
import basilImg from '@/assets/products/basil.jpg';
import rosemaryImg from '@/assets/products/rosemary.jpg';
import mintImg from '@/assets/products/mint.jpg';
import thymeImg from '@/assets/products/thyme.jpg';
import corianderImg from '@/assets/products/coriander.jpg';
import parsleyImg from '@/assets/products/parsley.jpg';
import herbsImg from '@/assets/products/herbs.jpg';

// Map images to products
const herbImages: Record<string, string> = {
  'basil': basilImg,
  'rosemary': rosemaryImg,
  'mint': mintImg,
  'thyme': thymeImg,
  'coriander': corianderImg,
  'parsley': parsleyImg,
};

const herbs: Product[] = herbsData.map(herb => ({
  ...herb,
  image: herbImages[herb.id] || herbsImg,
}));

// Get unique varieties for filter
const allVarieties = ['All', ...new Set(herbs.flatMap(h => h.varieties))];
const herbRegions = ['All Regions', ...new Set(herbs.flatMap(h => h.sourceRegions))];

interface FilterState {
  variety: string;
  region: string;
  availability: string;
  priceRange: string;
}

const initialFilters: FilterState = {
  variety: 'All',
  region: 'All Regions',
  availability: 'All',
  priceRange: 'All Prices',
};

export default function HerbsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => setFilters(initialFilters);

  const filteredHerbs = useMemo(() => {
    return herbs.filter(herb => {
      if (filters.variety !== 'All' && !herb.varieties.includes(filters.variety)) {
        return false;
      }
      if (filters.region !== 'All Regions' && !herb.sourceRegions.includes(filters.region)) {
        return false;
      }
      if (filters.availability !== 'All') {
        const isYearRound = herb.availability.toLowerCase().includes('year-round');
        if (filters.availability === 'Year-round' && !isYearRound) return false;
        if (filters.availability === 'Seasonal' && isYearRound) return false;
      }
      if (filters.priceRange !== 'All Prices') {
        const priceMatch = herb.priceRange.match(/[\d.]+/g);
        if (priceMatch) {
          const minPrice = parseFloat(priceMatch[0]);
          switch (filters.priceRange) {
            case 'Under USD 1/kg':
              if (minPrice >= 1) return false;
              break;
            case 'USD 1-3/kg':
              if (minPrice < 1 || minPrice > 3) return false;
              break;
            case 'USD 3-5/kg':
              if (minPrice < 3 || minPrice > 5) return false;
              break;
            case 'Over USD 5/kg':
              if (minPrice < 5) return false;
              break;
          }
        }
      }
      return true;
    });
  }, [filters]);

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Fresh herbs farm" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-800/90 to-emerald-700/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in-down">
              Fresh Culinary Herbs, Grown for Export
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 animate-fade-in-up">
              Aromatic, carefully handled herbs grown under controlled practices to preserve flavor, freshness, and shelf life.
            </p>
            <a
              href={getWhatsAppLink(whatsAppMessages.herbs)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="whatsapp" size="lg" className="animate-fade-in">
                <MessageCircle className="w-5 h-5" />
                Request Herbs Catalogue
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Filters */}
      <ProductFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        varietyOptions={allVarieties}
        regionOptions={herbRegions}
      />

      {/* Products Grid */}
      <section ref={ref} className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {filteredHerbs.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">No herbs match your current filters.</p>
              <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredHerbs.map((herb, index) => (
                <div
                  key={herb.id}
                  className={cn(
                    'transition-all duration-500',
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <ProductCard
                    product={herb}
                    onViewDetails={() => setSelectedProduct(herb)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Quality Note */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Premium Quality Handling
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Our herbs are harvested at peak freshness, carefully washed, sorted, and packed in temperature-controlled facilities. 
              We maintain strict cold chain protocols from farm to airport, ensuring maximum shelf life and quality for your customers.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Looking for Specific Herb Varieties?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            We work with specialized growers to source a wide range of culinary herbs. Contact us for custom requirements.
          </p>
          <a
            href={getWhatsAppLink(whatsAppMessages.herbs)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="whatsapp" size="lg">
              <MessageCircle className="w-5 h-5" />
              Contact Export Team
            </Button>
          </a>
        </div>
      </section>

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
