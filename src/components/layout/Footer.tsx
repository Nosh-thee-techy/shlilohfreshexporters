import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, ArrowRight, Leaf } from 'lucide-react';
import shilohLogo from '@/assets/logos/shiloh-fresh-logo.png';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Products & Services', href: '/products' },
  { name: 'Export & Logistics', href: '/export-logistics' },
  { name: 'Certifications & Blog', href: '/certifications' },
  { name: 'Contact Us', href: '/contact' },
];

const productLinks = [
  { name: 'Fresh Fruits', href: '/fruits' },
  { name: 'Fresh Vegetables', href: '/vegetables' },
  { name: 'Fresh Herbs', href: '/herbs' },
];

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/shilohfreshexporters', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/shilohfreshexporters', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/shilohfreshexporters', label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="relative bg-primary text-primary-foreground overflow-hidden">
      {/* Decorative top accent bar */}
      <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />

      {/* Main footer content */}
      <div className="container mx-auto px-5 sm:px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-5">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={shilohLogo}
                alt="Shiloh Fresh Exporters"
                className="w-14 h-14 rounded-xl object-cover group-hover:scale-105 transition-transform"
              />
              <div>
                <h3 className="font-extrabold text-xl text-background">Shiloh Fresh</h3>
                <p className="text-sm text-accent font-semibold">Exporters</p>
              </div>
            </Link>
            <p className="text-background/60 text-sm leading-relaxed max-w-xs">
              Connecting Kenya's finest fresh produce to the world — ethically sourced, expertly handled, delivered fresh.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center hover:bg-accent hover:text-foreground transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-accent mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-background/60 hover:text-accent transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-accent mb-5">Our Products</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-background/60 hover:text-accent transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <Leaf className="w-3 h-3 text-primary opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-4 rounded-xl bg-background/5 border border-background/10">
              <p className="text-[11px] text-background/50 uppercase tracking-wider font-semibold mb-1">Export Regions</p>
              <p className="text-xs text-background/70">Europe · Middle East · Asia · Africa</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-accent mb-5">Get In Touch</h4>
            <ul className="space-y-4">
              <li>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                  <div className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <MapPin className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-background/80">Nairobi, Kenya</p>
                    <p className="text-xs text-background/40">East Africa</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="tel:+254735497573" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Phone className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-background/80 group-hover:text-accent transition-colors">+254 735 497 573</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:shilohfexports@gmail.com" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Mail className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-background/80 group-hover:text-accent transition-colors break-all">shilohfexports@gmail.com</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-background/40 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Shiloh Fresh Exporters. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-background/30">
            <Leaf className="w-3 h-3 text-primary" />
            <span>Ethically sourced · Sustainably grown</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
