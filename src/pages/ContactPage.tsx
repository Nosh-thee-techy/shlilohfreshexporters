import { useState } from 'react';
import { PageCTA } from '@/components/layout/PageCTA';
import chiliCharacter from '@/assets/cta/chili-character.png';
import { PageHero } from '@/components/layout/PageHero';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import heroContactImg from '@/assets/hero/hero-contact.jpg';
import { QuoteRequestForm } from '@/components/forms/QuoteRequestForm';
import { COMPANY_EMAIL, COMPANY_PHONE, sendInquiry } from '@/lib/contact';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'What is your Minimum Order Quantity (MOQ)?',
    answer: 'Our MOQ varies by product. For avocados, it\'s typically 1,000 kg. For other products, please contact us for specific requirements. We can accommodate smaller trial orders for new clients.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept bank transfers (T/T), Letters of Credit (L/C), and other secure payment methods. Payment terms are typically 30% advance and 70% against shipping documents.',
  },
  {
    question: 'How is your produce packaged?',
    answer: 'We use export-grade cartons designed for each product type. Standard packaging includes ventilated cartons with protective liners. Custom branding and packaging options are available.',
  },
  {
    question: 'What are your export timelines?',
    answer: 'Air freight to Europe takes 24-48 hours. Sea freight takes 3-4 weeks. We provide real-time tracking for all shipments and keep you updated throughout the process.',
  },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 text-left flex items-center justify-between bg-card hover:bg-secondary transition-colors"
      >
        <span className="font-medium text-foreground">{faq.question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-primary" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        )}
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-48 p-4 bg-secondary' : 'max-h-0'
        )}
      >
        <p className="text-muted-foreground">{faq.answer}</p>
      </div>
    </div>
  );
}

function FAQModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Frequently Asked Questions
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openFAQ === index}
              onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ThankYouModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md text-center">
        <div className="py-6 space-y-4">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Thank You!</h2>
          <p className="text-muted-foreground">
            Your message has been sent to {COMPANY_EMAIL}. Our team will get back to you within 24 hours.
          </p>
          <Button onClick={onClose} className="mt-4">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const emptyContactForm = {
  name: '',
  company: '',
  email: '',
  phone: '',
  message: '',
  website: '',
};

export default function ContactPage() {
  const [formData, setFormData] = useState(emptyContactForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await sendInquiry({
        form_type: 'Website inquiry',
        name: formData.name,
        company: formData.company || 'Not provided',
        email: formData.email,
        phone: formData.phone || 'Not provided',
        message: formData.message,
        website: formData.website,
        _subject: `Website inquiry from ${formData.name}`,
      });
      setShowThankYou(true);
      setFormData(emptyContactForm);
    } catch (error) {
      toast({
        title: 'Could not send message',
        description: error instanceof Error ? error.message : `Please email ${COMPANY_EMAIL} directly.`,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24">
      <PageHero
        title="Contact Us"
        subtitle="Get in touch with our team for inquiries, quotes, or partnerships."
        backgroundImage={heroContactImg}
        badge="Get In Touch"
      />

      <section ref={ref} className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div
              className={cn(
                'transition-all duration-700',
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              )}
            >
              <Tabs defaultValue="inquiry">
                <TabsList className="mb-6 grid w-full grid-cols-2">
                  <TabsTrigger value="inquiry">Send a message</TabsTrigger>
                  <TabsTrigger value="quote">Request a quote</TabsTrigger>
                </TabsList>

                <TabsContent value="inquiry">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                    <div>
                      <Label className="mb-2 block">Your Name *</Label>
                      <Input
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">Company</Label>
                      <Input
                        placeholder="Your company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">Email Address *</Label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">Phone</Label>
                      <Input
                        placeholder="+254 700 000 000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">Message *</Label>
                      <Textarea
                        placeholder="Tell us about your requirements..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                    <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="quote">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Request an export quote</h2>
                  <p className="text-muted-foreground mb-6">
                    Include volume, destination, and shipping terms so we can price accurately.
                  </p>
                  <QuoteRequestForm />
                </TabsContent>
              </Tabs>
            </div>

            <div
              className={cn(
                'space-y-8 transition-all duration-700 delay-200',
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              )}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Phone</h3>
                    <a href={`tel:${COMPANY_PHONE.replace(/\s/g, '')}`} className="text-muted-foreground hover:text-primary transition-colors">
                      {COMPANY_PHONE}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <a href={`mailto:${COMPANY_EMAIL}`} className="text-muted-foreground hover:text-primary transition-colors break-all">
                      {COMPANY_EMAIL}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Office Location</h3>
                    <p className="text-muted-foreground">Nairobi, Kenya</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Business Hours</h3>
                    <p className="text-muted-foreground">Mon - Fri: 8:00 AM - 6:00 PM EAT</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="https://wa.me/254735497573?text=Hello%20Shiloh%20Fresh%20Exporters%2C%20I%27d%20like%20to%20inquire."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="whatsapp" size="lg" className="w-full">
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp
                  </Button>
                </a>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowFAQ(true)}
                  className="flex-1"
                >
                  <HelpCircle className="w-5 h-5" />
                  Quick FAQs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageCTA
        variant="green"
        characterImage={chiliCharacter}
        title="Let's Do Business Together"
        subtitle="From sourcing to delivery, we handle it all. Reach out and let's discuss how we can meet your fresh produce needs."
        whatsappMessage="Hello Shiloh Fresh Exporters, I'd like to discuss a potential business partnership."
      />

      <ThankYouModal isOpen={showThankYou} onClose={() => setShowThankYou(false)} />
      <FAQModal isOpen={showFAQ} onClose={() => setShowFAQ(false)} />
    </div>
  );
}
