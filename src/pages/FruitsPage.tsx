import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MessageCircle, Play, ShieldCheck, Truck, Headphones } from 'lucide-react';
import { PageCTA } from '@/components/layout/PageCTA';
import mangoCharacter from '@/assets/cta/mango-character.png';
import { PageHero } from '@/components/layout/PageHero';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { ProductFilters } from '@/components/products/ProductFilters';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { 
  Product, 
  fruitsData, 
  getQuotePath,
  getWhatsAppLink, 
  whatsAppMessages
} from '@/data/products';
import heroFruitsImg from '@/assets/hero/hero-fruits.jpg';
import avocadoImg from '@/assets/products/avocado.jpg';
import avocadoExportBoxImg from '@/assets/products/avocado-export-box.jpg';
import avocadoHarvestImg from '@/assets/products/avocado-hass-harvest.jpg';
import avocadoOnTreeImg from '@/assets/products/avocado-on-tree.jpg';
import avocadoCloseupImg from '@/assets/products/avocado-hass-closeup.jpg';
import avocadoHalvedImg from '@/assets/products/avocado-halved.jpg';
import avocadoFuerteGrassImg from '@/assets/products/avocado-fuerte-grass.jpg';
import mangoesImg from '@/assets/products/mangoes.jpg';
import mangoTreeImg from '@/assets/products/mango-tree.jpg';
import mangoHarvestImg from '@/assets/products/mango-harvest.jpg';
import mangoPileImg from '@/assets/products/mango-pile.jpg';
import passionFruitImg from '@/assets/products/passion-fruit.jpg';
import pineappleImg from '@/assets/products/pineapple.jpg';
import pineappleHarvestImg from '@/assets/products/pineapple-harvest.jpg';
import pineapplePlantImg from '@/assets/products/pineapple-plant.jpg';
import pineappleSlicedImg from '@/assets/products/pineapple-sliced.jpg';
import guavaFreshImg from '@/assets/products/guava-fresh.jpg';
import guavaTreeImg from '@/assets/products/guava-tree.jpg';
import treeTomatoImg from '@/assets/products/tree-tomato.jpg';

type MediaItem = {
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  label: string;
};

const fruitMedia: Record<string, { image: string; images: string[]; videos?: string[] }> = {
  avocado: {
    image: avocadoHarvestImg,
    images: [avocadoHarvestImg, avocadoOnTreeImg, avocadoCloseupImg, avocadoHalvedImg, avocadoFuerteGrassImg, avocadoExportBoxImg],
    videos: ['/videos/video-1.mp4'],
  },
  mangoes: {
    image: mangoTreeImg,
    images: [mangoTreeImg, mangoHarvestImg, mangoesImg, mangoPileImg],
    videos: ['/videos/video-2.mp4'],
  },
  'passion-fruit': {
    image: passionFruitImg,
    images: [passionFruitImg],
    videos: ['/videos/video-3.mp4'],
  },
  pineapple: {
    image: pineappleHarvestImg,
    images: [pineappleHarvestImg, pineapplePlantImg, pineappleImg, pineappleSlicedImg],
    videos: ['/videos/video-1.mp4'],
  },
  guava: {
    image: guavaTreeImg,
    images: [guavaTreeImg, guavaFreshImg],
  },
  'tree-tomato': {
    image: treeTomatoImg,
    images: [treeTomatoImg],
  },
};

const fruits: Product[] = fruitsData.map((fruit) => ({
  ...fruit,
  image: fruitMedia[fruit.id]?.image || avocadoImg,
  images: fruitMedia[fruit.id]?.images || [fruitMedia[fruit.id]?.image || avocadoImg],
  videos: fruitMedia[fruit.id]?.videos,
}));

// Get unique varieties for filter
const allVarieties = ['All', ...new Set(fruits.flatMap(f => f.varieties))];
const fruitRegions = ['All Regions', ...new Set(fruits.flatMap(f => f.sourceRegions))];

interface FilterState {
  variety: string;
  region: string;
  availability: string;
  priceRange: string;
}

const initialFilters: FilterState = {
  variety: 'All',
  region: 'All Regions',
  availability: 'All',
  priceRange: 'All Prices',
};

