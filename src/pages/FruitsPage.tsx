import { useState, useMemo } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductDetailModal } from '@/components/products/ProductDetailModal';
import { ProductFilters } from '@/components/products/ProductFilters';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { 
  Product, 
  fruitsData, 
  getWhatsAppLink, 
  whatsAppMessages,
  regionOptions 
} from '@/data/products';
import heroImage from '@/assets/hero-farm.jpg';
import avocadoImg from '@/assets/products/avocado.jpg';
import mangoesImg from '@/assets/products/mangoes.jpg';
import passionFruitImg from '@/assets/products/passion-fruit.jpg';
import pineappleImg from '@/assets/products/pineapple.jpg';

// Map images to products
const productImages: Record<string, string> = {
  'avocado': avocadoImg,
  'mangoes': mangoesImg,
  'passion-fruit': passionFruitImg,
  'pineapple': pineappleImg,
};

const fruits: Product[] = fruitsData.map(fruit => ({
  ...fruit,
  image: productImages[fruit.id] || avocadoImg,
}));

// Get unique varieties for filter
const allVarieties = ['All', ...new Set(fruits.flatMap(f => f.varieties))];
const fruitRegions = ['All Regions', ...new Set(fruits.flatMap(f => f.sourceRegions))];

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

export default function FruitsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => setFilters(initialFilters);

  const filteredFruits = useMemo(() => {
    return fruits.filter(fruit => {
      if (filters.variety !== 'All' && !fruit.varieties.includes(filters.variety)) {
        return false;
      }
      if (filters.region !== 'All Regions' && !fruit.sourceRegions.includes(filters.region)) {
        return false;
      }
      if (filters.availability !== 'All') {
        const isYearRound = fruit.availability.toLowerCase().includes('year-round');
        if (filters.availability === 'Year-round' && !isYearRound) return false;
        if (filters.availability === 'Seasonal' && isYearRound) return false;
      }
      // Price range filter logic
      if (filters.priceRange !== 'All Prices') {
        const priceMatch = fruit.priceRange.match(/[\d.]+/g);
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
          <img src={heroImage} alt="Fresh fruits farm" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in-down">
              Fresh Fruits for Global Markets
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 animate-fade-in-up">
              Export-grade fruits sourced directly from trusted Kenyan farmers, handled with care to meet international standards.
            </p>
            <a
              href={getWhatsAppLink(whatsAppMessages.fruits)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="whatsapp" size="lg" className="animate-fade-in">
                <MessageCircle className="w-5 h-5" />
                Request Price List
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
        regionOptions={fruitRegions}
      />

      {/* Products Grid */}
      <section ref={ref} className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {filteredFruits.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">No fruits match your current filters.</p>
              <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFruits.map((fruit, index) => (
                <div
                  key={fruit.id}
                  className={cn(
                    'transition-all duration-500',
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <ProductCard
                    product={fruit}
                    onViewDetails={() => setSelectedProduct(fruit)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Looking for Specific Fruit Varieties?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            We can source additional fruit varieties based on your market requirements. Contact our team for custom orders.
          </p>
          <a
            href={getWhatsAppLink(whatsAppMessages.fruits)}
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
