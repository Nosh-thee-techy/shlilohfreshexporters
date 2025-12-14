import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

import avocadoImg from '@/assets/products/avocado.jpg';
import mangoesImg from '@/assets/products/mangoes.jpg';
import passionFruitImg from '@/assets/products/passion-fruit.jpg';
import pineappleImg from '@/assets/products/pineapple.jpg';
import herbsImg from '@/assets/products/herbs.jpg';
import vegetablesImg from '@/assets/products/vegetables.jpg';
import heroImage from '@/assets/hero-farm.jpg';

interface Product {
  id: string;
  name: string;
  image: string;
  grade: string;
  shortDescription: string;
  fullDescription: string;
  availability: string;
  packaging: string;
}

const products: Product[] = [
  {
    id: 'avocado',
    name: 'Hass Avocado',
    image: avocadoImg,
    grade: 'Export Grade A',
    shortDescription: 'Premium Hass avocados grown in the fertile highlands of Kenya.',
    fullDescription: 'Our Hass avocados are grown in the rich volcanic soils of Kenya\'s central highlands. Known for their creamy texture and rich flavor, these avocados are hand-picked at optimal ripeness and carefully handled to ensure they reach you in perfect condition.',
    availability: 'Year-round',
    packaging: '4kg cartons, customizable',
  },
  {
    id: 'mangoes',
    name: 'Kent Mangoes',
    image: mangoesImg,
    grade: 'Export Grade A',
    shortDescription: 'Sweet, juicy Kent mangoes with minimal fiber content.',
    fullDescription: 'Our Kent mangoes are sourced from the coastal regions of Kenya where the tropical climate produces fruit with exceptional sweetness and minimal fiber. Each mango is carefully selected and graded to meet international export standards.',
    availability: 'November - March',
    packaging: '5kg cartons, customizable',
  },
  {
    id: 'passion-fruit',
    name: 'Passion Fruits',
    image: passionFruitImg,
    grade: 'Export Grade A',
    shortDescription: 'Aromatic purple passion fruits bursting with tangy flavor.',
    fullDescription: 'Our purple passion fruits are cultivated in Kenya\'s ideal growing conditions, resulting in fruits with intense aroma and the perfect balance of sweet and tangy flavors. Ideal for juices, desserts, and fresh consumption.',
    availability: 'Year-round',
    packaging: '2kg cartons, customizable',
  },
  {
    id: 'pineapple',
    name: 'MD2 Pineapples',
    image: pineappleImg,
    grade: 'Export Grade A',
    shortDescription: 'Extra sweet MD2 pineapples with golden flesh.',
    fullDescription: 'Our MD2 pineapples are grown in Kenya\'s warm tropical regions, producing fruits with exceptional sweetness, low acidity, and beautiful golden flesh. Each pineapple is harvested at peak ripeness for maximum flavor.',
    availability: 'Year-round',
    packaging: 'Individual packaging, 10-12 per carton',
  },
  {
    id: 'herbs',
    name: 'Fresh Herbs',
    image: herbsImg,
    grade: 'Export Grade A',
    shortDescription: 'Aromatic fresh herbs including basil, mint, and cilantro.',
    fullDescription: 'Our fresh herb collection includes basil, mint, cilantro, parsley, and more. Grown using sustainable practices, our herbs are harvested fresh and packed carefully to preserve their aromatic qualities and extend shelf life.',
    availability: 'Year-round',
    packaging: '100g bunches, bulk available',
  },
  {
    id: 'vegetables',
    name: 'Premium Vegetables',
    image: vegetablesImg,
    grade: 'Export Grade A',
    shortDescription: 'French beans, snow peas, baby corn, and colorful peppers.',
    fullDescription: 'Our vegetable selection includes French beans, snow peas, baby corn, and bell peppers. Grown in Kenya\'s favorable climate, our vegetables are known for their freshness, vibrant colors, and excellent taste.',
    availability: 'Year-round',
    packaging: 'Various sizes, customizable',
  },
];

function ProductCard({ product, onViewDetails }: { product: Product; onViewDetails: () => void }) {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden border border-border shadow-card hover-lift">
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
            {product.grade}
          </span>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-foreground">{product.name}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {product.shortDescription}
        </p>
        
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onViewDetails}
            className="flex-1"
          >
            View Details
          </Button>
          <a
            href={`https://wa.me/254702339421?text=Hello%20Shiloh%20Fresh%2C%20I%27m%20interested%20in%20${encodeURIComponent(product.name)}.%20Please%20send%20me%20a%20quote.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button variant="whatsapp" size="sm" className="w-full">
              <MessageCircle className="w-4 h-4" />
              Quote
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

function ProductModal({ product, isOpen, onClose }: { product: Product | null; isOpen: boolean; onClose: () => void }) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            {product.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="relative h-64 rounded-xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <span className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                {product.grade}
              </span>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {product.fullDescription}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-secondary rounded-xl">
              <p className="text-sm text-muted-foreground mb-1">Availability</p>
              <p className="font-semibold text-foreground">{product.availability}</p>
            </div>
            <div className="p-4 bg-secondary rounded-xl">
              <p className="text-sm text-muted-foreground mb-1">Packaging</p>
              <p className="font-semibold text-foreground">{product.packaging}</p>
            </div>
          </div>

          <a
            href={`https://wa.me/254702339421?text=Hello%20Shiloh%20Fresh%2C%20I%27m%20interested%20in%20${encodeURIComponent(product.name)}.%20Please%20send%20me%20a%20quote.`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="whatsapp" size="lg" className="w-full">
              <MessageCircle className="w-5 h-5" />
              Request Quote on WhatsApp
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Fresh produce farm" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in-down">
            Our Products
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-in-up">
            Premium fresh produce sourced from Kenya's finest farms, ready for global export.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section ref={ref} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={cn(
                  'transition-all duration-500',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ProductCard
                  product={product}
                  onViewDetails={() => setSelectedProduct(product)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Looking for specific products?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            We can source and supply a wide variety of fresh produce. Contact us with your requirements.
          </p>
          <a
            href="https://wa.me/254702339421?text=Hello%20Shiloh%20Fresh%2C%20I%27m%20looking%20for%20specific%20products.%20Can%20you%20help?"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="whatsapp" size="lg">
              <MessageCircle className="w-5 h-5" />
              Discuss Your Requirements
            </Button>
          </a>
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
