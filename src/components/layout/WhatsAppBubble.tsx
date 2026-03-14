import { MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function WhatsAppBubble() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="https://wa.me/254735497573?text=Hello%20Shiloh%20Fresh%20Exporters%2C%20I%27d%20like%20to%20inquire."
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'fixed bottom-6 right-6 z-50 flex items-center gap-3 transition-all duration-300',
        'gradient-whatsapp text-primary-foreground rounded-full shadow-whatsapp',
        'hover:shadow-xl hover:scale-105 active:scale-95',
        isHovered ? 'pr-6 pl-4' : 'p-4'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <MessageCircle className="w-6 h-6 animate-bounce-soft" />
      <span
        className={cn(
          'font-semibold whitespace-nowrap transition-all duration-300 overflow-hidden',
          isHovered ? 'max-w-40 opacity-100' : 'max-w-0 opacity-0'
        )}
      >
        Chat with us
      </span>
    </a>
  );
}
