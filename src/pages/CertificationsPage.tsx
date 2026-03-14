import { useState } from 'react';
import { Award, Leaf, Building2, ExternalLink, CheckCircle2, Clock, ArrowRight, BookOpen, ChevronDown, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PageHero } from '@/components/layout/PageHero';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { getWhatsAppLink, whatsAppMessages } from '@/data/products';
import heroAboutImg from '@/assets/hero/hero-about.jpg';
import companyRegCert from '@/assets/certifications/company-registration.jpg';
import fpcMembershipCert from '@/assets/certifications/fpc-membership.jpg';
import hcdaLicenseCert from '@/assets/certifications/hcda-license.jpg';
import globalgapCert from '@/assets/certifications/globalgap-cert.jpg';

// Blog images
import exportWhyImg from '@/assets/blog/export-why.jpg';
import exportHowImg from '@/assets/blog/export-how.jpg';
import whatToExportImg from '@/assets/blog/what-to-export.jpg';
import exportChallengesImg from '@/assets/blog/export-challenges.jpg';
import coldChainImg from '@/assets/blog/cold-chain.jpg';
import exportMarketsImg from '@/assets/blog/export-markets.jpg';

// === Certifications ===

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
    id: 'fpc-kenya',
    name: 'Fresh Produce Consortium of Kenya (FPC Kenya)',
    shortName: 'FPC Kenya Membership',
    icon: Leaf,
    category: 'trade',
    description: 'Registered member of the Fresh Produce Consortium of Kenya, promoting Kenya\'s fresh produce exports.',
    fullDescription: 'Shiloh Fresh Exporters Limited is an Ordinary Member of the Fresh Produce Consortium of Kenya (FPC Kenya), valid from December 2023 to November 2024. FPC Kenya is the leading industry body promoting Kenya\'s fresh produce sector, providing market access support, advocacy, and networking opportunities for exporters.',
    benefits: [
      'Industry networking & advocacy',
      'Market access support',
      'Trade promotion & exhibitions',
      'Best practice sharing',
    ],
    certificateImage: fpcMembershipCert,
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
    certificateImage: hcdaLicenseCert,
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
    certificateImage: globalgapCert,
  },
];

const certCategories = [
  { key: 'legal' as const, label: 'Legal & Registration', subtitle: 'Our corporate identity and legal standing' },
  { key: 'trade' as const, label: 'Trade & Export', subtitle: 'Authorized export operations and market access' },
  { key: 'agricultural' as const, label: 'Agricultural Standards', subtitle: 'International farming and safety practices' },
];

