import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Users, 
  Handshake, 
  TreeDeciduous, 
  Heart, 
  ArrowLeft,
  MessageCircle,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/layout/PageHero';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import heroAboutImg from '@/assets/hero/hero-about.jpg';

const csrPillars = [
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Supporting access to education for bright and deserving students who face financial challenges.',
    color: 'bg-blue-500/10 text-blue-600 border-blue-200',
  },
  {
    icon: Users,
    title: 'Empowerment',
    description: 'Building skills and creating opportunities for sustainable livelihoods in agriculture.',
    color: 'bg-orange-500/10 text-orange-600 border-orange-200',
  },
  {
    icon: Handshake,
    title: 'Engagement',
    description: 'Partnering with communities and stakeholders to drive positive change together.',
    color: 'bg-purple-500/10 text-purple-600 border-purple-200',
  },
  {
    icon: TreeDeciduous,
    title: 'Environment',
    description: 'Protecting natural resources and promoting sustainable agricultural practices.',
    color: 'bg-green-500/10 text-green-600 border-green-200',
  },
];

const environmentalActions = [
  'Preserving riparian land, wetlands, and water bodies around farming areas',
  'Encouraging agroforestry and the planting of indigenous trees',
  'Promoting soil health and erosion control through sustainable land use',
  'Discouraging deforestation and unsustainable farming practices',
];

export default function SocialImpactPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLElement>();
  const { ref: pillarsRef, isVisible: pillarsVisible } = useScrollAnimation<HTMLElement>();
  const { ref: educationRef, isVisible: educationVisible } = useScrollAnimation<HTMLElement>();
  const { ref: empowerRef, isVisible: empowerVisible } = useScrollAnimation<HTMLElement>();
  const { ref: envRef, isVisible: envVisible } = useScrollAnimation<HTMLElement>();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation<HTMLElement>();

  return (
    <div className="pt-24">
      <PageHero
        title="Corporate Social Responsibility"
        subtitle="Driving Positive & Sustainable Change"
        backgroundImage={heroAboutImg}
        badge="Our Impact"
      />

      {/* Introduction */}
      <section ref={heroRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className={cn(
            'max-w-4xl mx-auto text-center transition-all duration-700',
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          )}>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              At Shiloh Fresh Exporters, our commitment goes beyond exporting fresh produce. We believe in creating lasting, positive impact within the communities and environments that make our work possible.
            </p>
            <p className="text-lg md:text-xl text-foreground leading-relaxed font-medium">
              Our Corporate Social Responsibility (CSR) vision is centered on driving sustainable development, improving livelihoods, and investing in future generations through meaningful, measurable action.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
                <Heart className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              Our CSR Vision
            </h2>
            <h3 className="text-xl text-primary text-center mb-8 font-medium">
              Investing in Growth Where It Matters Most
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              Our CSR vision is to drive positive and sustainable change in communities while improving the quality of life for people across our value chain. We focus on tangible social impact by mobilizing our resources, partnerships, and expertise to serve community needs and support long-term development.
            </p>
            <p className="text-lg text-foreground leading-relaxed text-center mt-6 font-medium">
              Our priority is to invest and kindle growth in areas facing socio-economic challenges through four key CSR pillars:
            </p>
          </div>
        </div>
      </section>

      {/* CSR Pillars */}
      <section ref={pillarsRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Our Four CSR Pillars
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            The foundation of our commitment to sustainable development and community impact.
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {csrPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className={cn(
                    'bg-card rounded-2xl border border-border p-6 text-center transition-all duration-500 hover:shadow-xl hover:-translate-y-2',
                    pillarsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={cn(
                    'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 border',
                    pillar.color
                  )}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{pillar.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section ref={educationRef} className="py-20 bg-blue-50 dark:bg-blue-950/20">
        <div className="container mx-auto px-4">
          <div className={cn(
            'max-w-4xl mx-auto transition-all duration-700',
            educationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          )}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-200 flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">Supporting Communities Through Education</h2>
                <p className="text-blue-600 font-medium italic">"Elimu ni Msingi" – Education Is the Foundation</p>
              </div>
            </div>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Shiloh Fresh Exporters believes that education is a fundamental right and a powerful driver of social progress. Through community-focused initiatives, we support access to education for bright and deserving students who face financial challenges.
              </p>
              <p>
                Working closely with local schools and community leaders, we help identify students in need and provide support that enables them to continue their education and build a better future.
              </p>
              <p className="text-foreground font-medium">
                Education empowers individuals, strengthens families, and uplifts entire communities — values that align deeply with Shiloh's mission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Empowerment Section */}
      <section ref={empowerRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className={cn(
            'max-w-4xl mx-auto transition-all duration-700',
            empowerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          )}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-orange-500/10 border border-orange-200 flex items-center justify-center">
                <Users className="w-7 h-7 text-orange-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">Empowering & Engaging Communities</h2>
                <p className="text-orange-600 font-medium">Building Skills, Creating Opportunity</p>
              </div>
            </div>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Agriculture plays a vital role in Kenya's economy and provides opportunities for sustainable livelihoods. As part of this ecosystem, Shiloh Fresh Exporters is committed to empowering young people and community members to remain engaged in agribusiness.
              </p>
              <p>
                Through partnerships with agricultural training institutions and industry stakeholders, we support skills development, mentorship, and practical exposure to modern farming and agribusiness practices.
              </p>
              <p className="text-foreground font-medium">
                By empowering individuals with knowledge and opportunity, we contribute to stronger communities and a more resilient agricultural sector.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Environment Section */}
      <section ref={envRef} className="py-20 bg-green-50 dark:bg-green-950/20">
        <div className="container mx-auto px-4">
          <div className={cn(
            'max-w-4xl mx-auto transition-all duration-700',
            envVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          )}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-green-500/10 border border-green-200 flex items-center justify-center">
                <TreeDeciduous className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">Supporting the Environment</h2>
                <p className="text-green-600 font-medium">Protecting Natural Resources for Future Generations</p>
              </div>
            </div>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Environmental responsibility is central to how Shiloh Fresh Exporters operates. We actively promote practices that protect natural ecosystems and reduce environmental impact across our operations and partner farms.
              </p>
              <p>
                Our environmental efforts are guided by principles that support ecosystem sustainability and climate resilience.
              </p>
            </div>

            <div className="mt-8 bg-card rounded-2xl border border-border p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Our Environmental Actions Include:</h3>
              <ul className="space-y-3">
                {environmentalActions.map((action, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-muted-foreground">{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-foreground font-medium mt-6 text-lg">
              By safeguarding natural resources, we help ensure long-term agricultural productivity and environmental balance.
            </p>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Our Commitment
            </h2>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              At Shiloh Fresh Exporters, CSR is not a standalone initiative — it is embedded in how we do business. We remain committed to growing responsibly, supporting communities, and protecting the environment as we expand our footprint in global markets.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className={cn(
            'max-w-3xl mx-auto text-center transition-all duration-700',
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          )}>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Interested in Our Social Impact?
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Learn more about our initiatives or partner with us to create positive change together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Us
                </Button>
              </Link>
              <a
                href="https://wa.me/254735497573?text=Hello%20Shiloh%20Fresh%2C%20I%27m%20interested%20in%20partnering%20on%20social%20impact%20initiatives."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" size="lg" className="gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Partner With Shiloh
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
