import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const WHATSAPP_LINK = "https://wa.me/254702339421?text=Hello%20Shiloh%20Fresh%20Exporters%2C%20I%27d%20like%20to%20inquire.";

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
  variant = 'primary',
}: PageCTAProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const waLink = whatsappMessage
    ? `https://wa.me/254702339421?text=${encodeURIComponent(whatsappMessage)}`
    : WHATSAPP_LINK;

  return (
    <section
      ref={ref}
      className={cn(
        'py-24',
        variant === 'primary' ? 'bg-primary' : 'bg-secondary'
      )}
    >
      <div className="container mx-auto px-4 text-center">
        <div className={cn(
          'max-w-3xl mx-auto space-y-8 transition-all duration-700',
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        )}>
          <h2 className={cn(
            'text-3xl md:text-5xl font-bold',
            variant === 'primary' ? 'text-primary-foreground' : 'text-foreground'
          )}>
            {title}
          </h2>
          <p className={cn(
            'text-xl',
            variant === 'primary' ? 'text-primary-foreground/80' : 'text-muted-foreground'
          )}>
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            {showQuoteButton && (
              <Link to="/contact">
                <Button variant="hero" size="lg" className="group">
                  <Mail className="w-5 h-5" />
                  Request a Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            )}
            <a href={waLink} target="_blank" rel="noopener noreferrer">
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
