import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, 
  ChevronDown, 
  Truck, 
  Leaf, 
  ShieldCheck, 
  Building2, 
  Globe2, 
  Users, 
  UserCheck, 
  Package, 
  Calendar,
  Sprout,
  Award,
  CheckCircle2,
  MessageCircle,
  Mail,
  Quote,
  Star,
  Target,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useParallax } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import heroImage from '@/assets/hero-farm.jpg';
import avocadoImg from '@/assets/products/avocado.jpg';
import mangoesImg from '@/assets/products/mangoes.jpg';
import frenchBeansImg from '@/assets/products/french-beans.jpg';
import basilImg from '@/assets/products/basil.jpg';
import passionFruitImg from '@/assets/products/passion-fruit.jpg';
// Process flow images
import varietyImg from '@/assets/process/variety-selection.jpg';
import propagationImg from '@/assets/process/propagation.jpg';
import agronomyImg from '@/assets/process/agronomy.jpg';
import sortingImg from '@/assets/process/sorting.jpg';
import packagingImg from '@/assets/process/packaging.jpg';
import coldchainImg from '@/assets/process/coldchain.jpg';
import seaLogisticsImg from '@/assets/process/sea-logistics.jpg';
import airLogisticsImg from '@/assets/process/air-logistics.jpg';
// Partner logos
import kebsLogo from '@/assets/logos/kebs-logo.png';
import hcdaLogo from '@/assets/logos/hcda-logo.png';
import keittLogo from '@/assets/logos/keitt-logo.png';
import globalgapLogo from '@/assets/logos/globalgap-logo.png';
import phytoLogo from '@/assets/logos/phyto-logo.png';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const WHATSAPP_LINK = "https://wa.me/254735497573?text=Hello%20Shiloh%20Fresh%20Exporters%2C%20I%27d%20like%20to%20inquire.";

const valueHighlights = [
  {
    icon: Truck,
    title: 'Streamlined Logistics',
    description: 'Streamlined logistics for timely global delivery',
  },
  {
    icon: Leaf,
    title: 'Sustainable Practices',
    description: 'Sustainable practices that preserve freshness and quality',
  },
  {
    icon: ShieldCheck,
    title: 'Export-Ready',
    description: 'Export-ready handling that meets international standards',
  },
];

const journeyData = [
  {
    year: '2019',
    title: 'Foundation',
    description: 'Shiloh Fresh Exporters was founded with a clear mission: to connect Kenyan farmers to reliable international markets while maintaining uncompromised quality standards.',
  },
  {
    year: '2020',
    title: 'First Exports',
    description: 'We began exporting fresh avocados and mangoes, establishing strong trade relationships across regional and international markets.',
  },
  {
    year: '2021',
    title: 'Farmer Network Expansion',
    description: 'Our sourcing network expanded to include more smallholder farmers, reinforcing our commitment to ethical sourcing and farmer empowerment.',
  },
  {
    year: '2022',
    title: 'Process Enhancement',
    description: 'We strengthened our post-harvest handling processes, improving sorting, packaging, and cold-chain logistics.',
  },
  {
    year: '2023',
    title: 'Product Diversification',
    description: 'Shiloh Fresh Exporters increased export volumes and diversified produce offerings to include vegetables and herbs.',
  },
  {
    year: '2024',
    title: 'Market Expansion',
    description: 'We expanded our market reach and optimized logistics operations to support consistent, large-scale exports.',
  },
];

const statsData = [
  { icon: Building2, number: 2, suffix: '', label: 'Export packhouses in Kenya' },
  { icon: Globe2, number: 10, suffix: '+', label: 'International export destinations' },
  { icon: Users, number: 300, suffix: '+', label: 'Smallholder farmers supported' },
  { icon: UserCheck, number: 50, suffix: '+', label: 'Full-time and seasonal staff' },
  { icon: Package, number: 1500, suffix: '+', label: 'Tons of annual export volume' },
  { icon: Calendar, number: 5, suffix: '+', label: 'Years of export experience' },
];

const shilohFocusAreas = [
  { icon: Sprout, label: 'Ethical sourcing' },
  { icon: Leaf, label: 'Sustainable farming' },
  { icon: Award, label: 'Quality assurance' },
  { icon: ShieldCheck, label: 'End-to-end export control' },
];

