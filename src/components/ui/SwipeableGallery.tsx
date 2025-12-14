import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

interface SwipeableGalleryProps {
  images: string[];
  alt?: string;
  className?: string;
}

export function SwipeableGallery({ images, alt = 'Product image', className }: SwipeableGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [fullscreenEmblaRef, fullscreenEmblaApi] = useEmblaCarousel({ loop: true, startIndex: selectedIndex });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Sync fullscreen carousel when opened
  useEffect(() => {
    if (isFullscreen && fullscreenEmblaApi) {
      fullscreenEmblaApi.scrollTo(selectedIndex, true);
    }
  }, [isFullscreen, fullscreenEmblaApi, selectedIndex]);

  // Handle single image
  if (images.length === 1) {
    return (
      <div className={cn('relative overflow-hidden rounded-xl', className)}>
        <img
          src={images[0]}
          alt={alt}
          className="w-full h-full object-cover cursor-zoom-in"
          onClick={() => setIsFullscreen(true)}
        />
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
          aria-label="View fullscreen"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        
        <FullscreenView
          images={images}
          isOpen={isFullscreen}
          onClose={() => setIsFullscreen(false)}
          startIndex={0}
        />
      </div>
    );
  }

  return (
    <div className={cn('relative', className)}>
      {/* Main Carousel */}
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 relative"
            >
              <img
                src={image}
                alt={`${alt} ${index + 1}`}
                className="w-full h-full object-cover cursor-zoom-in"
                onClick={() => setIsFullscreen(true)}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Hidden on mobile, visible on hover on desktop */}
      <button
        onClick={scrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm hidden sm:flex items-center justify-center text-foreground hover:bg-background transition-all opacity-0 group-hover:opacity-100 shadow-lg"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm hidden sm:flex items-center justify-center text-foreground hover:bg-background transition-all opacity-0 group-hover:opacity-100 shadow-lg"
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Zoom Button */}
      <button
        onClick={() => setIsFullscreen(true)}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-colors"
        aria-label="View fullscreen"
      >
        <ZoomIn className="w-4 h-4" />
      </button>

      {/* Swipe Indicator - Mobile only */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-full text-xs text-muted-foreground sm:hidden">
        Swipe to explore
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden sm:flex gap-1.5">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              selectedIndex === index
                ? 'bg-primary w-6'
                : 'bg-background/60 hover:bg-background/80'
            )}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Thumbnail Strip - Mobile only */}
      <div className="flex gap-2 mt-3 overflow-x-auto pb-2 sm:hidden scrollbar-hide">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              'flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all',
              selectedIndex === index
                ? 'border-primary ring-2 ring-primary/30'
                : 'border-transparent opacity-70'
            )}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </button>
        ))}
      </div>

      {/* Fullscreen View */}
      <FullscreenView
        images={images}
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        startIndex={selectedIndex}
      />
    </div>
  );
}

interface FullscreenViewProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  startIndex: number;
}

function FullscreenView({ images, isOpen, onClose, startIndex }: FullscreenViewProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, startIndex });
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrentIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  // Reset to start index when opened
  useEffect(() => {
    if (isOpen && emblaApi) {
      emblaApi.scrollTo(startIndex, true);
    }
  }, [isOpen, emblaApi, startIndex]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-background/95 backdrop-blur-md border-none">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 hover:bg-background"
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Image Counter */}
        <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-full text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Carousel */}
        <div className="overflow-hidden h-[80vh]" ref={emblaRef}>
          <div className="flex h-full touch-pan-y">
            {images.map((image, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] min-w-0 flex items-center justify-center p-4"
              >
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="max-w-full max-h-full object-contain"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-all shadow-lg"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background transition-all shadow-lg"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Bottom Thumbnails */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto px-4 py-2 bg-background/60 backdrop-blur-sm rounded-full">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={cn(
                    'flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all',
                    currentIndex === index
                      ? 'border-primary ring-2 ring-primary/30 scale-110'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  )}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </button>
              ))}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