// === Blog Data ===

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  readTime: string;
  date: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 'why-export',
    title: 'Why Export Fresh Produce from East Africa?',
    excerpt: 'East Africa holds a unique position in the global fresh produce market. Discover why Kenya, Uganda, and Tanzania are becoming the go-to source for premium fruits, vegetables, and herbs.',
    content: [
      'East Africa, particularly Kenya, has established itself as a powerhouse in the global fresh produce export market. The region\'s unique combination of equatorial climate, fertile volcanic soils, and altitude variations creates ideal growing conditions for a wide range of fruits, vegetables, and herbs that are in high demand across Europe, the Middle East, and Asia.',
      'Kenya alone exports over 300,000 tonnes of fresh produce annually, generating billions in foreign exchange. The horticulture sector is the country\'s third-largest earner after tourism and tea, employing over 6 million people directly and indirectly. For small-scale farmers and agribusinesses, exporting opens doors to premium pricing — often 3-5x higher than local market rates.',
      'The strategic geographic location of East Africa provides another competitive advantage. Nairobi\'s Jomo Kenyatta International Airport (JKIA) offers direct cargo flights to major European cities in just 8-10 hours, while the Port of Mombasa connects to maritime routes reaching the Middle East, Asia, and beyond. This proximity to key markets, combined with year-round growing seasons, ensures consistent supply when competitors face seasonal gaps.',
      'Beyond economics, exporting drives quality improvement across the entire value chain. GlobalG.A.P standards, food safety protocols, and traceability systems adopted for export markets have raised the bar for agricultural practices, benefiting both export and domestic consumers.',
    ],
    image: exportWhyImg,
    readTime: '5 min read',
    date: 'March 2026',
    tags: ['Export', 'East Africa', 'Market Opportunity'],
  },
  {
    id: 'what-to-export',
    title: 'Top Fresh Produce Exports from Kenya, Uganda & Tanzania',
    excerpt: 'From Hass avocados to Bird\'s Eye chilies, learn which products are driving record-breaking export volumes and commanding premium prices in international markets.',
    content: [
      'The East African fresh produce export basket is remarkably diverse, but certain products consistently outperform in terms of volume, value, and market demand. Understanding what to export — and when — is critical for both new entrants and established players looking to optimize their product mix.',
      'Avocados have emerged as the undisputed star of Kenyan exports. The Hass variety, prized for its creamy texture and long shelf life, commands premium prices in European and Asian markets. Kenya is now the world\'s sixth-largest avocado exporter, with production centered in Murang\'a, Kiambu, and Embu counties. The peak season runs from March to September, though off-season fruit commands even higher prices.',
      'French beans remain Kenya\'s most consistent vegetable export, with fine and extra-fine varieties grown in highland areas like Kirinyaga and Meru. Other vegetables gaining traction include snow peas, sugar snaps, chili peppers (particularly the Demon F1 variety), and okra — the latter finding strong demand in Middle Eastern markets.',
      'The herbs segment, while smaller in volume, offers the highest margins per kilogram. Sweet basil, rosemary, mint, coriander, and thyme are air-freighted to European supermarkets year-round, with prices ranging from USD 3-8 per kg. New entrants like tree tomatoes (tamarillo) and specialty guavas are also finding niche but lucrative markets.',
      'From Uganda, passion fruits and pineapples are rising exports, while Tanzania contributes avocados from Arusha and coastal mangoes. The key to success is matching your product to market demand, season, and your sourcing region\'s strengths.',
    ],
    image: whatToExportImg,
    readTime: '6 min read',
    date: 'March 2026',
    tags: ['Products', 'Avocado', 'Vegetables', 'Herbs'],
  },
  {
    id: 'how-to-export',
    title: 'How to Export Fresh Produce: A Step-by-Step Guide',
    excerpt: 'From farm to foreign shelf — a comprehensive guide covering sourcing, quality control, packaging, documentation, and logistics for successful fresh produce exports.',
    content: [
      'Exporting fresh produce from East Africa requires careful planning across multiple stages. Whether you\'re a farmer looking to export directly or a trading company building sourcing networks, understanding each step is essential for success and compliance.',
      'Step 1: Registration & Compliance — Register with the Horticultural Crops Directorate (HCD) and obtain your export license. You\'ll also need KEPHIS (Kenya Plant Health Inspectorate Service) clearance for phytosanitary certification, and depending on your target market, GlobalG.A.P certification may be required. Each destination country has specific Maximum Residue Level (MRL) requirements that your produce must meet.',
      'Step 2: Sourcing & Quality Control — Establish reliable sourcing from farmers or cooperatives who follow Good Agricultural Practices (GAP). Implement traceability systems from farm to packhouse. Conduct pre-harvest assessments for maturity, pest damage, and chemical residue. Only produce that meets export grade standards should proceed to the packhouse.',
      'Step 3: Post-Harvest Handling — This is where most value is lost or preserved. Proper cooling within 2-4 hours of harvest is critical. Sorting, grading, and packing should follow buyer specifications. Use food-grade packaging materials and ensure cold chain integrity from packhouse to airport or port.',
      'Step 4: Documentation — Prepare commercial invoices, packing lists, phytosanitary certificates, certificates of origin, and airway bills or bills of lading. Some markets require additional documentation such as health certificates or fumigation records.',
      'Step 5: Logistics — Choose between air freight (for perishables like herbs, beans, berries) and sea freight (for hardier produce like avocados, mangoes). Work with established freight forwarders who specialize in fresh produce and can guarantee cold chain compliance throughout transit.',
    ],
    image: exportHowImg,
    readTime: '8 min read',
    date: 'February 2026',
    tags: ['Guide', 'Compliance', 'Logistics', 'Documentation'],
  },
  {
    id: 'export-challenges',
    title: 'Common Challenges in Fresh Produce Exporting (And How to Overcome Them)',
    excerpt: 'From cold chain breaks to compliance headaches, explore the real-world challenges exporters face and practical solutions that work in the East African context.',
    content: [
      'Fresh produce exporting from East Africa is a high-reward business, but it comes with significant challenges that can make or break an operation. Understanding these obstacles and preparing solutions in advance is what separates successful exporters from those who struggle.',
      'Cold Chain Failures — The number one cause of export rejections is temperature abuse. From farm to final destination, produce must maintain specific temperature ranges (typically 2-8°C for most vegetables, 5-12°C for tropical fruits). In East Africa, the challenge is acute: limited cold storage at farm level, inconsistent refrigerated transport, and occasional power outages can break the cold chain. Solution: Invest in portable pre-coolers, insulated packaging, and real-time temperature monitoring devices.',
      'Compliance & MRL Exceedances — European and UK markets have increasingly strict Maximum Residue Level (MRL) requirements. A single consignment testing positive for banned pesticides can result in border rejections, financial losses, and even temporary market bans. Solution: Implement integrated pest management (IPM), maintain spray records, observe pre-harvest intervals strictly, and conduct pre-export lab testing.',
      'Market Access & Buyer Relationships — Finding reliable buyers in destination markets is often the biggest hurdle for new exporters. Many first-time exporters send produce without confirmed buyers, leading to distress sales or total losses. Solution: Build relationships through trade shows (Fruit Logistica, Macfrut), work with established export agents, and start with smaller trial shipments to build trust.',
      'Payment & Currency Risks — International trade involves payment terms (often 14-30 days after arrival), currency fluctuations, and occasional buyer disputes. Solution: Use letters of credit for new relationships, negotiate favorable payment terms, and maintain adequate working capital to bridge payment gaps.',
      'Infrastructure Gaps — Rural road networks, limited packhouse facilities, and unreliable electricity remain persistent challenges in sourcing regions. Solution: Partner with established packhouses, invest in solar-powered cold rooms, and consolidate sourcing to minimize transport distances.',
    ],
    image: exportChallengesImg,
    readTime: '7 min read',
    date: 'February 2026',
    tags: ['Challenges', 'Cold Chain', 'Compliance', 'Solutions'],
  },
  {
    id: 'cold-chain',
    title: 'Understanding Cold Chain Management for Fresh Produce Exports',
    excerpt: 'Temperature is everything in fresh produce. Learn how proper cold chain management can extend shelf life, reduce waste, and ensure your produce arrives in premium condition.',
    content: [
      'In fresh produce exports, the cold chain isn\'t just logistics — it\'s the lifeline that determines whether your product arrives as premium export-grade or ends up as waste. Understanding and managing every link in this chain is arguably the most critical competency for any exporter.',
      'The cold chain begins at harvest. The concept of "field heat removal" is fundamental: every hour that harvested produce spends at ambient temperature (often 25-35°C in East Africa) reduces its shelf life significantly. For leafy herbs, this can mean losing 2-3 days of shelf life per hour of delay. Best practice is pre-cooling within 2 hours of harvest.',
      'Pre-cooling methods vary by product. Forced-air cooling is most common for fruits like avocados and mangoes, bringing core temperatures from 25°C down to 5-8°C within 4-6 hours. Hydro-cooling (immersion in chilled water) works well for French beans and snow peas. Vacuum cooling is ideal for herbs and leafy vegetables, achieving rapid cooling in 20-30 minutes.',
      'Packhouse temperature management is the next critical link. Sorting, grading, and packing should occur in temperature-controlled environments (15-18°C for work areas, with dedicated cold rooms at product-specific temperatures). Packaging materials should facilitate airflow while providing insulation — corrugated cartons with ventilation holes are standard for most products.',
      'Transport to airport or port must use refrigerated trucks ("reefers") set to the correct temperature. At JKIA, the perishable cargo terminal maintains cold chain integrity through insulated handling areas and cold storage. For sea freight via Mombasa, reefer containers are pre-cooled before loading and monitored throughout the voyage.',
      'The final mile — from destination port/airport to the buyer\'s distribution center — is often beyond the exporter\'s direct control but remains their responsibility in terms of shelf life guarantee. Proper documentation of temperature records throughout the chain provides crucial evidence in case of disputes.',
    ],
    image: coldChainImg,
    readTime: '7 min read',
    date: 'January 2026',
    tags: ['Cold Chain', 'Quality', 'Shelf Life', 'Logistics'],
  },
  {
    id: 'export-markets',
    title: 'Best Export Markets for East African Fresh Produce in 2026',
    excerpt: 'Europe, the Middle East, or Asia? Discover which markets offer the best opportunities, pricing, and growth potential for Kenyan, Ugandan, and Tanzanian exporters.',
    content: [
      'Choosing the right destination market is one of the most strategic decisions a fresh produce exporter can make. Each market has distinct requirements, pricing structures, and growth trajectories that can significantly impact profitability.',
      'European Union — Still the dominant destination for East African fresh produce, the EU accounts for over 60% of Kenya\'s horticultural exports by value. The UK, Netherlands, France, and Germany are the primary markets. EU buyers demand strict compliance with GlobalG.A.P, stringent MRL limits, and increasingly, evidence of sustainable and ethical sourcing. Despite regulatory complexity, EU markets offer the most consistent demand and premium pricing, particularly for avocados, French beans, and herbs.',
      'United Kingdom (Post-Brexit) — The UK remains a key market but now operates under its own regulatory framework. While standards are largely aligned with the EU, there are growing differences in MRL tolerances and import documentation. The UK\'s strong retail sector (Tesco, Sainsbury\'s, M&S) offers high-volume opportunities but demands rigorous supplier audits. Niche opportunities exist in ethnic food markets, particularly for chili peppers, okra, and tropical fruits.',
      'Middle East (UAE, Saudi Arabia, Qatar) — The fastest-growing destination for East African produce. The Middle East offers several advantages: less stringent regulatory requirements compared to the EU, strong demand for avocados, mangoes, and chili peppers, and geographic proximity via Mombasa port. Dubai\'s re-export hub also provides access to wider Asian markets.',
      'Asia (China, Japan, India) — Emerging markets with enormous potential but significant barriers to entry. China recently opened its market to Kenyan avocados, creating a huge new opportunity. Japan demands exceptionally high quality standards but pays premium prices. India is a growing market for herbs and specialty vegetables.',
      'Regional (East & Southern Africa) — Often overlooked, regional markets like South Africa, the DRC, and South Sudan offer opportunities with lower compliance costs, shorter transit times, and cash-on-delivery payment terms. These markets are particularly suitable for mangoes, pineapples, and passion fruits.',
    ],
    image: exportMarketsImg,
    readTime: '8 min read',
    date: 'January 2026',
    tags: ['Markets', 'EU', 'Middle East', 'Strategy'],
  },
];