const businessOperations = [
  {
    title: 'Fresh Produce Exports',
    description: 'Exporting avocados, mangoes, passion fruits, vegetables, and herbs to global markets with consistent quality and freshness.',
    icon: Package,
  },
  {
    title: 'Local Farmer Partnerships',
    description: 'Working closely with Kenyan farmers to improve yields, quality, and market access.',
    icon: Users,
  },
  {
    title: 'Logistics & Export Handling',
    description: 'Coordinating efficient cold-chain logistics and compliant export documentation.',
    icon: Truck,
  },
  {
    title: 'Market Expansion',
    description: 'Continuously growing our footprint across international markets.',
    icon: Globe2,
  },
];

const certifications = [
  {
    name: 'Phytosanitary Certification',
    description: 'Official certification ensuring our produce is free from pests and diseases, meeting international plant health standards.',
  },
  {
    name: 'KEBS Standards',
    description: 'Kenya Bureau of Standards certification ensuring our products meet national quality and safety requirements.',
  },
  {
    name: 'Export Compliance & Traceability',
    description: 'Full traceability systems that track produce from farm to export, ensuring transparency and accountability.',
  },
  {
    name: 'Quality Assurance Protocols',
    description: 'Rigorous quality control measures at every stage of the supply chain to maintain product excellence.',
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

// 1️⃣ HERO SECTION — Starbucks-inspired layout
function HeroSection() {
  const parallaxOffset = useParallax(0.15);
  const [activeThumb, setActiveThumb] = useState(0);

  const heroProducts = [
    { src: avocadoImg, name: 'Hass Avocado', label: 'AVOCADO' },
    { src: mangoesImg, name: 'Kent Mangoes', label: 'MANGOES' },
    { src: frenchBeansImg, name: 'French Beans', label: 'FRENCH BEANS' },
    { src: basilImg, name: 'Sweet Basil', label: 'BASIL' },
    { src: passionFruitImg, name: 'Passion Fruit', label: 'PASSION FRUIT' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveThumb((prev) => (prev + 1) % heroProducts.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-primary">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <img
          src={heroImage}
          alt="Kenyan farmland"
          className="w-full h-[120%] object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary/95" />
      </div>

      {/* Vertical label — xl+ only */}
      <div className="hidden xl:flex absolute right-0 top-0 bottom-0 w-24 2xl:w-32 z-[3] items-center justify-center">
        <div className="relative h-full flex items-center">
          <div className="absolute right-0 top-[15%] bottom-[15%] w-20 2xl:w-24 rounded-l-3xl bg-accent/10 backdrop-blur-sm" />
          <span
            className="relative text-primary-foreground/15 font-bold text-5xl 2xl:text-7xl tracking-[0.3em] uppercase"
            style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
          >
            {heroProducts[activeThumb].label}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-5 sm:px-6 min-h-[100svh] flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center w-full pt-28 pb-20 sm:pt-32 sm:pb-24 lg:py-20">

          {/* Left: Bold Typography & CTAs */}
          <div className="space-y-6 text-center lg:text-left">
            <p className="text-accent font-bold text-xs sm:text-sm tracking-[0.2em] uppercase animate-fade-in-down">
              🌿 Shiloh Fresh Exporters
            </p>

            <h1 className="animate-fade-in-up">
              <span className="block text-primary-foreground text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight">
                Pure{' '}
                <span className="relative inline-block">
                  Freshness
                  <span className="absolute -bottom-1 left-0 right-0 h-1.5 bg-accent/60 rounded-full" />
                </span>
              </span>
              <span className="block text-primary-foreground text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight mt-1">
                from <span className="text-accent">Africa</span>
              </span>
            </h1>

            <p className="text-primary-foreground/70 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 animate-fade-in-up delay-100">
              Premium fruits, vegetables & herbs — ethically sourced from Kenya's finest farms and exported worldwide.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start animate-fade-in-up delay-200">
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-accent-foreground font-bold text-sm shadow-lg">
                <Globe2 className="w-4 h-4" />
                10+ Markets
              </div>
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground font-semibold text-sm border border-primary-foreground/20">
                <Truck className="w-4 h-4" />
                Export Ready
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-fade-in-up delay-300">
              <Link to="/products">
                <Button variant="hero" size="lg" className="group w-full sm:w-auto text-base px-8">
                  Explore Our Produce
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="lg" className="w-full sm:w-auto text-base px-8">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </Button>
              </a>
            </div>

            {/* Product thumbnails */}
            <div className="pt-3 animate-fade-in-up delay-400">
              <div className="flex gap-2.5 justify-center lg:justify-start">
                {heroProducts.map((product, index) => (
                  <button
                    key={product.name}
                    onClick={() => setActiveThumb(index)}
                    className={cn(
                      'w-13 h-13 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-110',
                      activeThumb === index
                        ? 'border-accent shadow-glow scale-110 ring-2 ring-accent/40'
                        : 'border-primary-foreground/20 opacity-50 hover:opacity-100'
                    )}
                  >
                    <img src={product.src} alt={product.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <p className="text-primary-foreground/35 text-[11px] mt-2 tracking-[0.25em] uppercase font-semibold">
                Shiloh Fresh · Kenya
              </p>
            </div>
          </div>

          {/* Right: Hero product showcase — visible from sm+ */}
          <div className="hidden sm:flex relative items-center justify-center animate-fade-in">
            <div className="absolute w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] rounded-full bg-accent/10 blur-3xl" />

            <div
              className="relative w-[220px] h-[280px] sm:w-[260px] sm:h-[340px] md:w-[300px] md:h-[400px] lg:w-[380px] lg:h-[480px] xl:w-[420px] xl:h-[530px] rounded-3xl overflow-hidden shadow-2xl border-2 border-primary-foreground/10 transition-all duration-700"
              style={{ transform: 'rotate(2deg) perspective(800px) rotateY(-4deg)' }}
            >
              <img
                src={heroProducts[activeThumb].src}
                alt={heroProducts[activeThumb].name}
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />

              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                <div className="bg-primary-foreground/10 backdrop-blur-md rounded-2xl px-3 py-2.5 sm:px-4 sm:py-3 border border-primary-foreground/20">
                  <p className="text-primary-foreground font-bold text-base sm:text-lg">{heroProducts[activeThumb].name}</p>
                  <p className="text-primary-foreground/70 text-[11px] sm:text-xs">Premium Export Quality</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-3 -right-3 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-accent/20 backdrop-blur-sm rotate-12 animate-float" />
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}

// 2️⃣ VISION & MISSION
function VisionMissionSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-5 sm:px-6">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10 max-w-5xl mx-auto">
          {/* Vision */}
          <div
            className={cn(
              'relative p-8 sm:p-10 rounded-3xl bg-primary text-primary-foreground overflow-hidden transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-foreground/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold">Our Vision</h3>
              </div>
              <p className="text-primary-foreground/80 text-base sm:text-lg leading-relaxed">
                To be East Africa's most trusted fresh produce exporter — known for quality, integrity, and empowering farming communities across the region.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div
            className={cn(
              'relative p-8 sm:p-10 rounded-3xl bg-accent text-foreground overflow-hidden transition-all duration-700',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="absolute top-0 left-0 w-28 h-28 bg-foreground/5 rounded-full -translate-y-1/2 -translate-x-1/2" />
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-foreground/5 rounded-full translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold">Our Mission</h3>
              </div>
              <p className="text-foreground/80 text-base sm:text-lg leading-relaxed">
                Our mission is to deliver the finest, ethically sourced fruits to global markets while empowering local farmers and promoting sustainable agricultural practices. Through integrity, innovation, and excellence, we aim to build long-term partnerships that enrich both people and the planet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 3️⃣ VALUE HIGHLIGHTS
function ValueHighlights() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="py-12 sm:py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {valueHighlights.map((item, index) => (
            <div
              key={item.title}
              className={cn(
                'group flex items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-card border border-border hover-lift transition-all duration-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <p className="text-sm sm:text-base text-muted-foreground font-medium">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 3️⃣ OUR JOURNEY
function JourneySection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const [expandedYear, setExpandedYear] = useState<string | null>(null);

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className={cn(
            'inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 transition-all duration-500',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            Our Journey
          </span>
          <h2 className={cn(
            'text-3xl md:text-4xl font-bold text-foreground transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            Our Journey Towards <span className="text-primary">Sustainable Growth</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

            {journeyData.map((item, index) => (
              <div
                key={item.year}
                className={cn(
                  'relative flex flex-col md:flex-row gap-4 md:gap-8 mb-8 transition-all duration-500',
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Year Circle */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold z-10">
                  {item.year.slice(-2)}
                </div>

                {/* Content Card */}
                <div
                  className={cn(
                    'ml-12 md:ml-0 md:w-[calc(50%-2rem)] cursor-pointer',
                    index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                  )}
                >
                  <div
                    className={cn(
                      'p-6 rounded-2xl bg-card border border-border hover-lift transition-all duration-300',
                      expandedYear === item.year && 'border-primary shadow-lg'
                    )}
                    onClick={() => setExpandedYear(expandedYear === item.year ? null : item.year)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-primary">{item.year}</span>
                      <ChevronDown className={cn(
                        'w-5 h-5 text-muted-foreground transition-transform duration-300',
                        expandedYear === item.year && 'rotate-180'
                      )} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                    <div className={cn(
                      'overflow-hidden transition-all duration-300',
                      expandedYear === item.year ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    )}>
                      <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                    {expandedYear !== item.year && (
                      <p className="text-muted-foreground text-sm">Click to expand</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// 4️⃣ WHERE WE STAND NOW - Animated Counters
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const { ref, isVisible } = useScrollAnimation<HTMLSpanElement>();
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Use useEffect for proper animation triggering
  React.useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, hasAnimated, target]);

  return (
    <span ref={ref} className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary tabular-nums">
      {isVisible ? count : 0}{suffix}
    </span>
  );
}

function StatsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="py-16 sm:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className={cn(
            'inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4 transition-all duration-500',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            Where We Stand Now
          </span>
          <h2 className={cn(
            'text-2xl sm:text-3xl md:text-4xl font-bold text-foreground transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            Our Growth <span className="text-primary">in Numbers</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 max-w-5xl mx-auto">
          {statsData.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                'p-4 sm:p-6 bg-card rounded-xl sm:rounded-2xl shadow-card text-center hover-lift transition-all duration-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <AnimatedCounter target={stat.number} suffix={stat.suffix} />
              <div className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials data
const testimonialsData = [
  {
    quote: "Shiloh Fresh has consistently delivered premium quality avocados. Their reliability and professionalism make them our preferred supplier.",
    author: "James van der Berg",
    role: "Import Manager",
    company: "European Fresh Produce Ltd.",
    rating: 5,
  },
  {
    quote: "The traceability and food safety standards at Shiloh Fresh exceed our expectations. A trusted partner for our supply chain.",
    author: "Sarah Mitchell",
    role: "Procurement Director",
    company: "Global Foods Distribution",
    rating: 5,
  },
  {
    quote: "Excellent cold chain management and timely deliveries. Shiloh Fresh understands the importance of freshness in our business.",
    author: "Ahmed Hassan",
    role: "Operations Head",
    company: "Middle East Fresh Markets",
    rating: 5,
  },
];

const partnerLogos = [
  { name: 'KEBS', logo: kebsLogo },
  { name: 'HCDA', logo: hcdaLogo },
  { name: 'Keitt', logo: keittLogo },
  { name: 'GlobalG.A.P', logo: globalgapLogo },
  { name: 'Phytosanitary', logo: phytoLogo },
];

// 5️⃣ SHILOH'S WAY - Curved Process Flow
const processSteps = [
  { id: 'variety', step: 1, stage: 'Grower', title: 'Variety Selection & Trials', description: 'Careful selection and testing of crop varieties best suited for export markets and local growing conditions.', image: varietyImg },
  { id: 'propagation', step: 2, stage: 'Grower', title: 'Propagation & Planting', description: 'Professional propagation techniques ensuring healthy seedlings and optimal planting practices.', image: propagationImg },
  { id: 'agronomy', step: 3, stage: 'Grower', title: 'Good Agronomy Practices', description: 'Implementation of sustainable farming methods, soil management, and responsible pest control.', image: agronomyImg },
  { id: 'sorting', step: 4, stage: 'Packhouse', title: 'Sorting & Quality Checks', description: 'Rigorous inspection and grading of produce to meet international quality standards.', image: sortingImg },
  { id: 'packaging', step: 5, stage: 'Packhouse', title: 'Export Packaging', description: 'Professional packaging designed to maintain freshness and meet destination market requirements.', image: packagingImg },
  { id: 'coldchain', step: 6, stage: 'Logistics', title: 'Cold Chain Management', description: 'Temperature-controlled storage and handling from packhouse to final destination.', image: coldchainImg },
  { id: 'sea', step: 7, stage: 'Logistics', title: 'Sea Logistics', description: 'Cost-effective ocean freight for large volume shipments with maintained cold chain.', image: seaLogisticsImg },
  { id: 'air', step: 8, stage: 'Logistics', title: 'Air Logistics', description: 'Rapid air freight for time-sensitive produce ensuring maximum freshness on arrival.', image: airLogisticsImg },
];

function ShilohWaySection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const [selectedNode, setSelectedNode] = useState<typeof processSteps[0] | null>(null);

  return (
    <section ref={ref} className="py-16 sm:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header - Left aligned like reference */}
        <div className="max-w-3xl mb-12 sm:mb-20">
          <span className={cn(
            'inline-block text-accent font-semibold text-sm tracking-widest uppercase mb-4 transition-all duration-500',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            Shiloh's Way — From Farm to Market
          </span>
          <h2 className={cn(
            'text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            We have the best team<br />
            and <span className="text-primary">best process</span>
          </h2>
          <p className={cn(
            'text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl transition-all duration-700 delay-100',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            With a strong commitment to quality, traceability, and food safety, we manage every stage of fresh produce sourcing, handling, and export.
          </p>
          <Link to="/products" className="inline-block mt-6">
            <Button variant="cta" size="lg" className={cn(
              'rounded-full transition-all duration-700 delay-200',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}>
              Get Started
            </Button>
          </Link>
        </div>

        {/* Desktop: Curved flowing path */}
        <div className="hidden lg:block relative">
          {/* SVG Curved Path */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1200 900"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M 100 100 Q 300 100, 400 200 Q 500 300, 600 250 Q 700 200, 800 300 Q 900 400, 1000 350 Q 1100 300, 1100 450 Q 1100 600, 900 650 Q 700 700, 500 650 Q 300 600, 200 700 Q 100 800, 300 850"
              stroke="hsl(var(--accent))"
              strokeWidth="3"
              strokeDasharray="8 6"
              className="opacity-40"
            />
          </svg>

          {/* Process Steps */}
          <div className="relative" style={{ minHeight: '900px' }}>
            {processSteps.map((step, index) => {
              // Position each step along a flowing S-curve
              const positions = [
                { top: '0%', left: '5%', align: 'left' },
                { top: '8%', left: '35%', align: 'left' },
                { top: '18%', left: '60%', align: 'right' },
                { top: '30%', left: '80%', align: 'right' },
                { top: '45%', left: '55%', align: 'right' },
                { top: '55%', left: '25%', align: 'left' },
                { top: '68%', left: '10%', align: 'left' },
                { top: '80%', left: '40%', align: 'left' },
              ];
              const pos = positions[index];

              return (
                <div
                  key={step.id}
                  className={cn(
                    'absolute group cursor-pointer transition-all duration-700',
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  )}
                  style={{
                    top: pos.top,
                    left: pos.left,
                    transitionDelay: `${index * 120}ms`,
                  }}
                  onClick={() => setSelectedNode(step)}
                >
                  {/* Large background number */}
                  <span className="absolute -top-6 -left-4 text-[120px] font-extrabold text-muted/60 leading-none select-none pointer-events-none z-0">
                    {step.step}
                  </span>

                  <div className="relative z-10 flex items-start gap-5">
                    {/* Dot on the path */}
                    <div className="relative mt-1 shrink-0">
                      <div className="w-5 h-5 rounded-full bg-accent border-4 border-background shadow-lg group-hover:scale-125 transition-transform duration-300" />
                      <div className="absolute inset-0 w-5 h-5 rounded-full bg-accent/30 animate-ping" style={{ animationDuration: '2s' }} />
                    </div>

                    {/* Content */}
                    <div className="max-w-[280px]">
                      <span className="text-[10px] uppercase tracking-widest text-accent font-semibold mb-1 block">
                        {step.stage}
                      </span>
                      <h4 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {step.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[14px] top-0 bottom-0 w-0.5 bg-accent/30" />

            <div className="space-y-10">
              {processSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={cn(
                    'relative pl-12 cursor-pointer group transition-all duration-500',
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  )}
                  style={{ transitionDelay: `${index * 80}ms` }}
                  onClick={() => setSelectedNode(step)}
                >
                  {/* Step number circle */}
                  <div className="absolute left-0 top-0 w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold z-10 group-hover:scale-110 transition-transform">
                    {step.step}
                  </div>

                  {/* Large background number */}
                  <span className="absolute -top-3 left-6 text-[60px] font-extrabold text-muted/40 leading-none select-none pointer-events-none z-0">
                    {step.step}
                  </span>

                  <div className="relative z-10">
                    <span className="text-[10px] uppercase tracking-widest text-accent font-semibold mb-1 block">
                      {step.stage}
                    </span>
                    <h4 className="text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Click Modal */}
        <Dialog open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold">
                  {selectedNode?.step}
                </div>
                {selectedNode?.title}
              </DialogTitle>
              <DialogDescription className="text-base pt-2">
                {selectedNode?.description}
              </DialogDescription>
            </DialogHeader>
            {selectedNode?.image && (
              <div className="rounded-xl overflow-hidden mt-2">
                <img src={selectedNode.image} alt={selectedNode.title} className="w-full h-48 object-cover" />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

// 6️⃣ GLOBAL REACH & BUSINESS OPERATIONS
function BusinessOperationsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const [selectedOp, setSelectedOp] = useState<typeof businessOperations[0] | null>(null);

  return (
    <section ref={ref} className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className={cn(
            'inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 transition-all duration-500',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            Global Reach & Operations
          </span>
          <h2 className={cn(
            'text-3xl md:text-4xl font-bold text-foreground transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            Our <span className="text-primary">Business Operations</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {businessOperations.map((op, index) => (
            <div
              key={op.title}
              className={cn(
                'group p-6 rounded-2xl bg-card border border-border hover-lift cursor-pointer transition-all duration-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedOp(op)}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <op.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{op.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{op.description}</p>
              <span className="text-xs text-primary mt-3 inline-block">Click for details →</span>
            </div>
          ))}
        </div>

        <Dialog open={!!selectedOp} onOpenChange={() => setSelectedOp(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                {selectedOp && (
                  <>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <selectedOp.icon className="w-5 h-5 text-primary" />
                    </div>
                    {selectedOp.title}
                  </>
                )}
              </DialogTitle>
              <DialogDescription className="text-base pt-2">
                {selectedOp?.description}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

// 7️⃣ CERTIFICATIONS & COMPLIANCE
function CertificationsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className={cn(
            'inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 transition-all duration-500',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            Certifications & Compliance
          </span>
          <h2 className={cn(
            'text-3xl md:text-4xl font-bold text-foreground mb-4 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            Quality <span className="text-primary">You Can Trust</span>
          </h2>
          <p className={cn(
            'text-muted-foreground transition-all duration-700 delay-100',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            Shiloh Fresh Exporters adheres to international export and food safety requirements to ensure product quality, traceability, and compliance across all markets.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
            <div
              key={cert.name}
              className={cn(
                'group p-6 rounded-2xl bg-card border border-border hover-lift cursor-pointer text-center transition-all duration-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedCert(cert)}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <CheckCircle2 className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{cert.name}</h3>
            </div>
          ))}
        </div>

        <Dialog open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                {selectedCert?.name}
              </DialogTitle>
              <DialogDescription className="text-base pt-2">
                {selectedCert?.description}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

// TESTIMONIALS SECTION
function TestimonialsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className={cn(
            'inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 transition-all duration-500',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            Testimonials
          </span>
          <h2 className={cn(
            'text-3xl md:text-4xl font-bold text-foreground mb-4 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            What Our <span className="text-primary">Partners Say</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {testimonialsData.map((testimonial, index) => (
            <div
              key={testimonial.author}
              className={cn(
                'relative p-8 bg-card rounded-2xl border border-border hover-lift transition-all duration-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-primary/20 absolute top-6 right-6" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-muted-foreground mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>
              
              {/* Author */}
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                <p className="text-sm text-primary">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Partner Logos */}
        <div className={cn(
          'transition-all duration-700 delay-300',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <p className="text-center text-muted-foreground mb-8">Trusted by industry leaders and certified by</p>
          <div className="flex flex-wrap justify-center gap-6">
            {partnerLogos.map((partner, index) => (
              <div
                key={partner.name}
                className="w-24 h-24 rounded-xl bg-card border border-border flex items-center justify-center hover-lift transition-all p-2 overflow-hidden"
                style={{ transitionDelay: `${(index + 3) * 100}ms` }}
              >
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} certification`} 
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// FAQ DATA
const faqData = [
  {
    question: 'What products does Shiloh Fresh export?',
    answer: 'We export premium fresh produce including Hass avocados, Kent mangoes, passion fruits, MD2 pineapples, fresh herbs (basil, mint, cilantro), and vegetables (French beans, snow peas, baby corn, bell peppers).',
  },
  {
    question: 'What are your minimum order quantities (MOQ)?',
    answer: 'Our MOQ varies by product. For avocados, it\'s typically 1,000 kg. For other products, please contact us for specific requirements. We can accommodate smaller trial orders for new clients.',
  },
  {
    question: 'Which countries do you export to?',
    answer: 'We export to over 10 international destinations including countries in Europe, the Middle East, and Asia. Our logistics network supports both air and sea freight to reach global markets.',
  },
  {
    question: 'How do you ensure product quality and freshness?',
    answer: 'We maintain strict quality control at every stage: careful sourcing from certified farmers, rigorous sorting and grading, professional packaging, and unbroken cold chain management from packhouse to destination.',
  },
  {
    question: 'What certifications does Shiloh Fresh have?',
    answer: 'We hold KEBS (Kenya Bureau of Standards), HCDA (Horticultural Crops Directorate), GlobalG.A.P, and Phytosanitary certifications. These ensure our products meet international food safety and quality standards.',
  },
  {
    question: 'How long does shipping take?',
    answer: 'Air freight to Europe takes 24-48 hours. Sea freight takes 3-4 weeks depending on destination. We provide real-time tracking for all shipments and keep you updated throughout the process.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept bank transfers (T/T), Letters of Credit (L/C), and other secure payment methods. Payment terms are typically 30% advance and 70% against shipping documents.',
  },
  {
    question: 'Can I request custom packaging?',
    answer: 'Yes! We offer custom branding and packaging options. Our packaging is designed to maintain freshness and can be tailored to meet your market requirements and branding needs.',
  },
];

// FAQ SECTION
function FAQSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className={cn(
            'inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 transition-all duration-500',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            FAQ
          </span>
          <h2 className={cn(
            'text-3xl md:text-4xl font-bold text-foreground mb-4 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className={cn(
            'text-muted-foreground transition-all duration-700 delay-100',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            Find answers to common questions about our products and export services.
          </p>
        </div>

        <div className={cn(
          'max-w-3xl mx-auto transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        )}>
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border px-6 data-[state=open]:border-primary transition-colors"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className={cn(
          'text-center mt-12 transition-all duration-700 delay-200',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <Link to="/contact">
            <Button variant="outline" size="lg" className="group">
              Contact Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// 8️⃣ CALL TO ACTION SECTION — uses shared PageCTA
import { PageCTA } from '@/components/layout/PageCTA';

function CTASection() {
  return (
    <PageCTA
      title="Partner With Shiloh Fresh Exporters"
      subtitle="Whether you are an importer, distributor, or wholesaler, we are ready to supply premium produce that meets your market needs."
    />
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <VisionMissionSection />
      <ValueHighlights />
      <JourneySection />
      <StatsSection />
      <ShilohWaySection />
      <BusinessOperationsSection />
      <CertificationsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
