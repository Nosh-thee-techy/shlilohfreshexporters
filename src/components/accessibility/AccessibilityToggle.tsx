import { useState } from 'react';
import { Accessibility, Eye, Type, Zap, BookOpen, RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { cn } from '@/lib/utils';

export function AccessibilityToggle({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, toggleSetting, resetSettings } = useAccessibility();

  const accessibilityOptions = [
    {
      key: 'highContrast' as const,
      label: 'High Contrast',
      description: 'Increase color contrast for better visibility',
      icon: Eye,
    },
    {
      key: 'largeText' as const,
      label: 'Large Text',
      description: 'Increase text size for easier reading',
      icon: Type,
    },
    {
      key: 'reducedMotion' as const,
      label: 'Reduced Motion',
      description: 'Minimize animations and transitions',
      icon: Zap,
    },
    {
      key: 'dyslexicFont' as const,
      label: 'Dyslexic-Friendly Font',
      description: 'Use a font designed for easier reading',
      icon: BookOpen,
    },
  ];

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'relative h-9 w-9 rounded-lg',
          isOpen && 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
          className
        )}
        aria-label="Accessibility settings"
        aria-expanded={isOpen}
      >
        <Accessibility className="h-5 w-5" />
      </Button>

      <div
        className={cn(
          'fixed left-3 right-3 top-[4.75rem] z-[60] max-h-[min(70vh,32rem)] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl transition-all duration-300 sm:left-auto sm:right-4 sm:w-80',
          isOpen ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-2 scale-95 opacity-0'
        )}
      >
        <div className="flex items-center justify-between border-b border-border p-3 sm:p-4">
          <div className="flex items-center gap-2">
            <Accessibility className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-semibold text-foreground sm:text-base">Accessibility</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3 p-3 sm:p-4">
          {accessibilityOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div
                key={option.key}
                className="flex items-start gap-2 rounded-xl bg-secondary/50 p-2 transition-colors hover:bg-secondary sm:gap-3 sm:p-3"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 sm:h-10 sm:w-10">
                  <Icon className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <label htmlFor={option.key} className="cursor-pointer text-xs font-medium text-foreground sm:text-sm">
                      {option.label}
                    </label>
                    <Switch
                      id={option.key}
                      checked={settings[option.key]}
                      onCheckedChange={() => toggleSetting(option.key)}
                    />
                  </div>
                  <p className="mt-0.5 hidden text-[10px] text-muted-foreground sm:mt-1 sm:block sm:text-xs">
                    {option.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-border p-3 sm:p-4">
          <Button
            variant="outline"
            size="sm"
            onClick={resetSettings}
            className="w-full gap-2 text-xs sm:text-sm"
          >
            <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
            Reset to Defaults
          </Button>
        </div>
      </div>
    </>
  );
}