// === Certification Components ===

function CertificationCard({ cert, onViewDetails, featured = false }: { cert: Certification; onViewDetails: () => void; featured?: boolean }) {
  const Icon = cert.icon;

  if (featured && cert.certificateImage) {
    return (
      <div className="group bg-card rounded-2xl border border-border overflow-hidden hover-lift transition-all duration-300">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative bg-muted/30 p-6 flex items-center justify-center">
            <div className="relative max-w-[280px] w-full">
              <img src={cert.certificateImage} alt={`${cert.shortName} certificate`} className="w-full h-auto rounded-lg border border-border/50 shadow-sm select-none pointer-events-none" draggable={false} onContextMenu={(e) => e.preventDefault()} />
            </div>
          </div>
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

function CertificationModal({ cert, isOpen, onClose }: { cert: Certification | null; isOpen: boolean; onClose: () => void }) {
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
              <img src={cert.certificateImage} alt={`${cert.shortName} certificate`} className="w-full h-auto select-none pointer-events-none" draggable={false} onContextMenu={(e) => e.preventDefault()} />
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

// === Blog Components ===

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className={cn(
        'bg-card rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-xl transition-all duration-500 animate-fade-in-up'
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative h-52 overflow-hidden group">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        <div className="absolute top-3 right-3 flex gap-1.5">
          <Badge className="bg-background/90 text-foreground text-[10px] backdrop-blur-sm">
            <Clock className="w-3 h-3 mr-1" />
            {post.readTime}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-4">
          <p className="text-background/70 text-xs">{post.date}</p>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div className="flex flex-wrap gap-1">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
          ))}
        </div>

        <h3 className="text-lg font-bold text-foreground leading-tight">{post.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          {expanded ? 'Read less' : 'Read full article'}
          <ChevronDown className={cn('w-4 h-4 transition-transform', expanded && 'rotate-180')} />
        </button>

        {expanded && (
          <div className="space-y-4 pt-3 border-t border-border animate-fade-in-up">
            {post.content.map((paragraph, i) => (
              <p key={i} className="text-sm text-muted-foreground leading-relaxed">{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

// === Page ===

export default function CertificationsPage() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [activeTab, setActiveTab] = useState<'certifications' | 'blog'>('certifications');
  const { ref: certRef, isVisible: certVisible } = useScrollAnimation<HTMLElement>();
  const { ref: blogRef, isVisible: blogVisible } = useScrollAnimation<HTMLElement>();

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Certifications & Blog" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in-down">
            Certifications & Blog
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto animate-fade-in-up">
            Our quality credentials and expert insights on fresh produce exporting from East Africa.
          </p>

          {/* Tab Switcher */}
          <div className="flex justify-center gap-2 mt-8">
            <Button
              variant={activeTab === 'certifications' ? 'default' : 'outline'}
              onClick={() => setActiveTab('certifications')}
              className={cn(activeTab !== 'certifications' && 'bg-background/20 border-background/30 text-primary-foreground hover:bg-background/30')}
            >
              <Award className="w-4 h-4 mr-2" />
              Certifications
            </Button>
            <Button
              variant={activeTab === 'blog' ? 'default' : 'outline'}
              onClick={() => setActiveTab('blog')}
              className={cn(activeTab !== 'blog' && 'bg-background/20 border-background/30 text-primary-foreground hover:bg-background/30')}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Export Blog
            </Button>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      {activeTab === 'certifications' && (
        <>
          <section className="py-12 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-muted-foreground leading-relaxed">
                  We have actively engaged with various export industry associations to guarantee that the quality and authenticity of our products and services meet the highest standards.
                </p>
              </div>
            </div>
          </section>

          <section ref={certRef} className="pb-16 bg-background">
            <div className="container mx-auto px-4 space-y-14">
              {certCategories.map((category, catIndex) => {
                const categoryCerts = certifications.filter(c => c.category === category.key);
                if (categoryCerts.length === 0) return null;

                return (
                  <div
                    key={category.key}
                    className={cn(
                      'transition-all duration-600',
                      certVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    )}
                    style={{ transitionDelay: `${catIndex * 150}ms` }}
                  >
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-foreground mb-1">{category.label}</h2>
                      <p className="text-sm text-muted-foreground">{category.subtitle}</p>
                      <div className="w-16 h-1 bg-primary rounded-full mt-3" />
                    </div>

                    <div className="space-y-6">
                      {categoryCerts.filter(c => c.certificateImage).map((cert) => (
                        <CertificationCard key={cert.id} cert={cert} onViewDetails={() => setSelectedCert(cert)} featured />
                      ))}
                      {categoryCerts.filter(c => !c.certificateImage).length > 0 && (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {categoryCerts.filter(c => !c.certificateImage).map((cert) => (
                            <CertificationCard key={cert.id} cert={cert} onViewDetails={() => setSelectedCert(cert)} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}

      {/* Blog Section */}
      {activeTab === 'blog' && (
        <section ref={blogRef} className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className={cn(
              'text-center mb-12 transition-all duration-700',
              blogVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Export Insights & Guides
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Practical knowledge on fresh produce exporting — from getting started to scaling your operations across international markets.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {blogPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-14 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
            {activeTab === 'certifications' ? 'Your Assurance of Quality' : 'Ready to Start Exporting?'}
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-sm mb-6">
            {activeTab === 'certifications'
              ? 'Our certifications are regularly audited and renewed to ensure continuous compliance. When you choose Shiloh Fresh, you\'re choosing a partner committed to the highest standards.'
              : 'Whether you\'re a first-time exporter or looking for a reliable sourcing partner, our team is ready to guide you through every step of the export process.'}
          </p>
          <a href={getWhatsAppLink(whatsAppMessages.general)} target="_blank" rel="noopener noreferrer">
            <Button variant="whatsapp" size="lg" className="gap-2">
              <MessageCircle className="w-5 h-5" />
              Talk to Our Export Team
            </Button>
          </a>
        </div>
      </section>

      <CertificationModal cert={selectedCert} isOpen={!!selectedCert} onClose={() => setSelectedCert(null)} />
    </div>
  );
}
