import { useState } from 'react';
import { Accessibility, Eye, Type, Zap, BookOpen, RotateCcw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import { cn } from '@/lib/utils';

export function AccessibilityToggle() {
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
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed left-4 bottom-24 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110',
          'bg-primary text-primary-foreground',
          isOpen && 'rotate-12'
        )}
        aria-label="Accessibility settings"
      >
        <Accessibility className="w-6 h-6" />
      </button>

      {/* Panel */}
      <div
        className={cn(
          'fixed left-4 bottom-40 z-50 w-80 max-w-[calc(100vw-2rem)] bg-card border border-border rounded-2xl shadow-2xl transition-all duration-300',
          isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        )}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Accessibility className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Accessibility</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="w-8 h-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {accessibilityOptions.map((option) => {
            const Icon = option.icon;
            return (
              <div
                key={option.key}
                className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <label htmlFor={option.key} className="font-medium text-foreground text-sm cursor-pointer">
                      {option.label}
                    </label>
                    <Switch
                      id={option.key}
                      checked={settings[option.key]}
                      onCheckedChange={() => toggleSetting(option.key)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {option.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={resetSettings}
            className="w-full gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Defaults
          </Button>
        </div>
      </div>
    </>
  );
}
