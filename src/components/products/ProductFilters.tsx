import { useState } from 'react';
import { ChevronDown, Filter, X } from 'lucide-react';
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
  resultCount?: number;
  totalCount?: number;
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
  resultCount,
  totalCount,
  className,
}: ProductFiltersProps) {
  const hasActiveFilters = 
    filters.variety !== 'All' || 
    filters.region !== 'All Regions' || 
    filters.availability !== 'All' || 
    filters.priceRange !== 'All Prices';

  const activeFilterCount = [
    filters.variety !== 'All',
    filters.region !== 'All Regions',
    filters.availability !== 'All',
    filters.priceRange !== 'All Prices',
  ].filter(Boolean).length;

  const [open, setOpen] = useState(false);

  return (
    <div className={cn(
      "sticky top-[3.75rem] sm:top-20 z-30 py-2 sm:py-4 bg-background/95 backdrop-blur-sm border-b border-border",
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="rounded-2xl border border-border bg-card/80 p-3 sm:p-4 shadow-sm">
          <div className="mb-0 flex flex-wrap items-center gap-2 text-sm font-medium text-muted-foreground sm:mb-4">
            <button
              type="button"
              onClick={() => setOpen((current) => !current)}
              className="flex min-w-0 flex-1 items-center gap-2 text-left sm:pointer-events-none"
              aria-expanded={open}
            >
              <Filter className="h-4 w-4 shrink-0" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                  {activeFilterCount} active
                </span>
              )}
              {typeof resultCount === 'number' && (
                <span className="inline-flex items-center rounded-full border border-border bg-background px-2 py-0.5 text-xs text-foreground">
                  {resultCount}{typeof totalCount === 'number' ? ` of ${totalCount}` : ''}
                </span>
              )}
              <ChevronDown className={cn('ml-auto h-4 w-4 shrink-0 transition-transform sm:hidden', open && 'rotate-180')} />
            </button>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="gap-1.5 text-muted-foreground hover:text-foreground sm:hidden"
              >
                <X className="w-4 h-4" />
                Clear
              </Button>
            )}
          </div>
          <div className={cn(
            'mt-3 grid grid-cols-1 gap-2 sm:mt-0 sm:grid sm:grid-cols-2 sm:gap-3 lg:flex lg:flex-wrap',
            open ? 'grid' : 'hidden sm:grid lg:flex'
          )}>
          <Select
            value={filters.variety}
            onValueChange={(value) => onFilterChange('variety', value)}
          >
            <SelectTrigger className="w-full lg:w-[180px] bg-background">
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
            <SelectTrigger className="w-full lg:w-[190px] bg-background">
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
            <SelectTrigger className="w-full lg:w-[160px] bg-background">
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
            <SelectTrigger className="w-full lg:w-[170px] bg-background">
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
    </div>
  );
}
