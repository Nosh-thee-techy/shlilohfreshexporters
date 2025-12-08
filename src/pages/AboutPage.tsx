import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, Heart, ArrowRight, X } from 'lucide-react';
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

const timeline = [
  { year: '2018', title: 'Company Founded', description: 'Shiloh Fresh Exporters was established with a vision to connect Kenyan farmers to global markets.' },
  { year: '2019', title: 'First Export', description: 'Successfully completed our first export shipment to the European Union.' },
  { year: '2020', title: 'GlobalG.A.P Certified', description: 'Achieved GlobalG.A.P certification, opening doors to more international markets.' },
  { year: '2021', title: 'Expanded Operations', description: 'Partnered with over 300 local farmers and expanded our product range.' },
  { year: '2023', title: 'Regional Leader', description: 'Became one of the leading fresh produce exporters in East Africa.' },
];

const teamMembers = [
  { name: 'John Mwangi', role: 'Chief Executive Officer', bio: 'Over 15 years of experience in agricultural exports and business development.' },
  { name: 'Sarah Wanjiku', role: 'Operations Director', bio: 'Expert in supply chain management and quality control systems.' },
  { name: 'David Ochieng', role: 'Export Manager', bio: 'Specialist in international trade regulations and logistics.' },
  { name: 'Grace Njeri', role: 'Farmer Relations Manager', bio: 'Passionate about sustainable farming and community development.' },
];

const stats = [
  { number: '500+', label: 'Partner Farmers' },
  { number: '12+', label: 'Countries Served' },
  { number: '10+', label: 'Export Partners' },
  { number: '5+', label: 'Years Experience' },
];

function TeamModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Meet Our Team
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid sm:grid-cols-2 gap-6 mt-4">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className="p-6 bg-secondary rounded-xl animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
              <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground">{member.bio}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center p-6">
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{value}</div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  );
}

export default function AboutPage() {
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const { ref: missionRef, isVisible: missionVisible } = useScrollAnimation<HTMLElement>();
  const { ref: timelineRef, isVisible: timelineVisible } = useScrollAnimation<HTMLElement>();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation<HTMLElement>();

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Farm" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4 animate-fade-in-down">
            About Shiloh Fresh
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-in-up">
            Connecting Kenya's finest produce to the world, one shipment at a time.
          </p>
        </div>
      </section>

      {/* Mission & Dedication */}
      <section ref={missionRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div
              className={cn(
                'space-y-6 transition-all duration-700',
                missionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              )}
            >
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Our mission is to deliver the finest, ethically sourced fruits to global markets while empowering local farmers and promoting sustainable agricultural practices. Through integrity, innovation, and excellence, we aim to build long-term partnerships that enrich both people and the planet.
              </p>
            </div>

            <div
              className={cn(
                'space-y-6 transition-all duration-700 delay-200',
                missionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              )}
            >
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center">
                <Heart className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground">Our Dedication</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Service goes beyond transactions—it's about commitment. Dedication means working tirelessly to provide fresh, high-quality fruits while prioritizing customer satisfaction and long-term relationships. We believe in going the extra mile for every partner we serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div
            className={cn(
              'grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-700',
              statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            )}
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-card rounded-2xl shadow-card p-6 text-center hover-lift"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <AnimatedCounter value={stat.number} label={stat.label} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={cn(
              'text-3xl md:text-4xl font-bold text-foreground mb-4 transition-all duration-700',
              timelineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}>
              Our Journey
            </h2>
          </div>

          <div className="max-w-3xl mx-auto relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

            {timeline.map((item, index) => (
              <div
                key={item.year}
                className={cn(
                  'relative flex items-center mb-12 transition-all duration-500',
                  timelineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full md:-translate-x-1/2 z-10 ring-4 ring-background" />
                
                {/* Content */}
                <div className={cn(
                  'ml-12 md:ml-0 md:w-[45%] p-6 bg-card rounded-2xl shadow-card border border-border hover-lift',
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                )}>
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full mb-3">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            The People Behind Shiloh Fresh
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Our dedicated team works tirelessly to ensure quality and excellence in everything we do.
          </p>
          <Button
            variant="glass"
            size="lg"
            onClick={() => setIsTeamModalOpen(true)}
          >
            Meet the Team
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      <TeamModal isOpen={isTeamModalOpen} onClose={() => setIsTeamModalOpen(false)} />
    </div>
  );
}
