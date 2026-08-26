import { MapPin, Calendar, Award, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product, getQuotePath } from '@/data/products';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onViewDetails: () => void;
  className?: string;
}

export function ProductCard({ product, onViewDetails, className }: ProductCardProps) {
  const visibleVarieties = product.varieties.slice(0, 3);
  const remainingVarieties = product.varieties.length - visibleVarieties.length;

  return (
    <div className={cn(
      "group flex h-full flex-col bg-card rounded-2xl overflow-hidden border border-border shadow-card hover-lift",
      className
    )}>
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-primary-foreground">{product.name}</h3>
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-5 space-y-4">
        {/* Varieties */}
        <div>
          <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">Varieties</p>
          <div className="flex flex-wrap gap-1.5">
            {visibleVarieties.map((variety) => (
              <Badge key={variety} variant="secondary" className="text-xs">
                {variety}
              </Badge>
            ))}
            {remainingVarieties > 0 && (
              <Badge variant="outline" className="text-xs">
                +{remainingVarieties} more
              </Badge>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {/* Source Regions */}
          <div className="flex items-start gap-2 rounded-xl bg-secondary/40 p-3">
            <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground font-medium">Sourced From</p>
              <p className="text-sm text-foreground line-clamp-2">{product.sourceRegions.join(', ')}</p>
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-start gap-2 rounded-xl bg-secondary/40 p-3">
            <Calendar className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground font-medium">Availability</p>
              <p className="text-sm text-foreground">{product.availability}</p>
            </div>
          </div>
        </div>

        {/* Export Grades */}
        <div className="flex items-start gap-2">
          <Award className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground font-medium">Export Grades</p>
            <p className="text-sm text-foreground line-clamp-2">{product.exportGrades.join(', ')}</p>
          </div>
        </div>

        {/* Price Range */}
        <div className="p-3 bg-secondary/50 rounded-xl">
          <p className="text-xs text-muted-foreground font-medium">Indicative Price</p>
          <p className="text-lg font-semibold text-primary">{product.priceRange}</p>
          <p className="text-xs text-muted-foreground mt-1">*Prices subject to volume & season</p>
        </div>
        
        {/* Actions */}
        <div className="mt-auto flex gap-3 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onViewDetails}
            className="flex-1"
          >
            View Details
          </Button>
          <Button asChild size="sm" className="flex-1">
            <Link to={getQuotePath(product.name)}>
              Quote
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
