import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Leaf, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useParallax } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import heroImage from '@/assets/hero-farm.jpg';

const features = [
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'Every product meets international standards with rigorous quality checks at every stage.',
  },
  {
    icon: Leaf,
    title: 'Sustainable Farming',
    description: 'Partnering with local farmers who practice eco-friendly and sustainable agriculture.',
  },
  {
    icon: Globe,
    title: 'Global Export Standards',
    description: 'Certified for international markets with seamless logistics to destinations worldwide.',
  },
];

function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-soft">
      <span className="text-primary-foreground/70 text-sm">Scroll to explore</span>
      <ChevronDown className="w-5 h-5 text-primary-foreground/70" />
    </div>
  );
}

function HeroSection() {
  const parallaxOffset = useParallax(0.3);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <img
          src={heroImage}
          alt="Kenyan farmland"
          className="w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4 animate-fade-in-down">
            <span className="inline-block px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-primary-foreground text-sm font-medium border border-primary-foreground/20">
              Premium Fresh Produce from Kenya
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground leading-tight animate-fade-in-up">
            Premium Fresh Produce{' '}
            <span className="text-accent">from Kenya</span>{' '}
            to the World
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Ethically sourced. Expertly handled. Globally delivered.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in-up delay-300">
            <Link to="/products">
              <Button variant="hero" size="lg" className="group">
                Explore Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a
              href="https://wa.me/254700000000?text=Hello%20Shiloh%20Fresh%20Exporters%2C%20I%27d%20like%20to%20inquire."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="glass" size="lg">
                WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}

function FeaturesSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className={cn(
            'text-3xl md:text-4xl font-bold text-foreground mb-4 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            Why Choose <span className="text-primary">Shiloh Fresh?</span>
          </h2>
          <p className={cn(
            'text-lg text-muted-foreground transition-all duration-700 delay-100',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            We deliver excellence at every step of the supply chain
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(
                'group p-8 rounded-2xl bg-card border border-border hover-lift transition-all duration-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              )}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutPreview() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={cn(
              'space-y-6 transition-all duration-700',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            )}>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Committed to Quality & Sustainability
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Shiloh Fresh Exporters is dedicated to supplying high-quality fruits to global markets while uplifting farmers through ethical sourcing and sustainable agricultural practices.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Through integrity, innovation, and excellence, we aim to build long-term partnerships that enrich both people and the planet.
              </p>
              <Link to="/about">
                <Button variant="default" className="group mt-4">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className={cn(
              'relative transition-all duration-700 delay-200',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            )}>
              <div className="grid grid-cols-2 gap-4">
                <StatCard number="500+" label="Partner Farmers" delay={0} />
                <StatCard number="12+" label="Countries Served" delay={100} />
                <StatCard number="10+" label="Export Partners" delay={200} />
                <StatCard number="5+" label="Years Experience" delay={300} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ number, label, delay }: { number: string; label: string; delay: number }) {
  return (
    <div
      className="p-6 bg-card rounded-xl shadow-card text-center hover-lift"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{number}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function CTASection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="py-24 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <div className={cn(
          'max-w-3xl mx-auto space-y-8 transition-all duration-700',
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        )}>
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground">
            Ready to Source Premium Produce?
          </h2>
          <p className="text-xl text-primary-foreground/80">
            Connect with us today and discover how Shiloh Fresh can meet your fresh produce needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="https://wa.me/254700000000?text=Hello%20Shiloh%20Fresh%20Exporters%2C%20I%27d%20like%20to%20inquire."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="whatsapp" size="lg">
                Chat on WhatsApp
              </Button>
            </a>
            <Link to="/contact">
              <Button variant="glass" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <AboutPreview />
      <CTASection />
    </>
  );
}