export default function FruitsPage() {
  const [selectedProductId, setSelectedProductId] = useState<string>(fruits[0]?.id ?? '');
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => setFilters(initialFilters);

  const filteredFruits = useMemo(() => {
    return fruits.filter(fruit => {
      if (filters.variety !== 'All' && !fruit.varieties.includes(filters.variety)) {
        return false;
      }
      if (filters.region !== 'All Regions' && !fruit.sourceRegions.includes(filters.region)) {
        return false;
      }
      if (filters.availability !== 'All') {
        const isYearRound = fruit.availability.toLowerCase().includes('year-round');
        if (filters.availability === 'Year-round' && !isYearRound) return false;
        if (filters.availability === 'Seasonal' && isYearRound) return false;
      }
      // Price range filter logic
      if (filters.priceRange !== 'All Prices') {
        const priceMatch = fruit.priceRange.match(/[\d.]+/g);
        if (priceMatch) {
          const minPrice = parseFloat(priceMatch[0]);
          switch (filters.priceRange) {
            case 'Under USD 1/kg':
              if (minPrice >= 1) return false;
              break;
            case 'USD 1-3/kg':
              if (minPrice < 1 || minPrice > 3) return false;
              break;
            case 'USD 3-5/kg':
              if (minPrice < 3 || minPrice > 5) return false;
              break;
            case 'Over USD 5/kg':
              if (minPrice < 5) return false;
              break;
          }
        }
      }
      return true;
    });
  }, [filters]);

  useEffect(() => {
    if (!filteredFruits.length) {
      setSelectedProductId('');
      setSelectedMediaIndex(0);
      return;
    }

    const stillSelected = filteredFruits.some((fruit) => fruit.id === selectedProductId);
    if (!stillSelected) {
      setSelectedProductId(filteredFruits[0].id);
      setSelectedMediaIndex(0);
    }
  }, [filteredFruits, selectedProductId]);

  const selectedProduct = filteredFruits.find((fruit) => fruit.id === selectedProductId) ?? filteredFruits[0] ?? null;
  const selectedMedia: MediaItem[] = selectedProduct
    ? [
        ...(selectedProduct.images?.map((image, index) => ({
          type: 'image' as const,
          src: image,
          label: `Image ${index + 1}`,
        })) ?? [{ type: 'image' as const, src: selectedProduct.image, label: 'Image 1' }]),
        ...((selectedProduct.videos ?? []).map((video, index) => ({
          type: 'video' as const,
          src: video,
          thumbnail: selectedProduct.image,
          label: `Video ${index + 1}`,
        }))),
      ]
    : [];
  const currentMedia = selectedMedia[selectedMediaIndex];
  const relatedFruits = filteredFruits.filter((fruit) => fruit.id !== selectedProduct?.id);

  const changeMedia = (direction: 'prev' | 'next') => {
    if (!selectedMedia.length) return;

    setSelectedMediaIndex((current) => {
      if (direction === 'prev') {
        return current === 0 ? selectedMedia.length - 1 : current - 1;
      }

      return current === selectedMedia.length - 1 ? 0 : current + 1;
    });
  };

  return (
    <div className="pt-24">
      <PageHero
        title="Fresh Fruits for Global Markets"
        subtitle="Export-grade fruits sourced directly from trusted Kenyan farmers, handled with care to meet international standards."
        backgroundImage={heroFruitsImg}
        badge="Premium Fruits"
        floatingImages={[
          { src: avocadoHarvestImg, alt: 'Avocados' },
          { src: mangoTreeImg, alt: 'Mangoes' },
          { src: passionFruitImg, alt: 'Passion Fruit' },
          { src: pineappleHarvestImg, alt: 'Pineapple' },
        ]}
      >
        <a
          href={getWhatsAppLink(whatsAppMessages.fruits)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="whatsapp" size="lg">
            <MessageCircle className="w-5 h-5" />
            Request Price List
          </Button>
        </a>
      </PageHero>

      {/* Filters */}
      <ProductFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        varietyOptions={allVarieties}
        regionOptions={fruitRegions}
        resultCount={filteredFruits.length}
        totalCount={fruits.length}
      />

      {/* Featured Product Experience */}
      <section ref={ref} className="py-14 bg-background">
        <div className="container mx-auto px-4">
          {filteredFruits.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card/40">
              <p className="text-muted-foreground text-lg mb-4">No fruits match your current filters.</p>
              <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className={cn(
              'space-y-12 transition-all duration-500',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            )}>
              {selectedProduct && (
                <div className="rounded-[1.5rem] border border-border bg-card p-3 shadow-card sm:rounded-[2rem] sm:p-8">
                  <div className="mb-4 hidden text-xs text-muted-foreground sm:mb-5 sm:block">
                    Home / Shop / Fruits / <span className="font-semibold text-foreground">{selectedProduct.name}</span>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-8">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="relative overflow-hidden rounded-[1.25rem] border border-border bg-muted/40 p-2 sm:rounded-[1.75rem] sm:p-5">
                        <div className="aspect-square overflow-hidden rounded-[1rem] bg-card sm:rounded-[1.5rem]">
                          {currentMedia?.type === 'video' ? (
                            <video
                              src={currentMedia.src}
                              poster={currentMedia.thumbnail ?? selectedProduct.image}
                              controls
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <img
                              src={currentMedia?.src ?? selectedProduct.image}
                              alt={selectedProduct.name}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>

                        {selectedMedia.length > 1 && (
                          <>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="absolute left-2 top-1/2 h-9 w-9 -translate-y-1/2 rounded-xl border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground sm:left-7 sm:h-10 sm:w-10"
                              onClick={() => changeMedia('prev')}
                            >
                              <ChevronLeft className="h-5 w-5" />
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="absolute right-2 top-1/2 h-9 w-9 -translate-y-1/2 rounded-xl border-accent bg-accent text-accent-foreground hover:bg-accent/90 hover:text-accent-foreground sm:right-7 sm:h-10 sm:w-10"
                              onClick={() => changeMedia('next')}
                            >
                              <ChevronRight className="h-5 w-5" />
                            </Button>
                          </>
                        )}
                      </div>

                      <div className="grid grid-cols-4 gap-2 sm:gap-3">
                        {selectedMedia.map((media, index) => (
                          <button
                            key={`${selectedProduct.id}-${index}`}
                            type="button"
                            onClick={() => setSelectedMediaIndex(index)}
                            className={cn(
                              'relative overflow-hidden rounded-2xl border bg-background transition-all',
                              index === selectedMediaIndex ? 'border-accent ring-2 ring-accent/30' : 'border-border hover:border-primary/40'
                            )}
                          >
                            <img
                              src={media.type === 'video' ? (media.thumbnail ?? selectedProduct.image) : media.src}
                              alt={`${selectedProduct.name} view ${index + 1}`}
                              className="aspect-square h-full w-full object-cover"
                            />
                            {media.type === 'video' && (
                              <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                                <span className="rounded-full bg-white/90 p-2 text-primary">
                                  <Play className="h-4 w-4 fill-current" />
                                </span>
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">Fruit</p>
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h2 className="text-2xl font-bold text-foreground sm:text-4xl">{selectedProduct.name}</h2>
                            <Badge className="rounded-full bg-primary/10 px-3 py-1 text-primary hover:bg-primary/10">
                              Export ready
                            </Badge>
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {selectedProduct.sourceRegions.slice(0, 3).join(', ')}
                          </p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground sm:text-3xl">{selectedProduct.priceRange}</p>
                          <p className="mt-1 text-sm text-muted-foreground">Volume-based pricing available on request</p>
                        </div>
                        <p className="text-base leading-relaxed text-muted-foreground">
                          {selectedProduct.description}
                        </p>
                      </div>

                      <div className="grid gap-4 rounded-3xl border border-border bg-muted/40 p-5">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Varieties</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {selectedProduct.varieties.map((variety) => (
                              <Badge key={variety} variant="secondary" className="rounded-full px-3 py-1">
                                {variety}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div className="rounded-2xl border border-border bg-card p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Availability</p>
                            <p className="mt-2 text-sm font-medium text-foreground">{selectedProduct.availability}</p>
                          </div>
                          <div className="rounded-2xl border border-border bg-card p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Minimum Order</p>
                            <p className="mt-2 text-sm font-medium text-foreground">{selectedProduct.moq ?? 'Available on request'}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Button asChild size="lg" className="flex-1 rounded-xl bg-primary px-6">
                          <Link to={getQuotePath(selectedProduct.name)}>
                            Request Quote
                          </Link>
                        </Button>
                        <Button
                          size="lg"
                          variant="outline"
                          className="flex-1 rounded-xl"
                          onClick={() => {
                            const nextIndex = relatedFruits[0]?.id;
                            if (nextIndex) {
                              setSelectedProductId(nextIndex);
                              setSelectedMediaIndex(0);
                            }
                          }}
                        >
                          Browse Similar Fruits
                        </Button>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl border border-border bg-card p-4 text-center">
                          <Truck className="mx-auto h-5 w-5 text-primary" />
                          <p className="mt-2 text-sm font-semibold text-foreground">Cold Chain</p>
                          <p className="mt-1 text-xs text-muted-foreground">Fresh handling for export transit.</p>
                        </div>
                        <div className="rounded-2xl border border-border bg-card p-4 text-center">
                          <ShieldCheck className="mx-auto h-5 w-5 text-primary" />
                          <p className="mt-2 text-sm font-semibold text-foreground">Quality Assured</p>
                          <p className="mt-1 text-xs text-muted-foreground">Sorted to export grade standards.</p>
                        </div>
                        <div className="rounded-2xl border border-border bg-card p-4 text-center">
                          <Headphones className="mx-auto h-5 w-5 text-primary" />
                          <p className="mt-2 text-sm font-semibold text-foreground">Buyer Support</p>
                          <p className="mt-1 text-xs text-muted-foreground">Fast response for enquiries and orders.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Tabs defaultValue="description" className="mt-8 sm:mt-10">
                    <TabsList className="h-auto w-full justify-start gap-1 overflow-x-auto rounded-none bg-transparent p-0">
                      <TabsTrigger value="description" className="shrink-0 rounded-xl px-3 py-2 text-sm sm:px-5 sm:py-2.5">Description</TabsTrigger>
                      <TabsTrigger value="information" className="shrink-0 rounded-xl px-3 py-2 text-sm sm:px-5 sm:py-2.5">Specifications</TabsTrigger>
                      <TabsTrigger value="pricing" className="shrink-0 rounded-xl px-3 py-2 text-sm sm:px-5 sm:py-2.5">Packaging</TabsTrigger>
                    </TabsList>

                    <TabsContent value="description" className="mt-6 rounded-2xl border border-border bg-background p-6">
                      <p className="max-w-3xl leading-relaxed text-muted-foreground">
                        {selectedProduct.description} We source from trusted Kenyan growers and prepare consignments according to
                        destination market requirements, preserving freshness, visual quality, and shelf life for importers.
                      </p>
                    </TabsContent>

                    <TabsContent value="information" className="mt-6 rounded-2xl border border-border bg-background p-0 overflow-hidden">
                      <Table>
                        <TableBody>
                          <TableRow>
                            <TableCell className="w-[38%] bg-accent font-semibold text-accent-foreground sm:w-[32%]">Feature</TableCell>
                            <TableCell className="bg-accent font-semibold text-accent-foreground">Description</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold text-foreground">Source Regions</TableCell>
                            <TableCell>{selectedProduct.sourceRegions.join(', ')}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold text-foreground">Varieties</TableCell>
                            <TableCell>{selectedProduct.varieties.join(', ')}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold text-foreground">Export Grades</TableCell>
                            <TableCell>{selectedProduct.exportGrades.join(', ')}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold text-foreground">Shelf Life</TableCell>
                            <TableCell>{selectedProduct.shelfLife ?? 'Depends on packing method'}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold text-foreground">Availability</TableCell>
                            <TableCell>{selectedProduct.availability}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-semibold text-foreground">Minimum Order</TableCell>
                            <TableCell>{selectedProduct.moq ?? 'Available on request'}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TabsContent>

                    <TabsContent value="pricing" className="mt-6 rounded-2xl border border-border bg-background p-6">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="rounded-2xl bg-secondary/50 p-5">
                          <p className="text-sm font-semibold text-foreground">Packaging Options</p>
                          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                            {selectedProduct.packagingOptions.map((option) => (
                              <li key={option}>• {option}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-2xl bg-secondary/50 p-5">
                          <p className="text-sm font-semibold text-foreground">Buyer Notes</p>
                          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                            <p>Strong buyer demand in wholesale, retail, and fresh-cut programs.</p>
                            <p>Mixed loads and tailored packing can be arranged depending on destination.</p>
                            <p>Videos and image references are now available in the product gallery above.</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              <div className="space-y-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">Related Products</p>
                    <h3 className="text-xl font-bold text-foreground sm:text-2xl">Explore Related Fruits</h3>
                  </div>
                  <Badge variant="secondary" className="w-fit rounded-full px-3 py-1 text-xs">
                    {filteredFruits.length} fruits available
                  </Badge>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
                  {relatedFruits.map((fruit, index) => (
                    <div
                      key={fruit.id}
                      className={cn(
                        'transition-all duration-500',
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                      )}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedProductId(fruit.id);
                          setSelectedMediaIndex(0);
                          window.scrollTo({ top: 280, behavior: 'smooth' });
                        }}
                        className="group w-full overflow-hidden rounded-2xl border border-border bg-card text-left shadow-card transition-all hover:-translate-y-1 hover:shadow-hover"
                      >
                        <div className="relative overflow-hidden bg-muted/40">
                          <div className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                            Export
                          </div>
                          <img
                            src={fruit.image}
                            alt={fruit.name}
                            className="aspect-[4/3] h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:aspect-square"
                          />
                        </div>
                        <div className="space-y-2 p-4 sm:space-y-3 sm:p-5">
                          <p className="text-xs text-muted-foreground">{fruit.sourceRegions[0]}</p>
                          <div>
                            <h4 className="text-lg font-semibold text-foreground">{fruit.name}</h4>
                            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{fruit.description}</p>
                          </div>
                          <div>
                            <p className="text-base font-bold text-foreground sm:text-lg">{fruit.priceRange}</p>
                            <p className="text-sm text-muted-foreground">MOQ: {fruit.moq ?? 'On request'}</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <PageCTA
        variant="green"
        characterImage={mangoCharacter}
        title="Looking for Premium Fruits?"
        subtitle="We source the finest export-grade fruits from East Africa. Contact us for pricing, availability, and custom orders."
        whatsappMessage="Hello Shiloh Fresh Exporters, I am interested in your fruit exports. Please share available varieties, prices, and minimum order quantities."
      />
    </div>
  );
}
