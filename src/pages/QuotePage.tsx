import { useSearchParams } from 'react-router-dom';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { PageCTA } from '@/components/layout/PageCTA';
import { QuoteRequestForm } from '@/components/forms/QuoteRequestForm';
import { Button } from '@/components/ui/button';
import avocadoCharacter from '@/assets/cta/avocado-character.png';
import heroContactImg from '@/assets/hero/hero-contact.jpg';
import { getWhatsAppLink, whatsAppMessages } from '@/data/products';
import { COMPANY_EMAIL, COMPANY_PHONE } from '@/lib/contact';

export default function QuotePage() {
  const [params] = useSearchParams();
  const product = params.get('product') ?? '';

  return (
    <div className="pt-24">
      <PageHero
        title="Request an Export Quote"
        subtitle="Tell us the product, volume, destination, and shipping terms. Our team will send pricing and availability."
        backgroundImage={heroContactImg}
        badge="B2B Quotations"
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-card">
              <h2 className="text-2xl font-bold text-foreground mb-2">Quote details</h2>
              <p className="text-muted-foreground mb-8">
                Requests are sent to {COMPANY_EMAIL}. We typically reply within one business day.
              </p>
              <QuoteRequestForm defaultProduct={product} />
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground mb-4">What we need for a firm quote</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li>Product and variety, if you have a preference</li>
                  <li>Quantity and whether you need air or sea freight</li>
                  <li>Destination country and preferred Incoterms</li>
                  <li>Target delivery window and any private-label packing</li>
                </ul>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 space-y-4">
                <h3 className="font-semibold text-foreground">Talk to the export team</h3>
                <a href={`mailto:${COMPANY_EMAIL}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary">
                  <Mail className="w-5 h-5 text-primary" />
                  {COMPANY_EMAIL}
                </a>
                <a href={`tel:${COMPANY_PHONE.replace(/\s/g, '')}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary">
                  <Phone className="w-5 h-5 text-primary" />
                  {COMPANY_PHONE}
                </a>
                <a
                  href={getWhatsAppLink(product ? whatsAppMessages.quote(product) : whatsAppMessages.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="whatsapp" className="w-full">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp the same request
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageCTA
        variant="green"
        characterImage={avocadoCharacter}
        title="Need a mixed container?"
        subtitle="We can quote fruits, vegetables, and herbs together for the same destination."
        showQuoteButton={false}
      />
    </div>
  );
}
