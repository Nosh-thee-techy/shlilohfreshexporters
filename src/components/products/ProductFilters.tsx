import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface FilterState {
  variety: string;
  region: string;
  availability: string;
  priceRange: string;
}

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onClearFilters: () => void;
  varietyOptions: string[];
  regionOptions: string[];
  className?: string;
}

const availabilityOptions = ['All', 'Year-round', 'Seasonal'];
const priceRangeOptions = ['All Prices', 'Under USD 1/kg', 'USD 1-3/kg', 'USD 3-5/kg', 'Over USD 5/kg'];

export function ProductFilters({
  filters,
  onFilterChange,
  onClearFilters,
  varietyOptions,
  regionOptions,
  className,
}: ProductFiltersProps) {
  const hasActiveFilters = 
    filters.variety !== 'All' || 
    filters.region !== 'All Regions' || 
    filters.availability !== 'All' || 
    filters.priceRange !== 'All Prices';

  return (
    <div className={cn(
      "sticky top-20 z-30 py-4 bg-background/95 backdrop-blur-sm border-b border-border",
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-3 sm:mb-0 text-sm font-medium text-muted-foreground">
          <Filter className="w-4 h-4" />
          Filters:
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="gap-1.5 text-muted-foreground hover:text-foreground ml-auto sm:hidden"
            >
              <X className="w-4 h-4" />
              Clear
            </Button>
          )}
        </div>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
          <Select
            value={filters.variety}
            onValueChange={(value) => onFilterChange('variety', value)}
          >
            <SelectTrigger className="w-full sm:w-[160px] bg-card">
              <SelectValue placeholder="Variety" />
            </SelectTrigger>
            <SelectContent>
              {varietyOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.region}
            onValueChange={(value) => onFilterChange('region', value)}
          >
            <SelectTrigger className="w-full sm:w-[160px] bg-card">
              <SelectValue placeholder="Source Region" />
            </SelectTrigger>
            <SelectContent>
              {regionOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.availability}
            onValueChange={(value) => onFilterChange('availability', value)}
          >
            <SelectTrigger className="w-full sm:w-[140px] bg-card">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              {availabilityOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.priceRange}
            onValueChange={(value) => onFilterChange('priceRange', value)}
          >
            <SelectTrigger className="w-full sm:w-[150px] bg-card">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              {priceRangeOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="hidden sm:flex gap-1.5 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
              Clear
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
