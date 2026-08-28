import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DarkModeToggle } from '@/components/theme/DarkModeToggle';
import { AccessibilityToggle } from '@/components/accessibility/AccessibilityToggle';
import { cn } from '@/lib/utils';
import shilohLogo from '@/assets/logos/shiloh-fresh-logo.png';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Products & Services', href: '/products' },
  { name: 'Export & Logistics', href: '/export-logistics' },
  { name: 'Certifications & Blog', href: '/certifications' },
  { name: 'Contact Us', href: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-500',
          isScrolled
            ? 'border-b border-border bg-card/98 py-2 shadow-soft backdrop-blur-md'
            : 'bg-card/90 py-2.5 backdrop-blur-sm sm:py-3'
        )}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <img
              src={shilohLogo}
              alt="Shiloh Fresh Exporters"
              className={cn(
                'rounded-xl transition-all duration-300 object-cover',
                isScrolled ? 'w-9 h-9 sm:w-10 sm:h-10' : 'w-11 h-11 sm:w-14 sm:h-14'
              )}
            />
            <div className="flex flex-col">
              <span className={cn(
                'font-bold text-primary transition-all duration-300',
                isScrolled ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
              )}>
                Shiloh Fresh
              </span>
              <span className={cn(
                'text-accent font-medium transition-all duration-300',
                isScrolled ? 'text-[10px]' : 'text-xs'
              )}>
                Exporters
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                  location.pathname === link.href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-secondary hover:text-secondary-foreground'
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/quote">
              <Button size="sm" className="ml-2">
                Request Quote
              </Button>
            </Link>
            <DarkModeToggle className="ml-2" />
            <AccessibilityToggle />
          </nav>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1 lg:hidden">
            <AccessibilityToggle />
            <DarkModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={cn(
                    'absolute inset-0 transition-all duration-300',
                    isMobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                  )}
                />
                <X
                  className={cn(
                    'absolute inset-0 transition-all duration-300',
                    isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                  )}
                />
              </div>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300',
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          'fixed top-0 right-0 bottom-0 z-50 flex w-80 max-w-[85vw] flex-col bg-card shadow-2xl transition-transform duration-500 ease-out lg:hidden',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex h-full flex-col p-6 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          {/* Close Button */}
          <div className="flex justify-end mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Mobile Nav Links */}
          <nav className="flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'px-4 py-3 rounded-xl text-lg font-medium transition-all duration-300',
                  'animate-slide-in-right',
                  location.pathname === link.href
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-secondary'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div className="mt-auto pt-6 border-t border-border space-y-3">
            <Link to="/quote">
              <Button size="lg" className="w-full">
                Request a Quote
              </Button>
            </Link>
            <a
              href="https://wa.me/254735497573?text=Hello%20Shiloh%20Fresh%20Exporters%2C%20I%27d%20like%20to%20inquire."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="whatsapp" size="lg" className="w-full">
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
