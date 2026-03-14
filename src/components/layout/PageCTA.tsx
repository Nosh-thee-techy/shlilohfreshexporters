import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import avocadoCharacter from '@/assets/cta/avocado-character.png';

const WHATSAPP_LINK = "https://wa.me/254735497573?text=Hello%20Shiloh%20Fresh%20Exporters%2C%20I%27d%20like%20to%20inquire.";

interface PageCTAProps {
  title?: string;
  subtitle?: string;
  whatsappMessage?: string;
  showQuoteButton?: boolean;
  variant?: 'primary' | 'secondary';
}

export function PageCTA({
  title = 'Partner With Shiloh Fresh Exporters',
  subtitle = 'Whether you are an importer, distributor, or wholesaler, we are ready to supply premium produce that meets your market needs.',
  whatsappMessage,
  showQuoteButton = true,
}: PageCTAProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const waLink = whatsappMessage
    ? `https://wa.me/254735497573?text=${encodeURIComponent(whatsappMessage)}`
    : WHATSAPP_LINK;

  return (
    <section
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 bg-foreground"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Full-width accent card */}
        <div
          className={cn(
            'relative w-full rounded-3xl bg-accent overflow-hidden transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          {/* Avocado character — top right, overlapping the card */}
          <div className="absolute -top-10 -right-4 sm:-top-14 sm:-right-6 md:-top-16 md:-right-4 z-20 pointer-events-none">
            <img
              src={avocadoCharacter}
              alt="Fun avocado character"
              className={cn(
                'w-32 h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-64 lg:h-64 xl:w-72 xl:h-72 object-contain drop-shadow-2xl transition-all duration-700',
                isVisible ? 'scale-100 rotate-0 opacity-100' : 'scale-50 rotate-12 opacity-0'
              )}
              style={{ transitionDelay: '300ms' }}
            />
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 right-28 sm:right-40 md:right-52 lg:right-64 flex gap-1.5 opacity-20">
            <div className="w-2 h-2 rounded-full bg-foreground" />
            <div className="w-2 h-2 rounded-full bg-foreground" />
            <div className="w-2 h-2 rounded-full bg-foreground" />
          </div>
          <div className="absolute bottom-6 right-8 w-16 h-16 rounded-full bg-foreground/5" />
          <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-foreground/10 rounded-full animate-pulse-soft" />
          <div className="absolute bottom-4 left-1/3 w-2 h-2 bg-foreground/10 rounded-full animate-float" />

          {/* Content */}
          <div className="relative z-10 p-8 sm:p-10 md:p-12 lg:p-14 pr-28 sm:pr-40 md:pr-52 lg:pr-64">
            <div className="space-y-5 sm:space-y-6 max-w-2xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
                {title}
              </h2>
              <p className="text-foreground/70 text-sm sm:text-base md:text-lg max-w-xl">
                {subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {showQuoteButton && (
                  <Link to="/contact">
                    <Button
                      size="lg"
                      className="group bg-foreground text-accent-foreground hover:bg-foreground/90 rounded-full px-6 font-bold w-full sm:w-auto"
                    >
                      <Mail className="w-4 h-4" />
                      Request a Quote
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                )}
                <a href={waLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="whatsapp" size="lg" className="rounded-full px-6 font-bold w-full sm:w-auto">
                    <MessageCircle className="w-4 h-4" />
                    Let's Chat
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
