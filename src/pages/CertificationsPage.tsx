import { useState } from 'react';
import { Award, Shield, Leaf, FileCheck, ExternalLink, Building2 } from 'lucide-react';
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
  description: string;
  fullDescription: string;
  benefits: string[];
  certificateImage?: string;
}

const certifications: Certification[] = [
  {
    id: 'kebs',
    name: 'Kenya Bureau of Standards',
    shortName: 'KEBS',
    icon: Shield,
    description: 'National quality standards certification for Kenyan products.',
    fullDescription: 'The Kenya Bureau of Standards (KEBS) certification ensures that our products meet the national quality and safety standards required for export from Kenya. This certification is mandatory for all food products exported from Kenya.',
    benefits: [
      'Guarantees product quality and safety',
      'Required for all Kenyan exports',
      'Regular quality audits',
      'Consumer protection assurance',
    ],
  },
  {
    id: 'hcda',
    name: 'Horticultural Crops Directorate',
    shortName: 'HCDA',
    icon: Leaf,
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
    description: 'International standard for good agricultural practices.',
    fullDescription: 'GlobalG.A.P certification demonstrates our commitment to safe and sustainable agricultural practices. This internationally recognized standard covers food safety, environmental protection, worker health and safety, and animal welfare.',
    benefits: [
      'International market access',
      'Food safety assurance',
      'Environmental sustainability',
      'Worker welfare standards',
    ],
  },
  {
    id: 'phytosanitary',
    name: 'Phytosanitary Compliance',
    shortName: 'KEPHIS',
    icon: FileCheck,
    description: 'Plant health certification for international trade.',
    fullDescription: 'Phytosanitary certification from the Kenya Plant Health Inspectorate Service (KEPHIS) ensures that our products are free from pests and diseases, meeting the import requirements of destination countries.',
    benefits: [
      'Plant health guarantee',
      'Pest-free certification',
      'International trade compliance',
      'Pre-export inspections',
    ],
  },
];

function CertificationCard({
  cert,
  onViewDetails,
}: {
  cert: Certification;
  onViewDetails: () => void;
}) {
  const Icon = cert.icon;

  return (
    <div className="group bg-card rounded-2xl border border-border p-8 hover-lift transition-all duration-300">
      <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
        <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{cert.shortName}</h3>
      <p className="text-sm text-primary mb-3">{cert.name}</p>
      <p className="text-muted-foreground mb-6">{cert.description}</p>
      <Button variant="outline" size="sm" onClick={onViewDetails} className="group/btn">
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
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl font-bold text-foreground">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Icon className="w-6 h-6 text-primary-foreground" />
            </div>
            {cert.shortName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <p className="text-primary font-medium mb-2">{cert.name}</p>
            <p className="text-muted-foreground leading-relaxed">{cert.fullDescription}</p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Key Benefits</h4>
            <ul className="space-y-2">
              {cert.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3 p-3 bg-secondary rounded-xl">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-foreground">{benefit}</span>
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
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Certifications" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in-down">
            Certifications
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-in-up">
            Meeting the highest international standards for quality and safety.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-muted-foreground leading-relaxed">
              We have actively engaged with various export industry associations to guarantee that the quality and authenticity of our products and services meet the highest standards. Our certifications demonstrate our commitment to excellence and compliance with international regulations.
            </p>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section ref={ref} className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <div
                key={cert.id}
                className={cn(
                  'transition-all duration-500',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CertificationCard
                  cert={cert}
                  onViewDetails={() => setSelectedCert(cert)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Message */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Your Assurance of Quality
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
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
