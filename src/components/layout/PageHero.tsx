import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FloatingImage {
  src: string;
  alt: string;
}

interface PageHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  floatingImages?: FloatingImage[];
  badge?: string;
  children?: React.ReactNode;
  /** Overlay color variant */
  overlay?: 'primary' | 'dark';
  /** Height variant */
  size?: 'default' | 'tall';
}

export function PageHero({
  title,
  subtitle,
  backgroundImage,
  floatingImages = [],
  badge,
  children,
  overlay = 'primary',
  size = 'default',
}: PageHeroProps) {
  const [scrollY, setScrollY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      // Normalize to -1 to 1
      setMouseX(((e.clientX - rect.left) / rect.width - 0.5) * 2);
      setMouseY(((e.clientY - rect.top) / rect.height - 0.5) * 2);
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const parallaxOffset = scrollY * 0.3;

  // Positions for floating images (up to 4)
  const floatPositions = [
    { top: '15%', right: '5%', rotate: 12, scale: 1, delay: 0 },
    { bottom: '10%', right: '12%', rotate: -8, scale: 0.85, delay: 0.5 },
    { top: '25%', left: '3%', rotate: -15, scale: 0.75, delay: 1 },
    { bottom: '20%', left: '8%', rotate: 10, scale: 0.7, delay: 1.5 },
  ];

  return (
    <section
      ref={heroRef}
      className={cn(
        'relative overflow-hidden',
        size === 'tall' ? 'py-16 sm:py-24 md:py-40' : 'py-14 sm:py-24 md:py-32'
      )}
      style={{ perspective: '1000px' }}
    >
      {/* Parallax Background */}
      <div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ transform: `translateY(${parallaxOffset}px) scale(1.1)` }}
      >
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-[130%] object-cover"
        />
        <div
          className={cn(
            'absolute inset-0',
            overlay === 'primary'
              ? 'bg-gradient-to-b from-primary/85 via-primary/70 to-primary/90'
              : 'bg-gradient-to-b from-foreground/80 via-foreground/60 to-foreground/85'
          )}
        />
      </div>

      {/* Scrolling Image Strip (horizontal auto-scroll) */}
      {floatingImages.length >= 3 && (
        <div className="absolute bottom-0 left-0 right-0 z-[1] hidden h-28 overflow-hidden opacity-30 md:block">
          <div
            className="flex gap-4 animate-scroll-strip"
            style={{ width: `${floatingImages.length * 2 * 200}px` }}
          >
            {[...floatingImages, ...floatingImages, ...floatingImages].map((img, i) => (
              <div
                key={i}
                className="w-40 md:w-48 h-20 md:h-28 rounded-xl overflow-hidden flex-shrink-0 border-2 border-primary-foreground/20"
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3D Floating Product Images */}
      <div className="absolute inset-0 z-[2] pointer-events-none hidden lg:block">
        {floatingImages.slice(0, 4).map((img, index) => {
          const pos = floatPositions[index];
          const depthFactor = (index + 1) * 0.5;
          const mx = mouseX * 15 * depthFactor;
          const my = mouseY * 10 * depthFactor;
          const ry = mouseX * 8 * depthFactor;
          const rx = -mouseY * 5 * depthFactor;

          return (
            <div
              key={index}
              className="absolute w-28 h-28 xl:w-36 xl:h-36 rounded-2xl overflow-hidden shadow-2xl border-2 border-primary-foreground/20"
              style={{
                top: pos.top,
                bottom: pos.bottom,
                left: pos.left,
                right: pos.right,
                transform: `
                  translate3d(${mx}px, ${my}px, ${depthFactor * 30}px)
                  rotateY(${ry + pos.rotate}deg)
                  rotateX(${rx}deg)
                  scale(${pos.scale})
                `,
                transition: 'transform 0.3s ease-out',
                animationDelay: `${pos.delay}s`,
                opacity: 0,
                animation: `heroFloatIn 0.8s ease-out ${pos.delay}s forwards`,
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
              {/* Glass reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-foreground/20 via-transparent to-transparent" />
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          {badge && (
            <span className="inline-block px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-primary-foreground text-sm font-medium border border-primary-foreground/20 animate-fade-in-down">
              {badge}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground animate-fade-in-down leading-tight">
            {title}
          </h1>
          <p className="text-base md:text-xl text-primary-foreground/85 max-w-2xl mx-auto animate-fade-in-up">
            {subtitle}
          </p>
          {children && (
            <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              {children}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
