import { Link } from 'react-router-dom';
import { Apple, Carrot, Leaf, ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { getWhatsAppLink, whatsAppMessages } from '@/data/products';
import { ProduceIconsBackground } from '@/components/decorative/ProduceIconsBackground';
import { FloatingFruits } from '@/components/decorative/FloatingFruits';
import heroImage from '@/assets/hero-farm.jpg';

const segments = [
  {
    id: 'fruits',
    name: 'Fruits',
    icon: Apple,
    description: 'Premium export-grade fruits including avocados, mangoes, passion fruits, and pineapples sourced from Kenya\'s finest farms.',
    href: '/products/fruits',
    color: 'bg-orange-500/10 text-orange-600 border-orange-200',
    hoverColor: 'group-hover:bg-orange-500 group-hover:text-white',
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    icon: Carrot,
    description: 'Fresh vegetables including French beans, carrots, snow peas, and chili peppers grown under strict quality standards.',
    href: '/products/vegetables',
    color: 'bg-green-500/10 text-green-600 border-green-200',
    hoverColor: 'group-hover:bg-green-500 group-hover:text-white',
  },
  {
    id: 'herbs',
    name: 'Herbs',
    icon: Leaf,
    description: 'Aromatic culinary herbs like basil, rosemary, mint, and thyme, carefully handled to preserve freshness and flavor.',
    href: '/products/herbs',
    color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
    hoverColor: 'group-hover:bg-emerald-500 group-hover:text-white',
  },
];

export default function BusinessSegmentsPage() {
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
            Business Segments
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-in-up">
            Explore our comprehensive range of export-grade fresh produce, organized by category for easy navigation.
          </p>
        </div>
      </section>

      {/* Segments Grid with Icons Background */}
      <section ref={ref} className="relative py-20 bg-background overflow-hidden">
        {/* Decorative Icons Background */}
        <ProduceIconsBackground />
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Business Segments
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Click on any segment to explore detailed product listings with varieties, sourcing regions, availability, and pricing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {segments.map((segment, index) => {
              const Icon = segment.icon;
              return (
                <Link
                  key={segment.id}
                  to={segment.href}
                  className={cn(
                    'group relative bg-card/95 backdrop-blur-sm rounded-2xl border border-border p-8 shadow-card transition-all duration-500 hover:shadow-xl hover:-translate-y-2',
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  )}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Icon */}
                  <div className={cn(
                    'w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border transition-all duration-300',
                    segment.color,
                    segment.hoverColor
                  )}>
                    <Icon className="w-10 h-10" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {segment.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {segment.description}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <span>Explore {segment.name}</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section with Floating Fruits */}
      <section className="relative py-16 bg-secondary overflow-hidden">
        {/* Floating Fruits */}
        <FloatingFruits className="absolute inset-x-0 bottom-0 h-32 pointer-events-none" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Need Help Finding Products?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Our export team is ready to assist you with product sourcing, pricing, and logistics for your specific requirements.
          </p>
          <a
            href={getWhatsAppLink(whatsAppMessages.general)}
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
    </div>
  );
}
