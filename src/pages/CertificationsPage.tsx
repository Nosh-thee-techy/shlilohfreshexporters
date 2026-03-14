import { useState } from 'react';
import { Award, Leaf, Building2, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import heroImage from '@/assets/hero-farm.jpg';
import companyRegCert from '@/assets/certifications/company-registration.jpg';

interface Certification {
  id: string;
  name: string;
  shortName: string;
  icon: React.ElementType;
  category: 'legal' | 'agricultural' | 'trade';
  description: string;
  fullDescription: string;
  benefits: string[];
  certificateImage?: string;
}

const certifications: Certification[] = [
  {
    id: 'company-registration',
    name: 'Certificate of Incorporation',
    shortName: 'Company Registration',
    icon: Building2,
    category: 'legal',
    description: 'Officially incorporated as a Private Limited Company under the Companies Act, 2015.',
    fullDescription: 'Shiloh Fresh Exporters Limited is officially incorporated under the Companies Act, 2015 as a Private Limited Company. This certificate, issued by the Registrar of Companies on 16 August 2023, confirms our legal status and authorization to operate as a registered business entity in Kenya.',
    benefits: [
      'Legally registered business entity',
      'Private Limited Company status',
      'Incorporated under Companies Act, 2015',
      'Authorized to conduct export operations',
    ],
    certificateImage: companyRegCert,
  },
  {
    id: 'hcda',
    name: 'Horticultural Crops Directorate',
    shortName: 'HCDA',
    icon: Leaf,
    category: 'trade',
    description: 'Official registration for horticultural export operations.',
    fullDescription: 'The Horticultural Crops Directorate Authority (HCDA) registration certifies that Shiloh Fresh Exporters is an authorized exporter of horticultural products from Kenya, complying with all regulatory requirements.',
    benefits: [
      'Authorized export operations',
      'Regulatory compliance',
      'Market access facilitation',
      'Industry best practices',
    ],
  },
  {
    id: 'globalGap',
    name: 'GlobalG.A.P Certification',
    shortName: 'GlobalG.A.P',
    icon: Award,
    category: 'agricultural',
    description: 'International standard for good agricultural practices.',
    fullDescription: 'GlobalG.A.P certification demonstrates our commitment to safe and sustainable agricultural practices. This internationally recognized standard covers food safety, environmental protection, worker health and safety, and animal welfare.',
    benefits: [
      'International market access',
      'Food safety assurance',
      'Environmental sustainability',
      'Worker welfare standards',
    ],
  },
];

const categories = [
  { key: 'legal' as const, label: 'Legal & Registration', subtitle: 'Our corporate identity and legal standing' },
  { key: 'trade' as const, label: 'Trade & Export', subtitle: 'Authorized export operations and market access' },
  { key: 'agricultural' as const, label: 'Agricultural Standards', subtitle: 'International farming and safety practices' },
];

function CertificationCard({
  cert,
  onViewDetails,
  featured = false,
}: {
  cert: Certification;
  onViewDetails: () => void;
  featured?: boolean;
}) {
  const Icon = cert.icon;

  if (featured && cert.certificateImage) {
    return (
      <div className="group bg-card rounded-2xl border border-border overflow-hidden hover-lift transition-all duration-300">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Certificate preview - constrained size */}
          <div className="relative bg-muted/30 p-6 flex items-center justify-center">
            <div className="relative max-w-[280px] w-full">
              <img
                src={cert.certificateImage}
                alt={`${cert.shortName} certificate`}
                className="w-full h-auto rounded-lg border border-border/50 shadow-sm select-none pointer-events-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-background/10 to-transparent" />
            </div>
          </div>
          {/* Details */}
          <div className="p-8 flex flex-col justify-center">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
              <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-1">{cert.shortName}</h3>
            <p className="text-sm text-primary mb-3">{cert.name}</p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5">{cert.description}</p>
            <Button variant="outline" size="sm" onClick={onViewDetails} className="w-fit group/btn">
              View Details
              <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-card rounded-2xl border border-border p-7 hover-lift transition-all duration-300 h-full flex flex-col">
      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300">
        <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">{cert.shortName}</h3>
      <p className="text-sm text-primary mb-2">{cert.name}</p>
      <p className="text-sm text-muted-foreground mb-5 flex-1">{cert.description}</p>
      <Button variant="outline" size="sm" onClick={onViewDetails} className="w-fit group/btn">
        Learn More
        <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
}

function CertificationModal({
  cert,
  isOpen,
  onClose,
}: {
  cert: Certification | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!cert) return null;
  const Icon = cert.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl font-bold text-foreground">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary-foreground" />
            </div>
            {cert.shortName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {cert.certificateImage && (
            <div className="rounded-lg overflow-hidden border border-border max-w-[240px] mx-auto">
              <img
                src={cert.certificateImage}
                alt={`${cert.shortName} certificate`}
                className="w-full h-auto select-none pointer-events-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          )}

          <div>
            <p className="text-primary font-medium text-sm mb-1">{cert.name}</p>
            <p className="text-muted-foreground text-sm leading-relaxed">{cert.fullDescription}</p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground text-sm mb-2">Key Benefits</h4>
            <ul className="space-y-1.5">
              {cert.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2.5 p-2.5 bg-secondary rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-foreground text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function CertificationsPage() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Certifications" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in-down">
            Certifications & Compliance
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto animate-fade-in-up">
            Meeting the highest international standards for quality, safety, and sustainability.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground leading-relaxed">
              We have actively engaged with various export industry associations to guarantee that the quality and authenticity of our products and services meet the highest standards.
            </p>
          </div>
        </div>
      </section>

      {/* Categorized Certifications */}
      <section ref={ref} className="pb-16 bg-background">
        <div className="container mx-auto px-4 space-y-14">
          {categories.map((category, catIndex) => {
            const categoryCerts = certifications.filter(c => c.category === category.key);
            if (categoryCerts.length === 0) return null;

            return (
              <div
                key={category.key}
                className={cn(
                  'transition-all duration-600',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                )}
                style={{ transitionDelay: `${catIndex * 150}ms` }}
              >
                {/* Section header */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-foreground mb-1">{category.label}</h2>
                  <p className="text-sm text-muted-foreground">{category.subtitle}</p>
                  <div className="w-16 h-1 bg-primary rounded-full mt-3" />
                </div>

                {/* Cards */}
                {categoryCerts.length === 1 && categoryCerts[0].certificateImage ? (
                  <CertificationCard
                    cert={categoryCerts[0]}
                    onViewDetails={() => setSelectedCert(categoryCerts[0])}
                    featured
                  />
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryCerts.map((cert) => (
                      <CertificationCard
                        key={cert.id}
                        cert={cert}
                        onViewDetails={() => setSelectedCert(cert)}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust Message */}
      <section className="py-14 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Your Assurance of Quality
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            Our certifications are regularly audited and renewed to ensure continuous compliance. When you choose Shiloh Fresh, you're choosing a partner committed to the highest standards.
          </p>
        </div>
      </section>

      <CertificationModal
        cert={selectedCert}
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </div>
  );
}
