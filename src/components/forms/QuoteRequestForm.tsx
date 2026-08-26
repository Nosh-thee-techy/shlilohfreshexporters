import { useEffect, useMemo, useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { fruitsData, vegetablesData, herbsData } from '@/data/products';
import { COMPANY_EMAIL, sendInquiry } from '@/lib/contact';

const incoterms = ['FOB Mombasa', 'CIF', 'CFR', 'EXW Nairobi', 'DAP', 'Not sure yet'];
const shippingMethods = ['Air freight', 'Sea freight', 'Either / advise'];
const quantityUnits = ['kg', 'tons', 'cartons', 'pallets'];

interface QuoteRequestFormProps {
  defaultProduct?: string;
}

const emptyForm = {
  company: '',
  contactName: '',
  email: '',
  phone: '',
  destination: '',
  product: '',
  variety: '',
  quantity: '',
  unit: 'kg',
  incoterms: 'FOB Mombasa',
  shipping: 'Either / advise',
  deliveryWindow: '',
  packaging: '',
  notes: '',
  website: '',
};

export function QuoteRequestForm({ defaultProduct = '' }: QuoteRequestFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...emptyForm, product: defaultProduct });

  const catalog = useMemo(
    () => [
      ...fruitsData.map((item) => ({ name: item.name, category: 'Fruits' })),
      ...vegetablesData.map((item) => ({ name: item.name, category: 'Vegetables' })),
      ...herbsData.map((item) => ({ name: item.name, category: 'Herbs' })),
    ],
    [],
  );

  useEffect(() => {
    if (defaultProduct) {
      setForm((current) => ({ ...current, product: defaultProduct }));
    }
  }, [defaultProduct]);

  const update = (key: keyof typeof emptyForm, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.company.trim() || !form.contactName.trim() || !form.email.trim() || !form.product.trim() || !form.quantity.trim() || !form.destination.trim()) {
      toast({
        title: 'Please complete the required fields',
        description: 'Company, contact name, email, destination, product, and quantity are required.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await sendInquiry({
        form_type: 'Quote request',
        company: form.company,
        contact_name: form.contactName,
        email: form.email,
        phone: form.phone || 'Not provided',
        destination_market: form.destination,
        product: form.product,
        variety: form.variety || 'Not specified',
        quantity: `${form.quantity} ${form.unit}`,
        incoterms: form.incoterms,
        shipping_method: form.shipping,
        delivery_window: form.deliveryWindow || 'Not specified',
        packaging: form.packaging || 'Standard export packaging',
        additional_requirements: form.notes || 'None',
        website: form.website,
        _subject: `Quote request: ${form.product} — ${form.company}`,
      });

      toast({
        title: 'Quote request sent',
        description: `We will reply to ${form.email} from ${COMPANY_EMAIL} within 24 hours.`,
      });
      setForm({ ...emptyForm, product: defaultProduct });
    } catch (error) {
      toast({
        title: 'Could not send quote request',
        description: error instanceof Error ? error.message : `Please email ${COMPANY_EMAIL} directly.`,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={(event) => update('website', event.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="company">Company name *</Label>
          <Input
            id="company"
            className="h-12"
            placeholder="Global Produce Ltd"
            value={form.company}
            onChange={(event) => update('company', event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactName">Contact person *</Label>
          <Input
            id="contactName"
            className="h-12"
            placeholder="Jane Mwangi"
            value={form.contactName}
            onChange={(event) => update('contactName', event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Work email *</Label>
          <Input
            id="email"
            type="email"
            className="h-12"
            placeholder="jane@company.com"
            value={form.email}
            onChange={(event) => update('email', event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone / WhatsApp</Label>
          <Input
            id="phone"
            className="h-12"
            placeholder="+971 50 000 0000"
            value={form.phone}
            onChange={(event) => update('phone', event.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Product *</Label>
          <Select value={form.product || undefined} onValueChange={(value) => update('product', value)}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select a product" />
            </SelectTrigger>
            <SelectContent>
              {catalog.map((item) => (
                <SelectItem key={`${item.category}-${item.name}`} value={item.name}>
                  {item.category} — {item.name}
                </SelectItem>
              ))}
              <SelectItem value="Mixed / several products">Mixed / several products</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="variety">Variety</Label>
          <Input
            id="variety"
            className="h-12"
            placeholder="Hass, Kent, Extra Fine..."
            value={form.variety}
            onChange={(event) => update('variety', event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity *</Label>
          <div className="flex gap-2">
            <Input
              id="quantity"
              className="h-12"
              placeholder="1000"
              value={form.quantity}
              onChange={(event) => update('quantity', event.target.value)}
            />
            <Select value={form.unit} onValueChange={(value) => update('unit', value)}>
              <SelectTrigger className="h-12 w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {quantityUnits.map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="destination">Destination market *</Label>
          <Input
            id="destination"
            className="h-12"
            placeholder="Netherlands, UAE, UK..."
            value={form.destination}
            onChange={(event) => update('destination', event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Incoterms</Label>
          <Select value={form.incoterms} onValueChange={(value) => update('incoterms', value)}>
            <SelectTrigger className="h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {incoterms.map((term) => (
                <SelectItem key={term} value={term}>
                  {term}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Shipping method</Label>
          <Select value={form.shipping} onValueChange={(value) => update('shipping', value)}>
            <SelectTrigger className="h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {shippingMethods.map((method) => (
                <SelectItem key={method} value={method}>
                  {method}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="deliveryWindow">Preferred delivery window</Label>
          <Input
            id="deliveryWindow"
            className="h-12"
            placeholder="e.g. first week of October"
            value={form.deliveryWindow}
            onChange={(event) => update('deliveryWindow', event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="packaging">Packaging preference</Label>
          <Input
            id="packaging"
            className="h-12"
            placeholder="4kg cartons, custom branding..."
            value={form.packaging}
            onChange={(event) => update('packaging', event.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional requirements</Label>
        <Textarea
          id="notes"
          rows={4}
          placeholder="Certifications needed, target price, private label, inspection, or other notes."
          value={form.notes}
          onChange={(event) => update('notes', event.target.value)}
        />
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? 'Sending quote request...' : 'Send quote request'}
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
}
