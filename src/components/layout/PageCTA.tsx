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
      <div className="container mx-auto px-4">
        <div
          className={cn(
            'relative rounded-3xl overflow-hidden transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          {/* Layout wrapper */}
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* Left: Accent card with text */}
            <div className="relative z-10 bg-accent rounded-3xl p-8 sm:p-10 lg:p-12 lg:w-[60%] xl:w-[55%]">
              {/* Decorative dots */}
              <div className="absolute top-6 right-6 flex gap-1.5 opacity-30">
                <div className="w-2 h-2 rounded-full bg-foreground" />
                <div className="w-2 h-2 rounded-full bg-foreground" />
                <div className="w-2 h-2 rounded-full bg-foreground" />
              </div>

              <div className="space-y-5 sm:space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
                  {title}
                </h2>
                <p className="text-foreground/70 text-base sm:text-lg max-w-xl">
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

            {/* Right: Dark area with breaking-through fruit character */}
            <div className="relative bg-foreground lg:w-[40%] xl:w-[45%] min-h-[200px] sm:min-h-[250px] lg:min-h-0 flex items-center justify-center overflow-visible">
              {/* Decorative scattered elements */}
              <div className="absolute top-4 left-6 w-3 h-3 bg-accent/30 rounded-full animate-pulse-soft" />
              <div className="absolute bottom-8 left-12 w-2 h-2 bg-primary/40 rounded-full animate-float" />
              <div className="absolute top-1/3 right-8 w-4 h-4 border-2 border-accent/20 rounded-sm rotate-45" />
              <div className="absolute bottom-6 right-16 w-2.5 h-2.5 bg-accent/20 rounded-full" />

              {/* Crack / burst lines (CSS-drawn) */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[15%] left-[10%] w-12 h-0.5 bg-accent/10 rotate-[30deg]" />
                <div className="absolute bottom-[20%] right-[15%] w-10 h-0.5 bg-accent/10 -rotate-[20deg]" />
                <div className="absolute top-[40%] left-[5%] w-8 h-0.5 bg-primary/10 rotate-[60deg]" />
              </div>

              {/* The avocado character — breaking through */}
              <img
                src={avocadoCharacter}
                alt="Fun avocado character breaking through"
                className={cn(
                  'relative z-20 w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72 xl:w-80 xl:h-80 object-contain drop-shadow-2xl transition-all duration-700',
                  'lg:-ml-12 xl:-ml-16',
                  isVisible ? 'scale-100 rotate-0 opacity-100' : 'scale-50 rotate-12 opacity-0'
                )}
                style={{ transitionDelay: '300ms' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
