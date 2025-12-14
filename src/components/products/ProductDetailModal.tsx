import { MessageCircle, MapPin, Calendar, Award, Package, Clock, Box } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SwipeableGallery } from '@/components/ui/SwipeableGallery';
import { Product, getWhatsAppLink, whatsAppMessages } from '@/data/products';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  if (!product) return null;

  // Use multiple images if available, otherwise fall back to single image
  const galleryImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-foreground">
            {product.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Swipeable Image Gallery */}
          <div className="group h-56 sm:h-64 md:h-72">
            <SwipeableGallery 
              images={galleryImages} 
              alt={product.name}
              className="h-full"
            />
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {/* Varieties */}
          <div>
            <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Available Varieties</h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {product.varieties.map((variety) => (
                <Badge key={variety} variant="secondary" className="text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1">
                  {variety}
                </Badge>
              ))}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div className="p-3 sm:p-4 bg-secondary rounded-lg sm:rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 sm:gap-2 text-primary">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <p className="text-xs sm:text-sm font-medium">Source Regions</p>
              </div>
              <p className="text-xs sm:text-sm text-foreground">{product.sourceRegions.join(', ')}</p>
            </div>

            <div className="p-3 sm:p-4 bg-secondary rounded-lg sm:rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 sm:gap-2 text-primary">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <p className="text-xs sm:text-sm font-medium">Availability</p>
              </div>
              <p className="text-xs sm:text-sm text-foreground">{product.availability}</p>
            </div>

            <div className="p-3 sm:p-4 bg-secondary rounded-lg sm:rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 sm:gap-2 text-primary">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <p className="text-xs sm:text-sm font-medium">Export Grades</p>
              </div>
              <p className="text-xs sm:text-sm text-foreground">{product.exportGrades.join(', ')}</p>
            </div>

            {product.shelfLife && (
              <div className="p-3 sm:p-4 bg-secondary rounded-lg sm:rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 sm:gap-2 text-primary">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <p className="text-xs sm:text-sm font-medium">Shelf Life</p>
                </div>
                <p className="text-xs sm:text-sm text-foreground">{product.shelfLife}</p>
              </div>
            )}

            {product.moq && (
              <div className="p-3 sm:p-4 bg-secondary rounded-lg sm:rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 sm:gap-2 text-primary">
                  <Box className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <p className="text-xs sm:text-sm font-medium">Minimum Order</p>
                </div>
                <p className="text-xs sm:text-sm text-foreground">{product.moq}</p>
              </div>
            )}

            <div className="p-3 sm:p-4 bg-secondary rounded-lg sm:rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 sm:gap-2 text-primary">
                <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <p className="text-xs sm:text-sm font-medium">Packaging</p>
              </div>
              <p className="text-xs sm:text-sm text-foreground">{product.packagingOptions.join(', ')}</p>
            </div>
          </div>

          {/* Season Pricing */}
          {product.seasonInfo && (
            <div className="p-3 sm:p-4 bg-primary/10 rounded-lg sm:rounded-xl">
              <h4 className="font-semibold text-foreground mb-2 sm:mb-3 text-sm sm:text-base">Seasonal Pricing Guide</h4>
              <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
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
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-2 sm:mt-3">
                Prices are indicative and subject to volume, packaging, and destination market.
              </p>
            </div>
          )}

          {/* Price & CTA */}
          <div className="p-3 sm:p-4 bg-secondary rounded-lg sm:rounded-xl">
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Indicative Price Range</p>
            <p className="text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4">{product.priceRange}</p>
            
            <a
              href={getWhatsAppLink(whatsAppMessages.quote(product.name))}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="whatsapp" size="lg" className="w-full text-sm sm:text-base">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                Request Quote on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
