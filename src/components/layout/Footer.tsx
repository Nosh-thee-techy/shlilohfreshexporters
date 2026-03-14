import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import shilohLogo from '@/assets/logos/shiloh-fresh-logo.jpeg';

const usefulLinks = [
  { name: 'Our Produce', href: '/products' },
  { name: 'About Us', href: '/about' },
  { name: 'Export & Logistics', href: '/export-logistics' },
  { name: 'Certifications', href: '/certifications' },
  { name: 'Contact', href: '/contact' },
];

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/shilohfreshexporters', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/shilohfreshexporters', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/shilohfreshexporters', label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src={shilohLogo}
                alt="Shiloh Fresh Exporters"
                className="w-14 h-14 rounded-xl object-cover"
              />
              <div>
                <h3 className="font-bold text-xl">Shiloh Fresh</h3>
                <p className="text-sm text-primary-foreground/70">Exporters</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Dedicated to supplying high-quality fruits to global markets while uplifting farmers through ethical sourcing and sustainable agricultural practices.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Useful Links</h4>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-125 transition-transform" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">
                  Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a
                  href="tel:+254702339421"
                  className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
                >
                  +254 702 339 421
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a
                  href="mailto:info@shilohfresh.co.ke"
                  className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
                >
                  info@shilohfresh.co.ke
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 hover:scale-110 transition-all duration-300"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          <p className="text-primary-foreground/60 text-sm text-center">
            © {new Date().getFullYear()} Shiloh Fresh Exporters. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
