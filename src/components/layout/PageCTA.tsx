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
  /** 'gold' for accent background, 'green' for primary background */
  variant?: 'gold' | 'green';
  /** Custom character image to display */
  characterImage?: string;
}

export function PageCTA({
  title = 'Partner With Shiloh Fresh Exporters',
  subtitle = 'Whether you are an importer, distributor, or wholesaler, we are ready to supply premium produce that meets your market needs.',
  whatsappMessage,
  showQuoteButton = true,
  variant = 'gold',
  characterImage,
}: PageCTAProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const waLink = whatsappMessage
    ? `https://wa.me/254735497573?text=${encodeURIComponent(whatsappMessage)}`
    : WHATSAPP_LINK;

  const isGold = variant === 'gold';
  const character = characterImage || avocadoCharacter;

  return (
    <section
      ref={ref}
      className={cn(
        'relative overflow-hidden',
        isGold ? 'bg-accent' : 'bg-primary'
      )}
    >
      {/* Character — top right */}
      <div className="absolute -top-6 -right-2 sm:-top-14 sm:-right-6 md:-top-16 md:-right-4 z-20 pointer-events-none">
        <img
          src={character}
          alt="Fun fruit character"
          className={cn(
            'w-24 h-24 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-64 lg:h-64 xl:w-72 xl:h-72 object-contain drop-shadow-2xl transition-all duration-700',
            isVisible ? 'scale-100 rotate-0 opacity-100' : 'scale-50 rotate-12 opacity-0'
          )}
          style={{ transitionDelay: '300ms' }}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 right-28 sm:right-40 md:right-52 lg:right-64 flex gap-1.5 opacity-20">
        <div className={cn('w-2 h-2 rounded-full', isGold ? 'bg-foreground' : 'bg-primary-foreground')} />
        <div className={cn('w-2 h-2 rounded-full', isGold ? 'bg-foreground' : 'bg-primary-foreground')} />
        <div className={cn('w-2 h-2 rounded-full', isGold ? 'bg-foreground' : 'bg-primary-foreground')} />
      </div>
      <div className={cn('absolute bottom-6 right-8 w-16 h-16 rounded-full', isGold ? 'bg-foreground/5' : 'bg-primary-foreground/5')} />
      <div className={cn('absolute top-1/2 right-1/4 w-3 h-3 rounded-full animate-pulse-soft', isGold ? 'bg-foreground/10' : 'bg-primary-foreground/10')} />
      <div className={cn('absolute bottom-4 left-1/3 w-2 h-2 rounded-full animate-float', isGold ? 'bg-foreground/10' : 'bg-primary-foreground/10')} />

      {/* Content */}
      <div
        className={cn(
          'relative z-10 container mx-auto px-5 sm:px-6 py-14 sm:py-16 lg:py-20 pr-24 sm:pr-40 md:pr-52 lg:pr-64 transition-all duration-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        <div className="space-y-5 sm:space-y-6 max-w-2xl">
          <h2 className={cn(
            'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight',
            isGold ? 'text-foreground' : 'text-primary-foreground'
          )}>
            {title}
          </h2>
          <p className={cn(
            'text-sm sm:text-base md:text-lg max-w-xl',
            isGold ? 'text-foreground/70' : 'text-primary-foreground/75'
          )}>
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {showQuoteButton && (
              <Link to="/quote">
                <Button
                  size="lg"
                  className={cn(
                    'group rounded-full px-6 font-bold w-full sm:w-auto',
                    isGold
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-accent text-foreground hover:bg-accent/90'
                  )}
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
    </section>
  );
}
