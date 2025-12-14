import { useState } from 'react';
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
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useParallax } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import heroImage from '@/assets/hero-farm.jpg';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const WHATSAPP_LINK = "https://wa.me/254716171778?text=Hello%20Shiloh%20Fresh%20Exporters%2C%20I%27d%20like%20to%20inquire.";

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

// 1️⃣ HERO SECTION
function HeroSection() {
  const parallaxOffset = useParallax(0.3);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <img
          src={heroImage}
          alt="Kenyan farmland with fresh produce"
          className="w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4 animate-fade-in-down">
            <span className="inline-block px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-primary-foreground text-sm font-medium border border-primary-foreground/20">
              Premium Fresh Produce from Kenya
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground leading-tight animate-fade-in-up">
            From Africa{' '}
            <span className="text-accent">to the World</span>
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto animate-fade-in-up delay-200 leading-relaxed">
            Our promise, <strong>From Africa to the World</strong>, represents Shiloh Fresh Exporters' commitment to delivering premium, ethically sourced produce from Kenyan farms to global markets. Through sustainable farming practices and modern export systems, we ensure that every shipment reflects the quality, freshness, and authenticity of African agriculture.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in-up delay-300">
            <Link to="/products">
              <Button variant="hero" size="lg" className="group">
                Explore Our Produce
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="whatsapp" size="lg">
                <MessageCircle className="w-5 h-5" />
                Chat with Us on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}

// 2️⃣ VALUE HIGHLIGHTS
function ValueHighlights() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {valueHighlights.map((item, index) => (
            <div
              key={item.title}
              className={cn(
                'group flex items-center gap-4 p-6 rounded-2xl bg-card border border-border hover-lift transition-all duration-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <item.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <p className="text-muted-foreground font-medium">{item.description}</p>
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

  useState(() => {
    if (isVisible && count < target) {
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
  });

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-bold text-primary">
      {isVisible ? count : 0}{suffix}
    </span>
  );
}

function StatsSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className={cn(
            'inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 transition-all duration-500',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}>
            Where We Stand Now
          </span>
          <h2 className={cn(
            'text-3xl md:text-4xl font-bold text-foreground transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}>
            Our Growth <span className="text-primary">in Numbers</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {statsData.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                'p-6 bg-card rounded-2xl shadow-card text-center hover-lift transition-all duration-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <AnimatedCounter target={stat.number} suffix={stat.suffix} />
              <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 5️⃣ SHILOH'S WAY
function ShilohWaySection() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={cn(
              'space-y-6 transition-all duration-700',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            )}>
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                Shiloh's Way
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Quality & Food Safety <span className="text-primary">First</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                With a strong focus on quality and food safety, Shiloh Fresh Exporters manages every stage of the supply chain — from farm sourcing to final export. We implement good agronomy practices, responsible pest management, and strict quality control to ensure our produce meets global standards.
              </p>
            </div>

            <div className={cn(
              'transition-all duration-700 delay-200',
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            )}>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground mb-4">Key Focus Areas</h3>
                <div className="grid grid-cols-2 gap-4">
                  {shilohFocusAreas.map((area, index) => (
                    <div
                      key={area.label}
                      className="flex items-center gap-3 p-4 bg-card rounded-xl border border-border hover-lift"
                      style={{ transitionDelay: `${(index + 4) * 100}ms` }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <area.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{area.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
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

// 8️⃣ CALL TO ACTION SECTION
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
            Partner With Shiloh Fresh Exporters
          </h2>
          <p className="text-xl text-primary-foreground/80">
            Whether you are an importer, distributor, or wholesaler, we are ready to supply premium produce that meets your market needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/contact">
              <Button variant="hero" size="lg" className="group">
                <Mail className="w-5 h-5" />
                Request a Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="whatsapp" size="lg">
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us Instantly
              </Button>
            </a>
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
      <ValueHighlights />
      <JourneySection />
      <StatsSection />
      <ShilohWaySection />
      <BusinessOperationsSection />
      <CertificationsSection />
      <CTASection />
    </>
  );
}
