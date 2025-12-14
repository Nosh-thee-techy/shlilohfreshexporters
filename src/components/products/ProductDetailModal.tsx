import { MessageCircle, MapPin, Calendar, Award, Package, Clock, Box } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Product, getWhatsAppLink, whatsAppMessages } from '@/data/products';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            {product.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Image */}
          <div className="relative h-64 rounded-xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Varieties */}
          <div>
            <h4 className="font-semibold text-foreground mb-2">Available Varieties</h4>
            <div className="flex flex-wrap gap-2">
              {product.varieties.map((variety) => (
                <Badge key={variety} variant="secondary" className="text-sm px-3 py-1">
                  {variety}
                </Badge>
              ))}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-secondary rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-primary">
                <MapPin className="w-4 h-4" />
                <p className="text-sm font-medium">Source Regions</p>
              </div>
              <p className="text-foreground">{product.sourceRegions.join(', ')}</p>
            </div>

            <div className="p-4 bg-secondary rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-primary">
                <Calendar className="w-4 h-4" />
                <p className="text-sm font-medium">Availability</p>
              </div>
              <p className="text-foreground">{product.availability}</p>
            </div>

            <div className="p-4 bg-secondary rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-primary">
                <Award className="w-4 h-4" />
                <p className="text-sm font-medium">Export Grades</p>
              </div>
              <p className="text-foreground">{product.exportGrades.join(', ')}</p>
            </div>

            {product.shelfLife && (
              <div className="p-4 bg-secondary rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-primary">
                  <Clock className="w-4 h-4" />
                  <p className="text-sm font-medium">Shelf Life</p>
                </div>
                <p className="text-foreground">{product.shelfLife}</p>
              </div>
            )}

            {product.moq && (
              <div className="p-4 bg-secondary rounded-xl space-y-1">
                <div className="flex items-center gap-2 text-primary">
                  <Box className="w-4 h-4" />
                  <p className="text-sm font-medium">Minimum Order</p>
                </div>
                <p className="text-foreground">{product.moq}</p>
              </div>
            )}

            <div className="p-4 bg-secondary rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-primary">
                <Package className="w-4 h-4" />
                <p className="text-sm font-medium">Packaging</p>
              </div>
              <p className="text-foreground">{product.packagingOptions.join(', ')}</p>
            </div>
          </div>

          {/* Season Pricing */}
          {product.seasonInfo && (
            <div className="p-4 bg-primary/10 rounded-xl">
              <h4 className="font-semibold text-foreground mb-3">Seasonal Pricing Guide</h4>
              <div className="space-y-2 text-sm">
                {product.seasonInfo.peak && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">🟢 Peak Season</span>
                    <span className="text-foreground font-medium">{product.seasonInfo.peak}</span>
                  </div>
                )}
                {product.seasonInfo.mid && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">🟡 Mid Season</span>
                    <span className="text-foreground font-medium">{product.seasonInfo.mid}</span>
                  </div>
                )}
                {product.seasonInfo.off && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">🔴 Off Season</span>
                    <span className="text-foreground font-medium">{product.seasonInfo.off}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Prices are indicative and subject to volume, packaging, and destination market.
              </p>
            </div>
          )}

          {/* Price & CTA */}
          <div className="p-4 bg-secondary rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Indicative Price Range</p>
            <p className="text-2xl font-bold text-primary mb-4">{product.priceRange}</p>
            
            <a
              href={getWhatsAppLink(whatsAppMessages.quote(product.name))}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="whatsapp" size="lg" className="w-full">
                <MessageCircle className="w-5 h-5" />
                Request Quote on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
