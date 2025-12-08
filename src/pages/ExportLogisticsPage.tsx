import { useState } from 'react';
import { Search, Filter, Package, Truck, Snowflake, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface ProcessStep {
  id: string;
  icon: React.ElementType;
  title: string;
  shortDescription: string;
  fullDescription: string;
  details: string[];
}

const processSteps: ProcessStep[] = [
  {
    id: 'sourcing',
    icon: Search,
    title: 'Sourcing',
    shortDescription: 'Direct partnerships with trusted local farmers.',
    fullDescription: 'We work directly with over 500 certified farmers across Kenya who follow sustainable agricultural practices.',
    details: [
      'Direct farmer partnerships',
      'Sustainable farming practices',
      'Fair trade agreements',
      'Quality-focused cultivation',
    ],
  },
  {
    id: 'sorting',
    icon: Filter,
    title: 'Sorting',
    shortDescription: 'Careful selection and grading of produce.',
    fullDescription: 'Each piece of produce is hand-sorted and graded according to international standards to ensure only the best quality reaches our clients.',
    details: [
      'Manual and automated sorting',
      'Size and color grading',
      'Ripeness assessment',
      'Quality classification',
    ],
  },
  {
    id: 'quality',
    icon: CheckCircle,
    title: 'Quality Checking',
    shortDescription: 'Rigorous quality control procedures.',
    fullDescription: 'Our quality assurance team performs multiple checks at every stage to ensure products meet international export standards.',
    details: [
      'Visual inspection',
      'Brix level testing',
      'Pesticide residue testing',
      'Microbiological analysis',
    ],
  },
  {
    id: 'packaging',
    icon: Package,
    title: 'Packaging',
    shortDescription: 'Export-grade packaging solutions.',
    fullDescription: 'Products are carefully packed using food-grade materials designed to protect freshness and extend shelf life during transit.',
    details: [
      'Food-grade materials',
      'Custom branding options',
      'Ventilated packaging',
      'Eco-friendly solutions',
    ],
  },
  {
    id: 'cold-chain',
    icon: Snowflake,
    title: 'Cold Chain Logistics',
    shortDescription: 'Temperature-controlled storage and transport.',
    fullDescription: 'Our cold chain infrastructure maintains optimal temperatures from packhouse to final destination, preserving freshness.',
    details: [
      'Pre-cooling facilities',
      '24/7 temperature monitoring',
      'Cold storage warehouses',
      'Refrigerated transport',
    ],
  },
  {
    id: 'shipment',
    icon: Truck,
    title: 'Shipment',
    shortDescription: 'Reliable delivery to global destinations.',
    fullDescription: 'We partner with leading logistics providers to ensure timely and secure delivery to markets worldwide via air and sea freight.',
    details: [
      'Air freight for perishables',
      'Sea freight options',
      'Real-time tracking',
      'Customs clearance support',
    ],
  },
];

function ProcessStep({
  step,
  index,
  isExpanded,
  onToggle,
  isVisible,
}: {
  step: ProcessStep;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  isVisible: boolean;
}) {
  const Icon = step.icon;

  return (
    <div
      className={cn(
        'relative transition-all duration-500',
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex gap-6">
        {/* Timeline */}
        <div className="flex flex-col items-center">
          <div
            className={cn(
              'w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 z-10',
              isExpanded
                ? 'bg-primary text-primary-foreground shadow-lg scale-110'
                : 'bg-secondary text-primary'
            )}
          >
            <Icon className="w-6 h-6" />
          </div>
          {index < processSteps.length - 1 && (
            <div
              className={cn(
                'w-0.5 flex-1 mt-4 transition-colors duration-300',
                isExpanded ? 'bg-primary' : 'bg-border'
              )}
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 pb-12">
          <button
            onClick={onToggle}
            className={cn(
              'w-full text-left p-6 rounded-2xl border transition-all duration-300',
              isExpanded
                ? 'bg-card border-primary shadow-card'
                : 'bg-card border-border hover:border-primary/50 hover:shadow-soft'
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-primary font-medium">Step {index + 1}</span>
                <h3 className="text-xl font-semibold text-foreground mt-1">{step.title}</h3>
                <p className="text-muted-foreground mt-2">{step.shortDescription}</p>
              </div>
              <div className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                isExpanded ? 'bg-primary text-primary-foreground' : 'bg-secondary text-primary'
              )}>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>
            </div>

            <div
              className={cn(
                'overflow-hidden transition-all duration-500',
                isExpanded ? 'max-h-96 mt-6 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <p className="text-foreground mb-4">{step.fullDescription}</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {step.details.map((detail, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-3 bg-secondary rounded-xl"
                  >
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-foreground">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ExportLogisticsPage() {
  const [expandedStep, setExpandedStep] = useState<string | null>('sourcing');
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
            Export & Logistics
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            From farm to global markets — discover our streamlined export process.
          </p>
        </div>
      </section>

      {/* Process Timeline */}
      <section ref={ref} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={cn(
                'text-3xl md:text-4xl font-bold text-foreground mb-4 transition-all duration-700',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}>
                Our Export Process
              </h2>
              <p className={cn(
                'text-lg text-muted-foreground transition-all duration-700 delay-100',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}>
                Click on each step to learn more about our comprehensive process
              </p>
            </div>

            {processSteps.map((step, index) => (
              <ProcessStep
                key={step.id}
                step={step}
                index={index}
                isExpanded={expandedStep === step.id}
                onToggle={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                isVisible={isVisible}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-card rounded-2xl shadow-card text-center hover-lift">
              <div className="text-4xl font-bold text-primary mb-2">24-48h</div>
              <p className="text-muted-foreground">Air freight delivery to Europe</p>
            </div>
            <div className="p-8 bg-card rounded-2xl shadow-card text-center hover-lift">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <p className="text-muted-foreground">Cold chain maintained</p>
            </div>
            <div className="p-8 bg-card rounded-2xl shadow-card text-center hover-lift">
              <div className="text-4xl font-bold text-primary mb-2">Track</div>
              <p className="text-muted-foreground">Real-time shipment tracking</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
