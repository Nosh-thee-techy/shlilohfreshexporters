import { useState, useMemo } from 'react';
import { MessageCircle } from 'lucide-react';
import { PageCTA } from '@/components/layout/PageCTA';
import carrotCharacter from '@/assets/cta/carrot-character.png';
import { PageHero } from '@/components/layout/PageHero';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductDetailModal } from '@/components/products/ProductDetailModal';
import { ProductFilters } from '@/components/products/ProductFilters';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { 
  Product, 
  vegetablesData, 
  getWhatsAppLink, 
  whatsAppMessages,
} from '@/data/products';
import heroVegetablesImg from '@/assets/hero/hero-vegetables.jpg';
import frenchBeansImg from '@/assets/products/french-beans.jpg';
import carrotsImg from '@/assets/products/carrots.jpg';
import chiliPeppersImg from '@/assets/products/chili-peppers.jpg';
import springOnionsImg from '@/assets/products/spring-onions.jpg';
import snowPeasImg from '@/assets/products/snow-peas.jpg';
import vegetablesImg from '@/assets/products/vegetables.jpg';

// Map images to products
const vegetableImages: Record<string, string> = {
  'french-beans': frenchBeansImg,
  'carrots': carrotsImg,
  'chili-peppers': chiliPeppersImg,
  'spring-onions': springOnionsImg,
  'snow-peas': snowPeasImg,
};

const vegetables: Product[] = vegetablesData.map(veg => ({
  ...veg,
  image: vegetableImages[veg.id] || vegetablesImg,
}));

// Get unique varieties for filter
const allVarieties = ['All', ...new Set(vegetables.flatMap(v => v.varieties))];
const vegRegions = ['All Regions', ...new Set(vegetables.flatMap(v => v.sourceRegions))];

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

export default function VegetablesPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => setFilters(initialFilters);

  const filteredVegetables = useMemo(() => {
    return vegetables.filter(veg => {
      if (filters.variety !== 'All' && !veg.varieties.includes(filters.variety)) {
        return false;
      }
      if (filters.region !== 'All Regions' && !veg.sourceRegions.includes(filters.region)) {
        return false;
      }
      if (filters.availability !== 'All') {
        const isYearRound = veg.availability.toLowerCase().includes('year-round');
        if (filters.availability === 'Year-round' && !isYearRound) return false;
        if (filters.availability === 'Seasonal' && isYearRound) return false;
      }
      if (filters.priceRange !== 'All Prices') {
        const priceMatch = veg.priceRange.match(/[\d.]+/g);
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
      <PageHero
        title="Fresh Vegetables for Global Markets"
        subtitle="Export-grade vegetables sourced from trusted Kenyan farms, handled with strict quality control and delivered to meet international market standards."
        backgroundImage={heroVegetablesImg}
        badge="Premium Vegetables"
        floatingImages={[
          { src: frenchBeansImg, alt: 'French Beans' },
          { src: chiliPeppersImg, alt: 'Chili Peppers' },
          { src: snowPeasImg, alt: 'Snow Peas' },
          { src: springOnionsImg, alt: 'Spring Onions' },
        ]}
      >
        <a
          href={getWhatsAppLink(whatsAppMessages.vegetables)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="whatsapp" size="lg">
            <MessageCircle className="w-5 h-5" />
            Request Vegetable Price List
          </Button>
        </a>
      </PageHero>

      {/* Filters */}
      <ProductFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        varietyOptions={allVarieties}
        regionOptions={vegRegions}
      />

      {/* Products Grid */}
      <section ref={ref} className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {filteredVegetables.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">No vegetables match your current filters.</p>
              <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVegetables.map((veg, index) => (
                <div
                  key={veg.id}
                  className={cn(
                    'transition-all duration-500',
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <ProductCard
                    product={veg}
                    onViewDetails={() => setSelectedProduct(veg)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <PageCTA
        variant="green"
        title="Need Fresh Vegetables for Export?"
        subtitle="We source additional vegetable varieties based on your market requirements. Contact our team for custom orders."
        whatsappMessage="Hello Shiloh Fresh Exporters, I would like to request pricing and availability for your vegetable exports."
      />

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
